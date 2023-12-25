let hostname = "Undefine"; haStatus = "Undefine"; peer_ip = '';
let auth = "Undefine"; response = "";

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

  // response = get(xmlhttp, auth, '/axapi/v3/vrrp-a/vrid/0/oper');
  // json_response = JSON.parse(response);
  // device_state = json_response["vrid"]["oper"]["state"];

  response = get(xmlhttp, auth, "/axapi/v3/hostname");
  json_response = JSON.parse(response);
  host_id = json_response["hostname"]["value"];

  // response = get(xmlhttp, auth, "/axapi/v3/vrrp-a/partition-vrid-all-status/oper");
  // var json_response = JSON.parse(response);
  // var local_device_id = json_response["partition-vrid-all-status"]["oper"]["all-partition-list"][0]["local_device_ID"];
  // var active_device_id = json_response["partition-vrid-all-status"]["oper"]["all-partition-list"][0]["active_device_id"];

  // response = get(xmlhttp, auth, "/axapi/v3/vrrp-a/detail/oper");
  // var json_response = JSON.parse(response);
  // peer_ip = json_response["detail"]["oper"]["peer_info_list"][0]["peer_ip"];

  // if ( local_device_id != active_device_id ) {
  //   alert("This is Standby Device, let's connect to Active device (" + peer_ip + ").");
  //   location.href = 'https://' + peer_ip + '/a10_l_v1.html';
  // }

  const UIdeviceStatus = document.querySelector('#deviceStatus');
  // UIdeviceStatus.value = "Hostname: " + host_id + ' (' + device_state + '), User Logon: ' + Date();
  UIdeviceStatus.value = "Hostname: " + host_id + ', User Logon: ' + Date();
}

function statusSNAT() {
  var xmlhttp = new_http_request();
  var response = get(xmlhttp, auth, '/axapi/v3/ip/nat/pool/');
  var obj_data = JSON.parse(response);

  var output = 'SNAT Status - ' + new Date() + '\n\n'
  output += obj_data["pool-list"][0]["pool-name"] + ' ' + obj_data["pool-list"][0]["start-address"] + ' ' + obj_data["pool-list"][0]["end-address"] + ' ' + obj_data["pool-list"][0]["ip-rr"] + ' ' + obj_data["pool-list"][0]["port-overload"] + '\n'
  output += obj_data["pool-list"][1]["pool-name"] + ' ' + obj_data["pool-list"][1]["start-address"] + ' ' + obj_data["pool-list"][1]["end-address"] + ' ' + obj_data["pool-list"][1]["ip-rr"] + ' ' + obj_data["pool-list"][1]["port-overload"] + '\n'
  output += obj_data["pool-list"][2]["pool-name"] + ' ' + obj_data["pool-list"][2]["start-address"] + ' ' + obj_data["pool-list"][2]["end-address"] + ' ' + obj_data["pool-list"][2]["ip-rr"] + ' ' + obj_data["pool-list"][2]["port-overload"] + '\n'
  output += obj_data["pool-list"][3]["pool-name"] + ' ' + obj_data["pool-list"][3]["start-address"] + ' ' + obj_data["pool-list"][3]["end-address"] + ' ' + obj_data["pool-list"][3]["ip-rr"] + ' ' + obj_data["pool-list"][3]["port-overload"] + '\n'
  output += obj_data["pool-list"][4]["pool-name"] + ' ' + obj_data["pool-list"][4]["start-address"] + ' ' + obj_data["pool-list"][4]["end-address"] + ' ' + obj_data["pool-list"][4]["ip-rr"] + ' ' + obj_data["pool-list"][4]["port-overload"] + '\n'
  output += obj_data["pool-list"][5]["pool-name"] + ' ' + obj_data["pool-list"][5]["start-address"] + ' ' + obj_data["pool-list"][5]["end-address"] + ' ' + obj_data["pool-list"][5]["ip-rr"] + ' ' + obj_data["pool-list"][5]["port-overload"] + '\n'
  output += obj_data["pool-list"][6]["pool-name"] + ' ' + obj_data["pool-list"][6]["start-address"] + ' ' + obj_data["pool-list"][6]["end-address"] + ' ' + obj_data["pool-list"][6]["ip-rr"] + ' ' + obj_data["pool-list"][6]["port-overload"] + '\n'
  output += obj_data["pool-list"][7]["pool-name"] + ' ' + obj_data["pool-list"][7]["start-address"] + ' ' + obj_data["pool-list"][7]["end-address"] + ' ' + obj_data["pool-list"][7]["ip-rr"] + ' ' + obj_data["pool-list"][7]["port-overload"] + '\n'
  output += obj_data["pool-list"][8]["pool-name"] + ' ' + obj_data["pool-list"][8]["start-address"] + ' ' + obj_data["pool-list"][8]["end-address"] + ' ' + obj_data["pool-list"][8]["ip-rr"] + ' ' + obj_data["pool-list"][8]["port-overload"] + '\n'
  output += obj_data["pool-list"][9]["pool-name"] + ' ' + obj_data["pool-list"][9]["start-address"] + ' ' + obj_data["pool-list"][9]["end-address"] + ' ' + obj_data["pool-list"][9]["ip-rr"] + ' ' + obj_data["pool-list"][9]["port-overload"] + '\n'
  output += obj_data["pool-list"][10]["pool-name"] + ' ' + obj_data["pool-list"][10]["start-address"] + ' ' + obj_data["pool-list"][10]["end-address"] + ' ' + obj_data["pool-list"][10]["ip-rr"] + ' ' + obj_data["pool-list"][10]["port-overload"] + '\n'

  out2(output);
}

