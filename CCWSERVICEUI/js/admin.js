if (localStorage.getItem("servicelogs") != null) {
  window.location = "./dashboard.html";
}

function handler(){
 var xhr = new XMLHttpRequest();
 var url = "https://ccwservice.herokuapp.com/admin/login"
 xhr.open("POST", url, false);
 xhr.setRequestHeader("Content-type", "application/json");
 var body = {
   "adminEmail": document.getElementById("adminEmail").value,
   "adminPassword":  document.getElementById("adminPassword").value,
 };
 xhr.onload = function() {
   if (xhr.status == 200) {
       var data = JSON.parse(xhr.response);
      localStorage.setItem("servicelogs","true");
      localStorage.setItem("adminEmail",document.getElementById("adminEmail").value)
      window.location = data.message;
   }else {
    alert("invalid credentials")
   }
 };
 xhr.send(JSON.stringify(body));

}
