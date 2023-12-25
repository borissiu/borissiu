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
  output += obj_data["port-list"][0]["name"] + ' ' + obj_data["port-list"][0]["source-nat"] + '\n'
  output += obj_data["port-list"][1]["name"] + ' ' + obj_data["port-list"][1]["source-nat"] + '\n'
  output += obj_data["port-list"][2]["name"] + ' ' + obj_data["port-list"][2]["source-nat"] + '\n'
  output += obj_data["port-list"][3]["name"] + ' ' + obj_data["port-list"][3]["source-nat"] + '\n'
  output += obj_data["port-list"][4]["name"] + ' ' + obj_data["port-list"][4]["source-nat"] + '\n'
  output += obj_data["port-list"][5]["name"] + ' ' + obj_data["port-list"][5]["source-nat"] + '\n'
  output += obj_data["port-list"][6]["name"] + ' ' + obj_data["port-list"][6]["source-nat"] + '\n'
  output += obj_data["port-list"][7]["name"] + ' ' + obj_data["port-list"][7]["source-nat"] + '\n'
  output += obj_data["port-list"][8]["name"] + ' ' + obj_data["port-list"][8]["source-nat"] + '\n'
  output += obj_data["port-list"][9]["name"] + ' ' + obj_data["port-list"][9]["source-nat"] + '\n'
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
  output += obj_data["port-list"][24]["name"] + ' ' + obj_data["port-list"][24]["source-nat"] + '\n'

  out2(output);
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