function statusTemplatePort() {
  var xmlhttp = new_http_request();
  var response = get(xmlhttp, auth, '/axapi/v3/slb/template/port/');
  var obj_data = JSON.parse(response);

  var output = 'Template Port Status - ' + new Date() + '\n\n'
  output +=  obj_data["port-list"][0]["name"] + ' ' +  obj_data["port-list"][0]["source-nat"] + '\n'
  output +=  obj_data["port-list"][1]["name"] + ' ' +  obj_data["port-list"][1]["source-nat"] + '\n'
  output +=  obj_data["port-list"][2]["name"] + ' ' +  obj_data["port-list"][2]["source-nat"] + '\n'
  output +=  obj_data["port-list"][3]["name"] + ' ' +  obj_data["port-list"][3]["source-nat"] + '\n'
  output +=  obj_data["port-list"][4]["name"] + ' ' +  obj_data["port-list"][4]["source-nat"] + '\n'
  output +=  obj_data["port-list"][5]["name"] + ' ' +  obj_data["port-list"][5]["source-nat"] + '\n'
  output +=  obj_data["port-list"][6]["name"] + ' ' +  obj_data["port-list"][6]["source-nat"] + '\n'
  output +=  obj_data["port-list"][7]["name"] + ' ' +  obj_data["port-list"][7]["source-nat"] + '\n'
  output +=  obj_data["port-list"][8]["name"] + ' ' +  obj_data["port-list"][8]["source-nat"] + '\n'
  output +=  obj_data["port-list"][9]["name"] + ' ' +  obj_data["port-list"][9]["source-nat"] + '\n'
  output += obj_data["port-list"][10]["name"] + ' ' + obj_data["port-list"][10]["source-nat"] + '\n'
  output += obj_data["port-list"][11]["name"] + ' ' + obj_data["port-list"][11]["source-nat"] + '\n'
  output += obj_data["port-list"][12]["name"] + ' ' + obj_data["port-list"][12]["source-nat"] + '\n'
  output += obj_data["port-list"][13]["name"] + ' ' + obj_data["port-list"][13]["source-nat"] + '\n'
  output += obj_data["port-list"][14]["name"] + ' ' + obj_data["port-list"][14]["source-nat"] + '\n'
  output += obj_data["port-list"][15]["name"] + ' ' + obj_data["port-list"][15]["source-nat"] + '\n'
  output += obj_data["port-list"][16]["name"] + ' ' + obj_data["port-list"][16]["source-nat"] + '\n'
  output += obj_data["port-list"][17]["name"] + ' ' + obj_data["port-list"][17]["source-nat"] + '\n'
  output += obj_data["port-list"][18]["name"] + ' ' + obj_data["port-list"][18]["source-nat"] + '\n'
  output += obj_data["port-list"][19]["name"] + ' ' + obj_data["port-list"][19]["source-nat"] + '\n'
  output += obj_data["port-list"][20]["name"] + ' ' + obj_data["port-list"][20]["source-nat"] + '\n'
  output += obj_data["port-list"][21]["name"] + ' ' + obj_data["port-list"][21]["source-nat"] + '\n'
  output += obj_data["port-list"][22]["name"] + ' ' + obj_data["port-list"][22]["source-nat"] + '\n'
  output += obj_data["port-list"][23]["name"] + ' ' + obj_data["port-list"][23]["source-nat"] + '\n'

  out2(output);
}

