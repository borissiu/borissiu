let hostname = "Undefine"; haStatus = "Undefine"; peer_ip = '';
let auth = "Undefine"; response = "";
let output = "";

function configSlbServer_v4()
{
  console.log("Hi");
  //console.log(document.getElementById("table1"));
  var table = document.getElementById("table1");
  var r=0;
  while(row=table.rows[r++])
  {
    console.log(row.cells[0]);
  }
}

function new_http_request()
{
  if (auth == "Undefine") {
    alert('Please logon...');
    return;
  }

  var xmlhttp = null;
  xmlhttp = new XMLHttpRequest();
  return xmlhttp;
}

function get(xmlhttp, auth, url)
{
  xmlhttp.open("GET", url, false);
  xmlhttp.setRequestHeader("Authorization", auth);
  xmlhttp.send();
  return xmlhttp.responseText;
}

function put(xmlhttp, auth, url, json)
{
  xmlhttp.open("PUT", url, false);
  xmlhttp.setRequestHeader("Content-type", "application/json");

  if (auth != null) {
    xmlhttp.setRequestHeader("Authorization", auth);
  }
  
  xmlhttp.send(json);
  return xmlhttp.responseText;
}

function post(xmlhttp, auth, url, json)
{
  xmlhttp.open("POST", url, false);
  xmlhttp.setRequestHeader("Content-type", "application/json");

  if (auth != null) {
    xmlhttp.setRequestHeader("Authorization", auth);
  }
  
  xmlhttp.send(json);
  return xmlhttp.responseText;
}

function login()
{
  auth = "";
  var url = '/axapi/v3/auth';
  var msg = "{\"credentials\": {\"username\": \"" + document.getElementById('username').value + "\", \"password\": " + "\"" + document.getElementById('password').value + "\"}}";
  var response = "";

  var xmlhttp = new_http_request();
  var response = post(xmlhttp, null, url, msg);

  var json = JSON.parse(response);
  auth = "A10 " + json.authresponse.signature;
  var token = document.getElementById("token");
  token.setAttribute("placeholder", auth);

  response = get(xmlhttp, auth, "/axapi/v3/hostname");
  json_response = JSON.parse(response);
  host_id = json_response["hostname"]["value"];

  const UIdeviceStatus = document.querySelector('#deviceStatus');
  UIdeviceStatus.value = "Hostname: " + host_id + ', User Logon: ' + Date();
}

function outputTemplatePort(item) {
  output += item["name"] + ' ' +  item["source-nat"] + '\n';
}

function statusTemplatePort() {
  var xmlhttp = new_http_request();
  var response = get(xmlhttp, auth, '/axapi/v3/slb/template/port/');
  var obj_data = JSON.parse(response);

  output = 'Template Port Status - ' + new Date() + '\n\n';
  obj_data["port-list"].forEach(outputTemplatePort);

  out2(output);
}

function unbindTemplatePort() {
  var xmlhttp = new_http_request();
  msg = unbindTemplatePortJson;

  var response = put(xmlhttp, auth, '/axapi/v3/slb/template/port/', msg);
  var obj_data = JSON.parse(response);

  statusTemplatePort();
}

function bindTemplatePort() {
  var xmlhttp = new_http_request();
  msg = bindTemplatePortJson;

  var response = put(xmlhttp, auth, '/axapi/v3/slb/template/port/', msg);
  var obj_data = JSON.parse(response);

  statusTemplatePort();
}


function outputSNAT(item) {
  output += item["pool-name"] + ' ' + item["start-address"] + ' ' + item["end-address"] + ' ' + item["ip-rr"] + ' ' + item["port-overload"] + '\n'
}

function statusSNAT() {
  var xmlhttp = new_http_request();
  var response = get(xmlhttp, auth, '/axapi/v3/ip/nat/pool/');
  var obj_data = JSON.parse(response);

  output = 'SNAT Status - ' + new Date() + '\n\n'
  obj_data["pool-list"].forEach(outputSNAT);

  out2(output);
}

function removeSNAT() {
  unbindTemplatePort();
  
  var xmlhttp = new_http_request();
  msg = removeSnatPool_v4;

  var response = post(xmlhttp, auth, '/axapi/v3/clideploy', msg);
  var obj_data = JSON.parse(response);

  statusSNAT();
}

