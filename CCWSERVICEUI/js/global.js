if (localStorage.getItem("servicelogs") == null || localStorage.getItem("adminEmail") == null) {
  window.location = "./admin.html";
}

var thirdPartyExists=false
$("input[type='radio']").change(function(){

   if($(this).val()=="yes"){
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
              document.getElementById("placeholder").appendChild(container);
            }
   else{
     thirdPartyExists=false;
     const var1 = document.getElementById("child");
      var1.parentNode.removeChild(var1);
      console.log("tp disable");
   }

});

document.getElementById("register").addEventListener("click", function() {
  var e = document.getElementById("status");
	var result = e.options[e.selectedIndex].text;
  console.log("status is"+result);
  var xhr = new XMLHttpRequest();
  var url = "http://localhost:9002/service/saveCustomer"
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json");
  var body = {
    "customerName":document.getElementById('cname').value,
    "customerMobile":document.getElementById('contact').value,
    "productDescription":document.getElementById('pDesc').value,
    "productSerialNumber":document.getElementById('pSno').value,
    "productIssue":document.getElementById('pIssue').value,
    "expectedDateOfDelivery":document.getElementById('pDelivDate').value,
    "accessoriesReceived":document.getElementById('pAccess').value,
    "adminId":localStorage.getItem('adminEmail'),
    "thirdPartyServiceExists":thirdPartyExists,
    "totalServiceCharge":document.getElementById('pTotalCost').value,
    "deliveryStatus":{
      "status":result,
      "expectedDateOfDelivery":document.getElementById('pDelivDate').value
   },
    "thirdPartyService" : {

    }

  };


  if(thirdPartyExists==true){
    body.thirdPartyService.thirdPartyName=document.getElementById('tpName').value,
    body.thirdPartyService.thirdPartyPrice=document.getElementById('tpPrice').value,
    body.thirdPartyService.dateOfSending=document.getElementById('tpSend').value,
    body.thirdPartyService.dateOfReceiving=document.getElementById('tpDate').value
  }
   // "thirdPartyService" : {
   //   "thirdPartyName":document.getElementById('tpName').value,
   //   "thirdPartyPrice":document.getElementById('tpPrice').value,
   //   "dateOfSending":document.getElementById('tpSend').value,
   //   "dateOfReceiving":document.getElementById('tpDate').value
   // }

  xhr.onload = function() {
    if (xhr.status == 201) {
        alert("Submitted")
        data = JSON.parse(xhr.response);
        window.open("./dashboard.html", "app", "resizable=yes");
        console.log("code generated "+data);
        } else {
          console.log("code not generated "+xhr.response)
      }
    };
    try{
        xhr.send(JSON.stringify(body));
  }catch(err){
    alert(err)
  }

});
