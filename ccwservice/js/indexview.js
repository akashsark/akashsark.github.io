document.addEventListener("DOMContentLoaded", function () {
  if (sessionStorage.getItem("servicelogs") == null || sessionStorage.getItem("adminEmail") == null) {
    window.location.replace("./admin.html");
  }
  var xhr = new XMLHttpRequest();
  var url = baseurl+"service/getDetails"
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json");
  var body = {
    "srn":  sessionStorage.getItem("srn")
  };
  xhr.onload = function() {
    if (xhr.status == 200) {
      data=JSON.parse(xhr.response);
      var f = document.forms['xx'];
      for(var i=0,fLen=f.length;i<fLen;i++){
        f.elements[i].readOnly = true;//As @oldergod noted, the "O" must be upper case
      }
      document.getElementById('srnI').value=data.SRN;
      document.getElementById('cnameI').value=data.cName;
      document.getElementById('contactI').value=data.cPhone;
      document.getElementById('pDescI').value=data.pDesc;
      document.getElementById('pSnoI').value=data.pSno;
      document.getElementById('pIssueI').value=data.pIssue;
      document.getElementById('pDelivDate').value=data.pDeliv;
      document.getElementById('pAccessI').value=data.pAccess;
      document.getElementById('pTotalCostI').value=data.pTotal;
      document.getElementById(data.pThirdPartyExists).checked = true;
      document.getElementById('true').disabled=true;
      document.getElementById('false').disabled=true;
      document.getElementById('aTrue').disabled=true;
      document.getElementById('aFalse').disabled=true;


      if(data.pThirdPartyExists==true){
        string3=`<div id="child">
                   <div class="form-row">
                    <div class="name">Third Party Name</div>
                    <div class="value">
                          <div class="input-group">
                                  <input class="input--style-5" type="text" id="tpName">
                           </div>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="name">Third Party Sent For</div>
                    <div class="value">
                          <div class="input-group">
                                  <input class="input--style-5" type="text" id="tpIssue">
                           </div>
                    </div>
                  </div>

                    <div class="form-row">
                      <div class="name">Third Party Cost</div>
                      <div class="value">
                            <div class="input-group">
                                    <input class="input--style-5" type="text" id="tpPrice">
                             </div>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="name">Third Party Sending Date</div>
                      <div class="value">
                            <div class="input-group">
                                    <input class="input--style-5" type="date" id="tpSend">
                             </div>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="name">Third Party Receiving Date</div>
                      <div class="value">
                            <div class="input-group">
                                    <input class="input--style-5" type="date" id="tpDate">
                             </div>
                      </div>
                    </div>
                  </div>
                  </div>`;
                  var container = document.createElement("div");
                  container.innerHTML = string3;
                  document.getElementById("placeholderI").appendChild(container);
                  document.getElementById('tpName').value=data.thirdPartyName;
                  document.getElementById('tpPrice').value=data.thirdPartyCost;
                  document.getElementById('tpSend').value=data.thirdPartyRecevingDate;
                  document.getElementById('tpDate').value=data.thirdPartySendingDate;
                  document.getElementById('tpIssue').value=data.thirdPartySent;

         }
         if(data.pAccessoriesExists==true){

           var details = JSON.parse(data. pAccesoriesAdded)
           document.getElementById('aTrue').checked = true;
           document.getElementById('aTrue').disabled=true;
           document.getElementById('aFalse').disabled=true;

           string4=`<div id="accTable">
           <table id="tblCustomers" cellpadding="0" cellspacing="0" border="1" style="margin-bottom: 3%;">
             <thead>
                 <tr>
                     <th>Product Name</th>
                     <th id="quantity">Quantity</th>
                     <th id="price">Price</th>
                 </tr>
             </thead>
             <tbody>
             </tbody>
         </table>
         </div>`;
           var container = document.createElement("div");
           container.innerHTML = string4;
          document.getElementById("placeholderAccesoriesI").appendChild(container);
          for(var i=0;i<details.length;i++){
            AddRow(details[i].pname,details[i].quantity,details[i].price)
          }
         }
    }else {
     alert("invalid srn")
    }
  };
  xhr.send(JSON.stringify(body));
});

function Add() {
       var txtName = document.getElementById("txtName");
       var txtQuantity = document.getElementById("txtQuantity");
       var txtPrice = document.getElementById("txtPrice");
       AddRow(txtName.value, txtQuantity.value, txtPrice.value);
       txtName.value = "";
       txtQuantity.value = "";
       txtPrice.value=""
   };

   function AddRow(name, quantity, price) {
       //Get the reference of the Table's TBODY element.
       var tBody = document.getElementById("tblCustomers").getElementsByTagName("TBODY")[0];

       //Add Row.
       row = tBody.insertRow(-1);

       //Add Name cell.
       var cell = row.insertCell(-1);
       cell.innerHTML = name;

       //Add Country cell.
       cell = row.insertCell(-1);
       cell.innerHTML = quantity;

       //Add Price Cell
       cell = row.insertCell(-1);
       cell.innerHTML = price;

   }
document.getElementById('cancel').addEventListener("click", function() {
  if(sessionStorage.getItem('adminEmail')==="zomby"){
      window.location.replace("./dashboardAdmin.html");
  }else{
      window.location.replace("./dashboard.html");
   }

});