function configSNAT() {
  unbindTemplatePort();
  removeSNAT();

  var xmlhttp = new_http_request();
  msg = snatpool_v4;

  var response = put(xmlhttp, auth, '/axapi/v3/ip/nat/pool', msg);
  var obj_data = JSON.parse(response);

  bindTemplatePort();
  statusSNAT();
}

function configSNAT_PO() {
  unbindTemplatePort();
  removeSNAT();
  
  var xmlhttp = new_http_request();
  msg = snatpool_po_v4;

  var response = put(xmlhttp, auth, '/axapi/v3/ip/nat/pool', msg);
  var obj_data = JSON.parse(response);

  bindTemplatePort();
  statusSNAT();
}

function configSNAT_RR() {
  unbindTemplatePort();
  removeSNAT();
  
  var xmlhttp = new_http_request();
  msg = snatpool_rr_v4;

  var response = put(xmlhttp, auth, '/axapi/v3/ip/nat/pool', msg);
  var obj_data = JSON.parse(response);

  bindTemplatePort();
  statusSNAT();
}

function configSNAT_RR_PO() {
  unbindTemplatePort();
  removeSNAT();
  
  var xmlhttp = new_http_request();
  msg = snatpool_rr_po_v4;

  var response = put(xmlhttp, auth, '/axapi/v3/ip/nat/pool', msg);
  var obj_data = JSON.parse(response);

  bindTemplatePort();
  statusSNAT();
}

function out2(response)
{
  output2 = document.getElementById('output2');
  output2.removeChild(output2.childNodes[0]);

  let text2 = document.createElement('textarea');
  text2.appendChild(document.createTextNode(response));
  output2.appendChild(text2);
  text2.style.width = 60 + 'em';
  text2.style.height = text2.scrollHeight + 'px';
}

function out3(response)
{
  output3 = document.getElementById('output3');
  output3.removeChild(output3.childNodes[0]);

  let text3 = document.createElement('textarea');
  text3.appendChild(document.createTextNode(response));
  output3.appendChild(text3);
  text3.style.width = 60 + 'em';
  text3.style.height = text3.scrollHeight + 'px';
}

let unbindTemplatePortJson = '{ \
  "port-list": [ \
    { \
      "name":"CT_v4" \
    }, \
    { \
      "name":"CU_v4" \
    }, \
    { \
      "name":"CM_v4" \
    }, \
    { \
      "name":"CT_v6" \
    }, \
    { \
      "name":"CM_v6" \
    }, \
    { \
      "name":"CU_v6" \
    }, \
    { \
      "name":"PCCW_v6" \
    }, \
    { \
      "name":"JPNTT_v6" \
    }, \
    { \
      "name":"PCCW_v4" \
    }, \
    { \
      "name":"JPNTT_v4" \
    }, \
    { \
      "name":"CT_Dns_v4", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CT_Dns_v4", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"3c7aa60c-a00b-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CT_Dns_v4" \
    }, \
    { \
      "name":"CU_Dns_v4", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CU_Dns_v4", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"3c7bfb38-a00b-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CU_Dns_v4" \
    }, \
    { \
      "name":"CM_Dns_v4", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CM_Dns_v4", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"3c7e1f26-a00b-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CM_Dns_v4" \
    }, \
    { \
      "name":"CT_Dns_v6", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CT_Dns_v6", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"4a9e4428-a00b-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CT_Dns_v6" \
    }, \
    { \
      "name":"CM_Dns_v6", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CM_Dns_v6", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"4aa03a08-a00b-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CM_Dns_v6" \
    }, \
    { \
      "name":"CU_Dns_v6", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CU_Dns_v6", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"4aa16068-a00b-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CU_Dns_v6" \
    }, \
    { \
      "name":"CT_Bank_v4", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CT_Bank_v4", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"687ecdc8-a00b-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CT_Bank_v4" \
    }, \
    { \
      "name":"CU_Bank_v4", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CU_Bank_v4", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"68804888-a00b-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CU_Bank_v4" \
    }, \
    { \
      "name":"CM_Bank_v4", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CM_Bank_v4", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"6882478c-a00b-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CM_Bank_v4" \
    }, \
    { \
      "name":"CM_Guest_v4", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CM_Bank_v4", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"c4a48e4e-a015-11ee-84f4-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CM_Guest_v4" \
    }, \
    { \
      "name":"CU_Guest_v4", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CU_Bank_v4", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"ee347b7a-a015-11ee-84f4-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CU_Guest_v4" \
    }, \
    { \
      "name":"CT_Bank_v6", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CT_Bank_v6", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"7e0167c6-a017-11ee-84f4-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CT_Bank_v6" \
    }, \
    { \
      "name":"CU_Bank_v6", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CU_Bank_v6", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"7e0292ea-a017-11ee-84f4-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CU_Bank_v6" \
    }, \
    { \
      "name":"CM_Bank_v6", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CM_Bank_v6", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"7e03d222-a017-11ee-84f4-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CM_Bank_v6" \
    } \
  ] \
}'; 

