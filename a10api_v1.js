let hostname = "Undefine"; haStatus = "Undefine";

function new_http_request()
{
  var xmlhttp = null;
  xmlhttp = new XMLHttpRequest();
  return xmlhttp;
}


function get(xmlhttp, auth, url)
{
  var response = ""
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
  var url = '/axapi/v3/auth';
  var msg = "{\"credentials\": {\"username\": \"" + document.getElementById('username') + "\", \"password\": \"" + document.getElementById('password') + "\"}}";
  var response = "";

  var xmlhttp = new_http_request();
  var response = ajax_send_post(xmlhttp, null, url, msg);

  var json = JSON.parse(response);
  token.value = "A10 " + json.authresponse.signature;

  var token = document.getElementById("token");
  token.setAttribute("placeholder", token.value);
}

function buttonA()
{
  const UIdeviceStatus = document.querySelector('#deviceStatus');
  UIdeviceStatus.value = "Hostname: " + hostname + ' (' + haStatus + '),                    ' + Date();
  const UIresponse = document.querySelector('#response');
  document.body.appendChild(document.createTextNode(response));
}

function buttonB()
{
  const UIdeviceStatus = document.querySelector('#deviceStatus');
  UIdeviceStatus.value = "Hostname: " + hostname + ' (' + haStatus + '),                    ' + Date();
  const UIresponse = document.querySelector('#response');
  UIresponse.innerHTML = "Hostname: " + hostname + ' (' + haStatus + '),                    ' + Date();
}

function button99()
{
  location.href = 'a10_menu_v1.html';
}

