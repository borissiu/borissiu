let hostname = "vADC200"; haStatus = "Active";

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
  document.body.appendChild(document.createTextNode(response));
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

