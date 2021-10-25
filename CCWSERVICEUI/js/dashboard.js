document.addEventListener("DOMContentLoaded", function () {
  var xhr = new XMLHttpRequest();
  var url = "http://localhost:9002/service/getInProgressWork?adminEmail="+localStorage.getItem('adminEmail')
  xhr.open("GET", url, false);
  var oauth = "Bearer " + localStorage.getItem("access_token");
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
        alert(data)
      }
    }
});

function notificationContent(data) {
    for(var i=0;i<data.length;i++){
      var string3=` <tr>
                  <th scope="row">${data[i].SRN}</th>
                  <td>${data[i].psno}</td>
                  <td>${data[i].cname}</td>
                  <td>
                    <button type="button" id="view${i}" value="${data[i].SRN}" class="btn btn-primary" id=''><i class="far fa-eye"></i></button>
                    <button type="button" id="edit${i}" class="btn btn-success"><i class="fas fa-edit"></i></button>
                    <button type="button" id="tick${i}" class="btn btn-danger"><i class="fas fa-check"></i></button>
                    <button type="button" id="cancel${i}" class="btn btn-secondary"><i class="far fa-trash-alt"></i></button>
                  </td>
                </tr>`;
      var tableRef = document.getElementById('tada').getElementsByTagName('tbody')[0];
      var newRow = tableRef.insertRow(tableRef.rows.length);
      newRow.innerHTML = string3;

    document.getElementById("view" + i).addEventListener("click", function () {
       localStorage.setItem("srn",document.getElementById(this.id).value)
       window.open("./indexview.html", "app", "resizable=yes");
       console.log("log: ", this);
  });

  document.getElementById("edit" + i).addEventListener("click", function () {
     window.open("./indexedit.html", "app", "resizable=yes");
     console.log("log: ", this);
});

 }
}