let bindTemplatePortJson = '{ \
  "port-list": [ \
    { \
      "name":"CT_v4", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CT_v4", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"f91868a4-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CT_v4" \
    }, \
    { \
      "name":"CU_v4", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CU_v4", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"f9199940-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CU_v4" \
    }, \
    { \
      "name":"CM_v4", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CM_v4", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"f91a8e40-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CM_v4" \
    }, \
    { \
      "name":"CT_v6", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CT_v6", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"f91b8944-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CT_v6" \
    }, \
    { \
      "name":"CM_v6", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CM_v6", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"f91c73cc-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CM_v6" \
    }, \
    { \
      "name":"CU_v6", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CU_v6", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"f91d5936-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CU_v6" \
    }, \
    { \
      "name":"PCCW_v6", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_PCCW_v6", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"f91f115e-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/PCCW_v6" \
    }, \
    { \
      "name":"JPNTT_v6", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_JPNTT_v6", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"f920c5d0-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/JPNTT_v6" \
    }, \
    { \
      "name":"PCCW_v4", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_PCCW_v4", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"f9222358-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/PCCW_v4" \
    }, \
    { \
      "name":"JPNTT_v4", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_JPNTT_v4", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"f923bc04-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/JPNTT_v4" \
    }, \
    { \
      "name":"CT_Dns_v4", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CT_Dns_v4", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"3c7aa60c-a00b-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CT_Dns_v4" \
    }, \
    { \
      "name":"CU_Dns_v4", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CU_Dns_v4", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"3c7bfb38-a00b-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CU_Dns_v4" \
    }, \
    { \
      "name":"CM_Dns_v4", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CM_Dns_v4", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"3c7e1f26-a00b-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CM_Dns_v4" \
    }, \
    { \
      "name":"CT_Dns_v6", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CT_Dns_v6", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"4a9e4428-a00b-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CT_Dns_v6" \
    }, \
    { \
      "name":"CM_Dns_v6", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CM_Dns_v6", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"4aa03a08-a00b-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CM_Dns_v6" \
    }, \
    { \
      "name":"CU_Dns_v6", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CU_Dns_v6", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"4aa16068-a00b-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CU_Dns_v6" \
    }, \
    { \
      "name":"CT_Bank_v4", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CT_Bank_v4", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"687ecdc8-a00b-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CT_Bank_v4" \
    }, \
    { \
      "name":"CU_Bank_v4", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CU_Bank_v4", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"68804888-a00b-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CU_Bank_v4" \
    }, \
    { \
      "name":"CM_Bank_v4", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CM_Bank_v4", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"6882478c-a00b-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CM_Bank_v4" \
    }, \
    { \
      "name":"CM_Guest_v4", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CM_Bank_v4", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"c4a48e4e-a015-11ee-84f4-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CM_Guest_v4" \
    }, \
    { \
      "name":"CU_Guest_v4", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CU_Bank_v4", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"ee347b7a-a015-11ee-84f4-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CU_Guest_v4" \
    }, \
    { \
      "name":"CT_Bank_v6", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CT_Bank_v6", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"7e0167c6-a017-11ee-84f4-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CT_Bank_v6" \
    }, \
    { \
      "name":"CU_Bank_v6", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CU_Bank_v6", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"7e0292ea-a017-11ee-84f4-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CU_Bank_v6" \
    }, \
    { \
      "name":"CM_Bank_v6", \
      "conn-limit":64000000, \
      "conn-limit-no-logging":0, \
      "dest-nat":0, \
      "del-session-on-server-down":0, \
      "dynamic-member-priority":16, \
      "decrement":0, \
      "extended-stats":0, \
      "no-ssl":0, \
      "stats-data-action":"stats-data-enable", \
      "health-check-disable":0, \
      "inband-health-check":0, \
      "source-nat":"snat_CM_Bank_v6", \
      "weight":1, \
      "sub-group":0, \
      "slow-start":0, \
      "uuid":"7e03d222-a017-11ee-84f4-000c29bb3222", \
      "a10-url":"/axapi/v3/slb/template/port/CM_Bank_v6" \
    } \
  ] \
}'; 


