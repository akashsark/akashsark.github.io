document.addEventListener("DOMContentLoaded", function () {
  if (sessionStorage.getItem("servicelogs") == null || sessionStorage.getItem("adminEmail") == null) {
    window.location.replace("./admin.html");
  }
  var xhr = new XMLHttpRequest();
  var url = "https://ccwservicebackend.herokuapp.com/service/getInProgressWork?adminEmail="+sessionStorage.getItem('adminEmail')
  xhr.open("GET", url, false);
  var oauth = "Bearer " + sessionStorage.getItem("access_token");
  xhr.setRequestHeader("Authorization", oauth);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send();

  xhr.onreadystatechange = processRequest();

  function processRequest(e) {
    if (xhr.status == 200) {
        var data = JSON.parse(xhr.response);
        notificationContent(data);
      }
      else {
        alert(data.message)
      }
    }
});

function notificationContent(data) {
    for(var i=0;i<data.length;i++){
      var string3=` <tr>
                  <th scope="row">${data[i].SRN}</th>
                  <td>${data[i].cname}</td>
                  <td>${data[i].expectedDateOfDelivery}</td>
                  <td>${data[i].status}</td>
                  <td>
                    <button type="button" id="view${i}" value="${data[i].SRN}" class="btn btn-primary" id=''><i class="far fa-eye"></i></button>
                    <button type="button" id="edit${i}" value="${data[i].SRN}" class="btn btn-success"><i class="fas fa-edit"></i></button>
                    <button type="button" id="tick${i}" value="${data[i].SRN}"class="btn btn-danger"><i class="fas fa-check"></i></button>
                    <button type="button" id="cancel${i}" value="${data[i].SRN}" class="btn btn-secondary"><i class="far fa-trash-alt"></i></button>
                    <button type="button" id="verify${i}" value="${data[i].SRN}" class="btn btn-secondary"><i class="fa fa-users"></i></button>
                  </td>
                </tr>`;
      var tableRef = document.getElementById('tada').getElementsByTagName('tbody')[0];
      var newRow = tableRef.insertRow(tableRef.rows.length);
      newRow.innerHTML = string3;

    document.getElementById("view" + i).addEventListener("click", function () {
       sessionStorage.setItem("srn",document.getElementById(this.id).value)
       window.location.replace("./indexview.html")
       // window.open("./indexview.html", "app", "resizable=yes");
       console.log("log: ", this);
  });

  document.getElementById("edit" + i).addEventListener("click", function () {
     sessionStorage.setItem("srn",document.getElementById(this.id).value)
     window.location.replace("./indexedit.html")
     // window.open("./indexedit.html", "app", "resizable=yes");
     console.log("log: ", this);
  });

  document.getElementById("tick" + i).addEventListener("click", function () {
    var xhr = new XMLHttpRequest();
    var url = "https://ccwservicebackend.herokuapp.com/service/resolveCase"
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json");
    var body = {
      "status":"COMPLETED",
      "srn":document.getElementById(this.id).value,
      "adminEmail":sessionStorage.getItem('adminEmail')
    };
    xhr.onload = function() {

      if (xhr.status == 201) {
      alert("Successfully Closed")
      window.location.replace("./dashboard.html")
      // window.open("./dashboard.html", "app", "resizable=yes");
      }else {
       var data = JSON.parse(xhr.response);
       alert(data.message)
      }
    };

    xhr.send(JSON.stringify(body));
  });

  document.getElementById("cancel" + i).addEventListener("click", function () {

    var xhr = new XMLHttpRequest();
    var url = "https://ccwservicebackend.herokuapp.com/service/resolveCase"
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json");
    var body = {
      "status":"CANCELLED",
      "srn":document.getElementById(this.id).value,
      "adminEmail": sessionStorage.getItem('adminEmail')
    };
    xhr.onload = function() {

      if (xhr.status == 201) {
         alert("Successfully cancelled")
         window.location.replace("./dashboard.html")
         // window.open("./dashboard.html", "app", "resizable=yes");
      }else {
       var data = JSON.parse(xhr.response);
       alert(data.message)
      }
    };
    xhr.send(JSON.stringify(body));
  });

  document.getElementById("verify" + i).addEventListener("click", function () {
     sessionStorage.setItem("srn",document.getElementById(this.id).value)
     document.getElementById("myForm").style.display = "block";
  });
 }

}
document.getElementById('newcase').addEventListener("click", function () {
   window.location.replace("./index.html")
   // window.open("./index.html", "app", "resizable=yes");
});

document.getElementById('signout').addEventListener("click", function () {
   sessionStorage.clear();
   window.location.replace("./admin.html")
   // window.open("./admin.html", "app", "resizable=yes");
});
