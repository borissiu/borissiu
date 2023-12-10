let hostname = "Undefine"; haStatus = "Undefine";

function login()
{
  var st = document.getElementById("token");
  st.setAttribute("placeholder", "Hello World......");
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