let removeSnatPool_v4 = '{ \
  "commandList" : [ \
    "no ip nat pool snat_CM_v4", \
    "no ip nat pool snat_CT_v4", \
    "no ip nat pool snat_CU_v4", \
    "no ip nat pool snat_PCCW_v4", \
    "no ip nat pool snat_JPNTT_v4" \
 ] \
}';

let snatpool_v4 = '{ \
  "pool-list": [ \
    { \
      "pool-name":"snat_CM_Bank_v4", \
      "start-address":"117.144.84.158", \
      "end-address":"117.144.84.158", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"ef774866-a009-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CM_Bank_v4" \
    }, \
    { \
      "pool-name":"snat_CM_Dns_v4", \
      "start-address":"117.144.84.156", \
      "end-address":"117.144.84.157", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"21ff4d6a-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CM_Dns_v4" \
    }, \
    { \
      "pool-name":"snat_CM_v4", \
      "start-address":"117.144.84.133", \
      "end-address":"117.144.84.155", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"588a412c-a006-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CM_v4" \
    }, \
    { \
      "pool-name":"snat_CT_Bank_v4", \
      "start-address":"101.230.97.126", \
      "end-address":"101.230.97.126", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"fbcc474c-a009-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CT_Bank_v4" \
    }, \
    { \
      "pool-name":"snat_CT_Dns_v4", \
      "start-address":"101.230.97.124", \
      "end-address":"101.230.97.125", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"2200b448-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CT_Dns_v4" \
    }, \
    { \
      "pool-name":"snat_CT_v4", \
      "start-address":"101.230.97.101", \
      "end-address":"101.230.97.123", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"bbadbf5a-a005-11ee-9587-1d4b7257581e", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CT_v4" \
    }, \
    { \
      "pool-name":"snat_CU_Bank_v4", \
      "start-address":"211.95.64.158", \
      "end-address":"211.95.64.158", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"f01eec24-a009-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CU_Bank_v4" \
    }, \
    { \
      "pool-name":"snat_CU_Dns_v4", \
      "start-address":"211.95.64.156", \
      "end-address":"211.95.64.157", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"224683a6-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CU_Dns_v4" \
    }, \
    { \
      "pool-name":"snat_CU_v4", \
      "start-address":"211.95.64.133", \
      "end-address":"211.95.64.155", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"d59d8152-a005-11ee-9587-1d4b7257581e", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CU_v4" \
    }, \
    { \
      "pool-name":"snat_JPNTT_v4", \
      "start-address":"61.213.176.53", \
      "end-address":"61.213.176.62", \
      "netmask":"/28", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"ad66b67e-a008-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_JPNTT_v4" \
    }, \
    { \
      "pool-name":"snat_PCCW_v4", \
      "start-address":"207.176.113.69", \
      "end-address":"207.176.113.78", \
      "netmask":"/28", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"b553ad38-a008-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_PCCW_v4" \
    } \
  ] \
}';

