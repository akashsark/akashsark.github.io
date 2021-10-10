document.addEventListener("DOMContentLoaded", function () {
    var url = new URL(window.location.href);
    var MobileNumber = url.searchParams.get("m");
    console.log("MobileNumber from url "+MobileNumber)

    if(MobileNumber!=null || MobileNumber!=undefined){
    var xhr = new XMLHttpRequest();
    var url ="https://cameracomputerworld.herokuapp.com/visitor?phoneNumber="+MobileNumber
    xhr.open("GET", url, false);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();

    xhr.onreadystatechange = processRequest();

    function processRequest(e) {
      if (xhr.status == 201) {
       console.log("visitor saved");
      } else {
        var data =(xhr.response);
        console.log("visitor not saved -"+data);
      }
    }
  }
});

document.getElementById("offerButton").addEventListener("click", function() {
  var data;
  var mNumber=document.getElementById("textmob").value
  console.log("mobile number in offer popup is "+mNumber)
  var phoneno = /^\d{10}$/;
  if(mNumber.match(phoneno)){
  var xhr = new XMLHttpRequest();
  var url = "https://cameracomputerworld.herokuapp.com/offer/generateOfferCode"
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json");
  var body = {
    "mobileNumber":mNumber,
    "offerType":"SERVICE"
  };
  xhr.onload = function() {
    if (xhr.status == 201) {
        data = JSON.parse(xhr.response);
        console.log("code generated "+data);
        document.getElementById('textmob').style.display = 'none';
        document.getElementById("textmob1").innerHTML = data.offerCode;
        document.getElementById('textmob1').style.display = 'block';
        document.getElementById('copy').style.display = 'block';
        document.getElementById('submit').style.display = 'none';
    }else {
      console.log("code not generated "+xhr.response)
    }
  };
  xhr.send(JSON.stringify(body));
}else{
  alert("invalid phone number")
}

});
