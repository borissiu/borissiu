let hostname = "vADC200"; haStatus = "Active"
function f1()
{
  location.href = 'https://www.google.com';
}

function login()
{
  var st = document.getElementById("token");
  st.setAttribute("placeholder", "Hello World......");

  document.getElementById('deviceStatus').innerHTML = Date();
}

function buttonA()
{
  const UIdeviceStatus = document.querySelector('#deviceStatus');
  UIdeviceStatus.value = "Hostname: " + hostname + ' ' + haStatus + ', ' + Date();
}

function show_result()
{
  var st = document.getElementById("output2");
  st.innerHTML = "Hello World......";

  document.getElementById('deviceStatus').innerHTML = Date();
}