let snatpool_po_v4 = '{ \
  "pool-list": [ \
    { \
      "pool-name":"snat_CM_Bank_v4", \
      "start-address":"117.144.84.158", \
      "end-address":"117.144.84.158", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"ef774866-a009-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CM_Bank_v4" \
    }, \
    { \
      "pool-name":"snat_CM_Dns_v4", \
      "start-address":"117.144.84.156", \
      "end-address":"117.144.84.157", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"21ff4d6a-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CM_Dns_v4" \
    }, \
    { \
      "pool-name":"snat_CM_v4", \
      "start-address":"117.144.84.133", \
      "end-address":"117.144.84.155", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":1, \
      "uuid":"588a412c-a006-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CM_v4" \
    }, \
    { \
      "pool-name":"snat_CT_Bank_v4", \
      "start-address":"101.230.97.126", \
      "end-address":"101.230.97.126", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"fbcc474c-a009-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CT_Bank_v4" \
    }, \
    { \
      "pool-name":"snat_CT_Dns_v4", \
      "start-address":"101.230.97.124", \
      "end-address":"101.230.97.125", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"2200b448-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CT_Dns_v4" \
    }, \
    { \
      "pool-name":"snat_CT_v4", \
      "start-address":"101.230.97.101", \
      "end-address":"101.230.97.123", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":1, \
      "uuid":"bbadbf5a-a005-11ee-9587-1d4b7257581e", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CT_v4" \
    }, \
    { \
      "pool-name":"snat_CU_Bank_v4", \
      "start-address":"211.95.64.158", \
      "end-address":"211.95.64.158", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"f01eec24-a009-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CU_Bank_v4" \
    }, \
    { \
      "pool-name":"snat_CU_Dns_v4", \
      "start-address":"211.95.64.156", \
      "end-address":"211.95.64.157", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"224683a6-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CU_Dns_v4" \
    }, \
    { \
      "pool-name":"snat_CU_v4", \
      "start-address":"211.95.64.133", \
      "end-address":"211.95.64.155", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":1, \
      "uuid":"d59d8152-a005-11ee-9587-1d4b7257581e", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CU_v4" \
    }, \
    { \
      "pool-name":"snat_JPNTT_v4", \
      "start-address":"61.213.176.53", \
      "end-address":"61.213.176.62", \
      "netmask":"/28", \
      "ip-rr":0, \
      "port-overload":1, \
      "uuid":"ad66b67e-a008-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_JPNTT_v4" \
    }, \
    { \
      "pool-name":"snat_PCCW_v4", \
      "start-address":"207.176.113.69", \
      "end-address":"207.176.113.78", \
      "netmask":"/28", \
      "ip-rr":0, \
      "port-overload":1, \
      "uuid":"b553ad38-a008-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_PCCW_v4" \
    } \
  ] \
}';

let snatpool_rr_v4 = '{ \
  "pool-list": [ \
    { \
      "pool-name":"snat_CM_Bank_v4", \
      "start-address":"117.144.84.158", \
      "end-address":"117.144.84.158", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"ef774866-a009-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CM_Bank_v4" \
    }, \
    { \
      "pool-name":"snat_CM_Dns_v4", \
      "start-address":"117.144.84.156", \
      "end-address":"117.144.84.157", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"21ff4d6a-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CM_Dns_v4" \
    }, \
    { \
      "pool-name":"snat_CM_v4", \
      "start-address":"117.144.84.133", \
      "end-address":"117.144.84.155", \
      "netmask":"/27", \
      "ip-rr":1, \
      "port-overload":0, \
      "uuid":"588a412c-a006-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CM_v4" \
    }, \
    { \
      "pool-name":"snat_CT_Bank_v4", \
      "start-address":"101.230.97.126", \
      "end-address":"101.230.97.126", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"fbcc474c-a009-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CT_Bank_v4" \
    }, \
    { \
      "pool-name":"snat_CT_Dns_v4", \
      "start-address":"101.230.97.124", \
      "end-address":"101.230.97.125", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"2200b448-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CT_Dns_v4" \
    }, \
    { \
      "pool-name":"snat_CT_v4", \
      "start-address":"101.230.97.101", \
      "end-address":"101.230.97.123", \
      "netmask":"/27", \
      "ip-rr":1, \
      "port-overload":0, \
      "uuid":"bbadbf5a-a005-11ee-9587-1d4b7257581e", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CT_v4" \
    }, \
    { \
      "pool-name":"snat_CU_Bank_v4", \
      "start-address":"211.95.64.158", \
      "end-address":"211.95.64.158", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"f01eec24-a009-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CU_Bank_v4" \
    }, \
    { \
      "pool-name":"snat_CU_Dns_v4", \
      "start-address":"211.95.64.156", \
      "end-address":"211.95.64.157", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"224683a6-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CU_Dns_v4" \
    }, \
    { \
      "pool-name":"snat_CU_v4", \
      "start-address":"211.95.64.133", \
      "end-address":"211.95.64.155", \
      "netmask":"/27", \
      "ip-rr":1, \
      "port-overload":0, \
      "uuid":"d59d8152-a005-11ee-9587-1d4b7257581e", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CU_v4" \
    }, \
    { \
      "pool-name":"snat_JPNTT_v4", \
      "start-address":"61.213.176.53", \
      "end-address":"61.213.176.62", \
      "netmask":"/28", \
      "ip-rr":1, \
      "port-overload":0, \
      "uuid":"ad66b67e-a008-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_JPNTT_v4" \
    }, \
    { \
      "pool-name":"snat_PCCW_v4", \
      "start-address":"207.176.113.69", \
      "end-address":"207.176.113.78", \
      "netmask":"/28", \
      "ip-rr":1, \
      "port-overload":0, \
      "uuid":"b553ad38-a008-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_PCCW_v4" \
    } \
  ] \
}';