function unbindTemplatePort() {
  var xmlhttp = new_http_request();
  msg = unbindTemplatePortJson;

  var response = put(xmlhttp, auth, '/axapi/v3/slb/template/port/', msg);
  var obj_data = JSON.parse(response);

  out2(obj_data);
}

function bindTemplatePort() {
  var xmlhttp = new_http_request();
  msg = bindTemplatePortJson;

  var response = put(xmlhttp, auth, '/axapi/v3/slb/template/port/', msg);
  var obj_data = JSON.parse(response);

  out2(obj_data);
}

function buttonA()
{
  var response = "";
  var msg = "{\"service-group\": \
  {\"member-list\":[ \
  {\"name\":\"172.31.102.129\", \"port\":19443, \"member-state\": \"disable\"}, \
  {\"name\":\"172.31.102.129\", \"port\":29443, \"member-state\": \"enable\"}, \
  {\"name\":\"172.31.102.130\", \"port\":19443, \"member-state\": \"disable\"}, \
  {\"name\":\"172.31.102.130\", \"port\":29443, \"member-state\": \"enable\"}]} \
  }"

  var xmlhttp = new_http_request();
  var response = post(xmlhttp, auth, '/axapi/v3/slb/service-group/HDC_OHS_LVC_OAT_HTTPS', msg);

  var obj_data = JSON.parse(response);
  var output = 'A - ' + new Date() + '\n'
  output += obj_data["service-group"]["member-list"][0]["name"] + ' ' + obj_data["service-group"]["member-list"][0]["port"] + ' ' + obj_data["service-group"]["member-list"][0]["member-state"] + '\n'
  output += obj_data["service-group"]["member-list"][1]["name"] + ' ' + obj_data["service-group"]["member-list"][1]["port"] + ' ' + obj_data["service-group"]["member-list"][1]["member-state"] + '\n'
  output += obj_data["service-group"]["member-list"][2]["name"] + ' ' + obj_data["service-group"]["member-list"][2]["port"] + ' ' + obj_data["service-group"]["member-list"][2]["member-state"] + '\n'
  output += obj_data["service-group"]["member-list"][3]["name"] + ' ' + obj_data["service-group"]["member-list"][3]["port"] + ' ' + obj_data["service-group"]["member-list"][3]["member-state"] + '\n'

  out2(output);

  if ( document.getElementById('checkbox1').checked ) {
    var msg = "{\"sync\": {\"type\": \"all\", \"all-partitions\": 1, \"address\": \"" + peer_ip + "\", \"auto-authentication\": 1}}"
    var response = post(xmlhttp, auth, "/axapi/v3/configure/sync", msg);

    if ( new String(xmlhttp.status) == "204" ) {
      response = new Date() + '\n' + "A - Configruation sync completed";
    } else {
      response = new Date() + '\n' + "A - Faulure \n" + response
    }
    out3(response);
  }
}

