let hostname = "vADC200"; haStatus = "Active";
var response = "{\"service-group\": \
{\"member-list\":[ \
{\"name\":\"172.31.102.129\", \"port\":19443, \"member-state\": \"disable\"}, \
{\"name\":\"172.31.102.129\", \"port\":29443, \"member-state\": \"enable\"}, \
{\"name\":\"172.31.102.130\", \"port\":19443, \"member-state\": \"disable\"}, \
{\"name\":\"172.31.102.130\", \"port\":29443, \"member-state\": \"enable\"}]} \
}"

function login()
{
  var st = document.getElementById("token");
  st.setAttribute("placeholder", "Hello World......");

  document.getElementById('deviceStatus').innerHTML = Date();
}

function buttonA()
{
  const UIdeviceStatus = document.querySelector('#deviceStatus');
  UIdeviceStatus.value = "Hostname: " + hostname + ' (' + haStatus + '),                    ' + Date();
  const UIresponse = document.querySelector('#response');
  UIresponse.innerHTML = "Hostname: " + hostname + ' (' + haStatus + '),                    ' + Date();
}

function buttonB()
{
  const UIdeviceStatus = document.querySelector('#deviceStatus');
  UIdeviceStatus.value = "Hostname: " + hostname + ' (' + haStatus + '),                    ' + Date();
  const UIresponse = document.querySelector('#response');
  UIresponse.innerHTML = "Hostname: " + hostname + ' (' + haStatus + '),                    ' + Date();
}

function f1()
{
  location.href = 'https://www.google.com';
}

