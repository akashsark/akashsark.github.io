if (sessionStorage.getItem("servicelogs") != null) {
  window.location.replace("./dashboard.html");
}

function handler(){
document.getElementById('loading').style.display='block';
 var xhr = new XMLHttpRequest();
 var url = baseurl+"admin/login"
 xhr.open("POST", url, true);
 xhr.setRequestHeader("Content-type", "application/json");
 var body = {
   "adminEmail": document.getElementById("adminEmail").value,
   "adminPassword":  document.getElementById("adminPassword").value,
 };
 xhr.onload = function() {
   if (xhr.status == 200) {
      document.getElementById('loading').style.display='none';
      var data = JSON.parse(xhr.response);
      sessionStorage.setItem("servicelogs","true");
      sessionStorage.setItem("adminEmail",document.getElementById("adminEmail").value)
      window.location.replace(data.message);
   }else {
     document.getElementById('loading').style.display='none';
    alert("invalid credentials")
   }
 };
 xhr.send(JSON.stringify(body));

}
