document.addEventListener("DOMContentLoaded", function () {
  var xhr = new XMLHttpRequest();
  var url = "https://ccwservice.herokuapp.com/service/getDetails"
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json");
  var body = {
    "srn":  localStorage.getItem("srn")
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
      // document.getElementById("statusI").value = data.status;
      // document.getElementById("statusI").disabled=true;
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
    }else {
     alert("invalid srn")
    }
  };
  xhr.send(JSON.stringify(body));
});

document.getElementById('cancel').addEventListener("click", function() {
  if(localStorage.getItem('adminEmail')==="zomby"){
      window.open("./dashboardAdmin.html", "app", "resizable=yes");
  }else{
          window.open("./dashboard.html", "app", "resizable=yes");
   }

});