function buttonB()
{
  var response = "";
  var msg = "{\"service-group\": \
  {\"member-list\":[ \
  {\"name\":\"172.31.102.129\", \"port\":19443, \"member-state\": \"enable\"}, \
  {\"name\":\"172.31.102.129\", \"port\":29443, \"member-state\": \"disable\"}, \
  {\"name\":\"172.31.102.130\", \"port\":19443, \"member-state\": \"enable\"}, \
  {\"name\":\"172.31.102.130\", \"port\":29443, \"member-state\": \"disable\"}]} \
  }"

  var xmlhttp = new_http_request();
  var response = post(xmlhttp, auth, '/axapi/v3/slb/service-group/HDC_OHS_LVC_OAT_HTTPS', msg);

  var obj_data = JSON.parse(response);
  var output = 'B - ' + new Date() + '\n'
  output += obj_data["service-group"]["member-list"][0]["name"] + ' ' + obj_data["service-group"]["member-list"][0]["port"] + ' ' + obj_data["service-group"]["member-list"][0]["member-state"] + '\n'
  output += obj_data["service-group"]["member-list"][1]["name"] + ' ' + obj_data["service-group"]["member-list"][1]["port"] + ' ' + obj_data["service-group"]["member-list"][1]["member-state"] + '\n'
  output += obj_data["service-group"]["member-list"][2]["name"] + ' ' + obj_data["service-group"]["member-list"][2]["port"] + ' ' + obj_data["service-group"]["member-list"][2]["member-state"] + '\n'
  output += obj_data["service-group"]["member-list"][3]["name"] + ' ' + obj_data["service-group"]["member-list"][3]["port"] + ' ' + obj_data["service-group"]["member-list"][3]["member-state"] + '\n'

  out2(output);

  if ( document.getElementById('checkbox2').checked ) { 
    var msg = "{\"sync\": {\"type\": \"all\", \"all-partitions\": 1, \"address\": \"" + peer_ip + "\", \"auto-authentication\": 1}}"
    var response = post(xmlhttp, auth, "/axapi/v3/configure/sync", msg);
    if ( new String(xmlhttp.status) == "204" ) {
      response = new Date() + '\n' + "B - Configruation sync completed";
    } else {
      response = new Date() + '\n' + "B - Failure \n" + response
    }
    out3(response);
  }
}

function buttonS()
{
  var xmlhttp = new_http_request();
  var response = get(xmlhttp, auth, '/axapi/v3/slb/service-group/HDC_OHS_LVC_OAT_HTTPS');
  var obj_data = JSON.parse(response);

  var xmlhttp = new_http_request();
  var response = get(xmlhttp, auth, '/axapi/v3/slb/service-group/HDC_OHS_LVC_OAT_HTTPS/stats');
  var obj_stat = JSON.parse(response);

  var output = 'S - ' + new Date() + '\n'
  output += obj_data["service-group"]["member-list"][0]["name"] + ' ' + obj_data["service-group"]["member-list"][0]["port"] + ' ' + obj_data["service-group"]["member-list"][0]["member-state"]
  output += ', curr_conn ' + obj_stat["service-group"]["member-list"][0]["stats"]["curr_conn"] + ', response_time ' + obj_stat["service-group"]["member-list"][0]["stats"]["response_time"] + '\n'
  output += obj_data["service-group"]["member-list"][1]["name"] + ' ' + obj_data["service-group"]["member-list"][1]["port"] + ' ' + obj_data["service-group"]["member-list"][1]["member-state"]
  output += ', curr_conn ' + obj_stat["service-group"]["member-list"][1]["stats"]["curr_conn"] + ', response_time ' + obj_stat["service-group"]["member-list"][1]["stats"]["response_time"] + '\n'
  output += obj_data["service-group"]["member-list"][2]["name"] + ' ' + obj_data["service-group"]["member-list"][2]["port"] + ' ' + obj_data["service-group"]["member-list"][2]["member-state"]
  output += ', curr_conn ' + obj_stat["service-group"]["member-list"][2]["stats"]["curr_conn"] + ', response_time ' + obj_stat["service-group"]["member-list"][2]["stats"]["response_time"] + '\n'
  output += obj_data["service-group"]["member-list"][3]["name"] + ' ' + obj_data["service-group"]["member-list"][3]["port"] + ' ' + obj_data["service-group"]["member-list"][3]["member-state"]
  output += ', curr_conn ' + obj_stat["service-group"]["member-list"][3]["stats"]["curr_conn"] + ', response_time ' + obj_stat["service-group"]["member-list"][3]["stats"]["response_time"] + '\n'

  out2(output);
}

function button99()
{
  location.href = 'a10_menu_v1.html';
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
      "source-nat":"snat_CU_v4", \
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
