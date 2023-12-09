function f1()
{
  location.href = 'https://www.google.com';
}

function login()
{
  alert("login...")
}

function logout()
{
  alert("logout...")
}

function show_result(result)
{
  var div = document.getElementById("output2");
  
  var text = document.createElement("textarea");
  text.appendChild(document.createTextNode(result));
}