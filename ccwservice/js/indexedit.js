var thirdPartyExists=false
document.addEventListener("DOMContentLoaded", function () {
  if (sessionStorage.getItem("servicelogs") == null || sessionStorage.getItem("adminEmail") == null) {
    window.location.replace("./admin.html");
  }
  var xhr = new XMLHttpRequest();
  var url = "https://ccwservicebackend.herokuapp.com/service/getDetails"
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
    }else {
     alert("invalid srn")
    }
  };
  xhr.send(JSON.stringify(body));
});


$("input[type='radio']").change(function(){

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


document.getElementById("confirm").addEventListener("click", function() {
  // var e = document.getElementById("status");
	// var result = e.options[e.selectedIndex].text;
  // console.log("status is"+result);
  var xhr = new XMLHttpRequest();
  var url = "https://ccwservicebackend.herokuapp.com/service/updateCustomer"
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

    }

  };


  if(thirdPartyExists==true){
    body.thirdPartyService.thirdPartyName=document.getElementById('tpName').value,
    body.thirdPartyService.thirdPartyPrice=document.getElementById('tpPrice').value,
    body.thirdPartyService.dateOfSending=document.getElementById('tpSend').value,
    body.thirdPartyService.dateOfReceiving=document.getElementById('tpDate').value
    body.thirdPartyService.thirdPartySentFor=document.getElementById('tpIssue').value
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

});


document.getElementById("cancel").addEventListener("click", function() {
  if(sessionStorage.getItem('adminEmail')==="zomby"){
      window.location.replace("./dashboardAdmin.html");
  }else{
      window.location.replace("./dashboard.html");
   }
  });
