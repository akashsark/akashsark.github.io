var thirdPartyExists=false
var paccessoriesExists=false
var dataValue=""
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
      if(data.pThirdPartyExists==true){
        thirdPartyExists=true;
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
                  document.getElementById("placeholderEdit").appendChild(container);
                  document.getElementById('tpName').value=data.thirdPartyName;
                  document.getElementById('tpPrice').value=data.thirdPartyCost;
                  document.getElementById('tpSend').value=data.thirdPartyRecevingDate;
                  document.getElementById('tpDate').value=data.thirdPartySendingDate;
                  document.getElementById('tpIssue').value=data.thirdPartySent;
         }
         if(data.pAccessoriesExists==true){
           paccessoriesExists=true;
           sessionStorage.setItem("accesoriesExists","true");
           dataValue=JSON.parse(data. pAccesoriesAdded)
           preFillAccessories(dataValue);
         }
    }else {
     alert("invalid srn")
    }
  };
  xhr.send(JSON.stringify(body));
});
function collectAccessories(){

let countArr = [];
let accessoriesDetails =[];
  var cell = document.getElementsByTagName("td");
         var i = 0;
         while(cell[i] != undefined){
              if(cell[i].innerHTML.indexOf("<") ==-1){
                countArr.push(cell[i].innerHTML);
              }
              i++;
            }

for(var i=0;i<(countArr.length);i=i+3){
  accessoriesDetails.push({
    pname: countArr[i],
    quantity: countArr[i+1],
    price: countArr[i+2]
  })
}
  console.log("accessoriesDetails"+JSON.stringify(accessoriesDetails))
  return JSON.stringify(accessoriesDetails);

}

$(document).ready(function() {
    $("input[name$='exist']").change(function() {

   if($(this).val()=="yes" && thirdPartyExists==false ){
     console.log("tp enable");
     thirdPartyExists=true;
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
              document.getElementById("placeholderEdit").appendChild(container);
            }
   else{
     thirdPartyExists=false;
     const var1 = document.getElementById("child");
      var1.parentNode.removeChild(var1);
      console.log("tp disable in indexedit.js");
   }
});
});