let snatpool_rr_po_v4 = '{ \
  "pool-list": [ \
    { \
      "pool-name":"snat_CM_Bank_v4", \
      "start-address":"117.144.84.158", \
      "end-address":"117.144.84.158", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"ef774866-a009-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CM_Bank_v4" \
    }, \
    { \
      "pool-name":"snat_CM_Dns_v4", \
      "start-address":"117.144.84.156", \
      "end-address":"117.144.84.157", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"21ff4d6a-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CM_Dns_v4" \
    }, \
    { \
      "pool-name":"snat_CM_v4", \
      "start-address":"117.144.84.133", \
      "end-address":"117.144.84.155", \
      "netmask":"/27", \
      "ip-rr":1, \
      "port-overload":1, \
      "uuid":"588a412c-a006-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CM_v4" \
    }, \
    { \
      "pool-name":"snat_CT_Bank_v4", \
      "start-address":"101.230.97.126", \
      "end-address":"101.230.97.126", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"fbcc474c-a009-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CT_Bank_v4" \
    }, \
    { \
      "pool-name":"snat_CT_Dns_v4", \
      "start-address":"101.230.97.124", \
      "end-address":"101.230.97.125", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"2200b448-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CT_Dns_v4" \
    }, \
    { \
      "pool-name":"snat_CT_v4", \
      "start-address":"101.230.97.101", \
      "end-address":"101.230.97.123", \
      "netmask":"/27", \
      "ip-rr":1, \
      "port-overload":1, \
      "uuid":"bbadbf5a-a005-11ee-9587-1d4b7257581e", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CT_v4" \
    }, \
    { \
      "pool-name":"snat_CU_Bank_v4", \
      "start-address":"211.95.64.158", \
      "end-address":"211.95.64.158", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"f01eec24-a009-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CU_Bank_v4" \
    }, \
    { \
      "pool-name":"snat_CU_Dns_v4", \
      "start-address":"211.95.64.156", \
      "end-address":"211.95.64.157", \
      "netmask":"/27", \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"224683a6-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CU_Dns_v4" \
    }, \
    { \
      "pool-name":"snat_CU_v4", \
      "start-address":"211.95.64.133", \
      "end-address":"211.95.64.155", \
      "netmask":"/27", \
      "ip-rr":1, \
      "port-overload":1, \
      "uuid":"d59d8152-a005-11ee-9587-1d4b7257581e", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_CU_v4" \
    }, \
    { \
      "pool-name":"snat_JPNTT_v4", \
      "start-address":"61.213.176.53", \
      "end-address":"61.213.176.62", \
      "netmask":"/28", \
      "ip-rr":1, \
      "port-overload":1, \
      "uuid":"ad66b67e-a008-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_JPNTT_v4" \
    }, \
    { \
      "pool-name":"snat_PCCW_v4", \
      "start-address":"207.176.113.69", \
      "end-address":"207.176.113.78", \
      "netmask":"/28", \
      "ip-rr":1, \
      "port-overload":1, \
      "uuid":"b553ad38-a008-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ip/nat/pool/snat_PCCW_v4" \
    } \
  ] \
}';

