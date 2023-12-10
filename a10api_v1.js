function f1()
{
  location.href = 'https://www.google.com';
}

function login()
{
  alert("login...")
  var st = document.getElementById("token");
  st.setAttribute(placeholder, "Hello World......"); 
}

function logout()
{
  alert("logout...")
}

function show_result()
{
  var st = document.getElementById("output2");
  st.innerHTML = "Hello World......";
}