$(document).ready(function() {
    $("input[name$='Accessories']").change(function() {
      if($(this).val()=="yes" && paccessoriesExists==false){
      paccessoriesExists=true;
      string4=`<div id="accTable">
      <table id="tblCustomers" cellpadding="0" cellspacing="0" border="1" style="margin-bottom: 3%;">
        <thead>
            <tr>
                <th>Product Name</th>
                <th id="quantity">Quantity</th>
                <th id="price">Price</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
        <tfoot>
            <tr>
                <td><input type="text" id="txtName" /></td>
                <td><input type="text" id="txtQuantity" /></td>
                <td><input type="text" id="txtPrice" /></td>
                <td><button type="button" id="add" onclick="Add()" value="Add" >Add</button></td>
            </tr>
        </tfoot>
    </table>
    </div>
`

      var container = document.createElement("div");
      container.innerHTML = string4;
     document.getElementById("placeholderAccesoriesEdit").appendChild(container);

   }else{
     paccessoriesExists=false;
     const var1 = document.getElementById("accTable");
      var1.parentNode.removeChild(var1);
      console.log("tp disable");
   }

    });

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

     function Remove(button) {
         //Determine the reference of the Row using the Button.
         var row = button.parentNode.parentNode;
         var name = row.getElementsByTagName("TD")[0].innerHTML;
         if (confirm("Do you want to delete the product: " + name)) {

             //Get the reference of the Table.
             var table = document.getElementById("tblCustomers");

             //Delete the Table row using it's Index.
             table.deleteRow(row.rowIndex);
         }
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

         //Add Button cell.
         cell = row.insertCell(-1);
         var btnRemove = document.createElement("INPUT");
         btnRemove.type = "button";
         btnRemove.value = "Remove";
         btnRemove.id = "remove";
         btnRemove.setAttribute("onclick", "Remove(this);");
         cell.appendChild(btnRemove);
     }

document.getElementById("confirm").addEventListener("click", function() {

 if (validation()){
   var xhr = new XMLHttpRequest();
   var url = baseurl+"service/updateCustomer"
   xhr.open("PUT", url, false);
   xhr.setRequestHeader("Content-type", "application/json");
   var body = {
     "serviceRequestNumber":document.getElementById('srnI').value,
     "customerName":document.getElementById('cnameI').value,
     "customerMobile":document.getElementById('contactI').value,
     "productDescription":document.getElementById('pDescI').value,
     "productSerialNumber":document.getElementById('pSnoI').value,
     "productIssue":document.getElementById('pIssueI').value,
     "accessoriesReceived":document.getElementById('pAccessI').value,
     "adminId":sessionStorage.getItem('adminEmail'),
     "thirdPartyServiceExists":thirdPartyExists,
     "totalServiceCharge":document.getElementById('pTotalCostI').value,
     "deliveryStatus":{
       "status":"IN PROGRESS",
       "expectedDateOfDelivery":document.getElementById('pDelivDate').value
    },
     "thirdPartyService" : {

     },
       "accesoriesExists":paccessoriesExists,
       "productDetails":{

       }

   };


   if(thirdPartyExists==true){
     body.thirdPartyService.thirdPartyName=document.getElementById('tpName').value,
     body.thirdPartyService.thirdPartyPrice=document.getElementById('tpPrice').value,
     body.thirdPartyService.dateOfSending=document.getElementById('tpSend').value,
     body.thirdPartyService.dateOfReceiving=document.getElementById('tpDate').value
     body.thirdPartyService.thirdPartySentFor=document.getElementById('tpIssue').value
   }
   if(paccessoriesExists==true){
     body.productDetails.accessoriesAdded = collectAccessories()
   }

   xhr.onload = function() {
     if (xhr.status == 201) {
         alert("Case is Updated")
         if(sessionStorage.getItem('adminEmail')==="zomby"){
             window.location.replace("./dashboardAdmin.html");
         }else{
             window.location.replace("./dashboard.html");
          }
         } else {
             alert("Failed "+xhr.response)
           console.log("code not generated "+xhr.response)
       }
     };
     try{
         xhr.send(JSON.stringify(body));
   }catch(err){
     alert(err)
   }
 }


});


document.getElementById("cancel").addEventListener("click", function() {
  if(sessionStorage.getItem('adminEmail')==="zomby"){
      window.location.replace("./dashboardAdmin.html");
  }else{
      window.location.replace("./dashboard.html");
   }
  });

function preFillAccessories(details){

  document.getElementById('aTrue').checked = true;

  string4=`<div id="accTable">
  <table id="tblCustomers" cellpadding="0" cellspacing="0" border="1" style="margin-bottom:3%;">
    <thead>
        <tr>
            <th>Product Name</th>
            <th id="quantity">Quantity</th>
            <th id="price">Price</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody contenteditable='true'>
    </tbody>
    <tfoot>
        <tr>
            <td><input type="text" id="txtName" /></td>
            <td><input type="text" id="txtQuantity" /></td>
            <td><input type="text" id="txtPrice" /></td>
           <td><button type="button" id="add" onclick="Add()" value="Add" >Add</button></td>
        </tr>
    </tfoot>
</table>
</div>
`;
  var container = document.createElement("div");
  container.innerHTML = string4;
 document.getElementById("placeholderAccesoriesEdit").appendChild(container);
 for(var i=0;i<details.length;i++){
   AddRow(details[i].pname,details[i].quantity,details[i].price)
 }
}
function validation(){
  var mob = /^[1-9]{1}[0-9]{9}$/;
  var cnameI = document.getElementById('cnameI');
  var contactI = document.getElementById('contactI');
  var pDescI = document.getElementById('pDescI');
  var pSnoI = document.getElementById('pSnoI');
  var pIssueI = document.getElementById('pIssueI');
  var pAccessI = document.getElementById('pAccessI');
  var pTotalCostI = document.getElementById('pTotalCostI');
  var pDelivDate = document.getElementById('pDelivDate');
  if(thirdPartyExists == true){
    var tpName = document.getElementById('tpName');
    var tpPrice = document.getElementById('tpPrice');
    var tpSend = document.getElementById('tpSend');
    var tpDate = document.getElementById('tpDate')
    var tpIssue = document.getElementById('tpIssue');
    }

  if(cnameI.value==="" || cnameI.value===" " ){
    alert("Please enter customer name")
    cnameI.focus();
    return false;
  }
  if(contactI.value==="" || contactI.value===" " ){
    alert("Please enter customer mobile number")
    contactI.focus()
    return false;
  }
  if(pDescI.value==="" || pDescI.value===" " ){
    alert("Please enter product description")
    pDescI.focus()
    return false;
  }
  if(pSnoI.value==="" || pSnoI.value===" " ){
    alert("Please enter product serial number")
    pSnoI.focus()
    return false;
  }
  if(pIssueI.value==="" || pIssueI.value===" " ){
    alert("Please enter product issue")
    pIssueI.focus()
    return false;
  }
  if(pAccessI.value==="" || pAccessI.value===" " ){
    alert("Please enter accessories received")
    pAccessI.focus()
    return false;
  }
  if(pTotalCostI.value==="" || pTotalCostI.value===" " ){
    alert("Please enter service charge")
    pTotalCostI.focus()
    return false;
  }
  if(pDelivDate.value==="" || pDelivDate.value===" " ){
    alert("Please enter delivery date")
    pDelivDate.focus()
    return false;
  }
  if(thirdPartyExists == true){
    if(tpName.value==="" || tpName.value===" " ){
      alert("Please enter third party name")
      tpName.focus();
      return false;
    }
    if(tpPrice.value==="" || tpPrice.value===" " ){
      alert("Please enter third party cost")
      tpPrice.focus();
      return false;
    }
    if(tpSend.value==="" || tpSend.value===" " ){
      alert("Please enter third party sending date")
      tpSend.focus();
      return false;
    }
    if(tpDate.value==="" || tpDate.value===" " ){
      alert("Please enter third party receiving date")
      tpDate.focus()
      return false;
    }
    if(tpIssue.value==="" || tpIssue.value===" " ){
      alert("Please enter third party sent for:")
      tpIssue.focus()
      return false;
    }
  }
  if(paccessoriesExists==true){
    var cell = document.getElementsByTagName("td");
    if(cell.length==4){
      alert("Please fill Accessories Added Table")
      return false;
    }
  }
  return true;
}
