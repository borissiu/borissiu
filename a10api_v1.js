let hostname = "Undefine"; haStatus = "Undefine";
let auth = "Undefine"; response = "";

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
  var msg = "{\"credentials\": {\"username\": \"admin\", \"password\": \"a10\"}}";
  var response = "";

  var xmlhttp = new_http_request();
  var response = post(xmlhttp, null, url, msg);

  var json = JSON.parse(response);
  auth = "A10 " + json.authresponse.signature;

  var token = document.getElementById("token");
  token.setAttribute("placeholder", auth);

  xmlhttp = new_http_request();
  response = get(xmlhttp, auth, '/axapi/v3/vrrp-a/vrid/0/oper');
  json_response = JSON.parse(response);
  device_state = json_response["vrid"]["oper"]["state"];

  response = get(xmlhttp, auth, "/axapi/v3/hostname");
  json_response = JSON.parse(response);
  host_id = json_response["hostname"]["value"];

  const UIdeviceStatus = document.querySelector('#deviceStatus');
  UIdeviceStatus.value = "Hostname: " + host_id + ' (' + device_state + '), User Logon: ' + Date();
}

function buttonA()
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
  var output = 'A - ' + new Date() + '\n'
  output += obj_data["service-group"]["member-list"][0]["name"] + ' ' + obj_data["service-group"]["member-list"][0]["port"] + ' ' + obj_data["service-group"]["member-list"][0]["member-state"] + '\n'
  output += obj_data["service-group"]["member-list"][1]["name"] + ' ' + obj_data["service-group"]["member-list"][1]["port"] + ' ' + obj_data["service-group"]["member-list"][1]["member-state"] + '\n'
  output += obj_data["service-group"]["member-list"][2]["name"] + ' ' + obj_data["service-group"]["member-list"][2]["port"] + ' ' + obj_data["service-group"]["member-list"][2]["member-state"] + '\n'
  output += obj_data["service-group"]["member-list"][3]["name"] + ' ' + obj_data["service-group"]["member-list"][3]["port"] + ' ' + obj_data["service-group"]["member-list"][3]["member-state"] + '\n'

  out2(output);
}

function buttonB()
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
  var output = 'B - ' + new Date() + '\n'
  output += obj_data["service-group"]["member-list"][0]["name"] + ' ' + obj_data["service-group"]["member-list"][0]["port"] + ' ' + obj_data["service-group"]["member-list"][0]["member-state"] + '\n'
  output += obj_data["service-group"]["member-list"][1]["name"] + ' ' + obj_data["service-group"]["member-list"][1]["port"] + ' ' + obj_data["service-group"]["member-list"][1]["member-state"] + '\n'
  output += obj_data["service-group"]["member-list"][2]["name"] + ' ' + obj_data["service-group"]["member-list"][2]["port"] + ' ' + obj_data["service-group"]["member-list"][2]["member-state"] + '\n'
  output += obj_data["service-group"]["member-list"][3]["name"] + ' ' + obj_data["service-group"]["member-list"][3]["port"] + ' ' + obj_data["service-group"]["member-list"][3]["member-state"] + '\n'

  out2(output);
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