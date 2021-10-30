if (sessionStorage.getItem("adminlogs") != null) {
  window.location = "./offerRedeem.html";
}

function handler(){
 var xhr = new XMLHttpRequest();
 var url = "https://cameracomputerworld.herokuapp.com/admin/login"
 xhr.open("POST", url, false);
 xhr.setRequestHeader("Content-type", "application/json");
 var body = {
   "adminEmail": document.getElementById("adminEmail").value,
   "adminPassword":  document.getElementById("adminPassword").value,
 };
 xhr.onload = function() {
   if (xhr.status == 200) {
         sessionStorage.setItem("adminlogs","true");
         window.location = "offerRedeem.html";
   }else {
    alert("invalid credentials")
   }
 };
 xhr.send(JSON.stringify(body));

}



// {
//   "adminId": 935,
//   "adminEmail": "mukesh",
//   "adminPassword": "mukesh",
//   "adminRole": "owner"
// }
