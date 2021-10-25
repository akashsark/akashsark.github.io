if (localStorage.getItem("servicelogs") != null) {
  window.location = "./index.html";
}

function handler(){
 var xhr = new XMLHttpRequest();
 var url = "http://localhost:9002/admin/login"
 xhr.open("POST", url, false);
 xhr.setRequestHeader("Content-type", "application/json");
 var body = {
   "adminEmail": document.getElementById("adminEmail").value,
   "adminPassword":  document.getElementById("adminPassword").value,
 };
 xhr.onload = function() {
   if (xhr.status == 200) {
      localStorage.setItem("servicelogs","true");
      localStorage.setItem("adminEmail",document.getElementById("adminEmail").value)
      window.location = "index.html";
   }else {
    alert("invalid credentials")
   }
 };
 xhr.send(JSON.stringify(body));

}