let snatpool_v6 = '{ \
  "pool-list": [ \
    { \
      "pool-name":"snat_CM_Dns_v6", \
      "start-address":"2409:871e:5b00:400::50", \
      "end-address":"2409:871e:5b00:400::5f", \
      "netmask":64, \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"b6f395ca-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ipv6/nat/pool/snat_CM_Dns_v6" \
    }, \
    { \
      "pool-name":"snat_CT_Dns_v6", \
      "start-address":"240e:688:200:6f02::50", \
      "end-address":"240e:688:200:6f02::5f", \
      "netmask":64, \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"b6f67bbe-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ipv6/nat/pool/snat_CT_Dns_v6" \
    }, \
    { \
      "pool-name":"snat_CU_Dns_v6", \
      "start-address":"2408:860c:0:b00::50", \
      "end-address":"2408:860c:0:b00::5f", \
      "netmask":64, \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"b6f9195a-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ipv6/nat/pool/snat_CU_Dns_v6" \
    }, \
    { \
      "pool-name":"snat_CM_v6", \
      "start-address":"2409:871e:5b00:400::5", \
      "end-address":"2409:871e:5b00:400::4f", \
      "netmask":64, \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"b9bd3900-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ipv6/nat/pool/snat_CM_v6" \
    }, \
    { \
      "pool-name":"snat_CT_v6", \
      "start-address":"240e:688:200:6f02::5", \
      "end-address":"240e:688:200:6f02::4f", \
      "netmask":64, \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"b9c8345e-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ipv6/nat/pool/snat_CT_v6" \
    }, \
    { \
      "pool-name":"snat_CU_v6", \
      "start-address":"2408:860c:0:b00::5", \
      "end-address":"2408:860c:0:b00::4f", \
      "netmask":64, \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"ba51a748-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ipv6/nat/pool/snat_CU_v6" \
    }, \
    { \
      "pool-name":"snat_JPNTT_v6", \
      "start-address":"2001:218:2001:0:2000::5", \
      "end-address":"2001:218:2001:0:2000::2f", \
      "netmask":68, \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"dbcee322-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ipv6/nat/pool/snat_JPNTT_v6" \
    }, \
    { \
      "pool-name":"snat_PCCW_v6", \
      "start-address":"2400:8800:1f02:83:5000::5", \
      "end-address":"2400:8800:1f02:83:5000::2f", \
      "netmask":68, \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"dbd55f7c-a00a-11ee-aead-000c29bb3222", \
      "a10-url":"/axapi/v3/ipv6/nat/pool/snat_PCCW_v6" \
    }, \
    { \
      "pool-name":"snat_CM_Bank_v6", \
      "start-address":"2409:871e:5b00:400::60", \
      "end-address":"2409:871e:5b00:400::6f", \
      "netmask":64, \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"5f6d7336-a017-11ee-84f4-000c29bb3222", \
      "a10-url":"/axapi/v3/ipv6/nat/pool/snat_CM_Bank_v6" \
    }, \
    { \
      "pool-name":"snat_CT_Bank_v6", \
      "start-address":"240e:688:200:6f02::60", \
      "end-address":"240e:688:200:6f02::6f", \
      "netmask":64, \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"5f6fcb4a-a017-11ee-84f4-000c29bb3222", \
      "a10-url":"/axapi/v3/ipv6/nat/pool/snat_CT_Bank_v6" \
    }, \
    { \
      "pool-name":"snat_CU_Bank_v6", \
      "start-address":"2408:860c:0:b00::60", \
      "end-address":"2408:860c:0:b00::6f", \
      "netmask":64, \
      "ip-rr":0, \
      "port-overload":0, \
      "uuid":"5fb7a424-a017-11ee-84f4-000c29bb3222", \
      "a10-url":"/axapi/v3/ipv6/nat/pool/snat_CU_Bank_v6" \
    } \
  ] \
}';
