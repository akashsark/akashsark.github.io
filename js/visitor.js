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
 // setTimeout(function(){   document.getElementById("explore").click();
document.getElementById("textmob").value=MobileNumber;
}, 2000);

});

document.getElementById("offerButton").addEventListener("click", function() {
  var data;
  var mNumber=document.getElementById("textmob").value
  console.log("mobile number in offer popup is "+mNumber)
  var phoneno = /^\d{10}$/;
  if(mNumber.match(phoneno)){
    // setTimeout(() => {
      document.getElementById('submit').style.display = 'none';
      document.getElementById('load').style.display = 'block';

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
        document.getElementById('load').style.display = 'none';
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        } else {
          console.log("code not generated "+xhr.response)
      }
    };
    try{
    xhr.send(JSON.stringify(body));
  }catch(err){
    var x = document.getElementById("snackbarFailed");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    document.getElementById('submit').style.display = 'block';
    document.getElementById('load').style.display = 'none';
  }
  }else{
  var x = document.getElementById("snackbarinvalid");
		  x.className = "show";
		  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
});


document.getElementById("getInTouch").addEventListener("click", function() {

  var xhr = new XMLHttpRequest();
  var url = "https://cameracomputerworld.herokuapp.com/getInTouch/sendMessage"
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json");
  var body = {
    "mobileNumber": document.getElementById("email-8db6").value,
    "name":  document.getElementById("name-8db6").value,
    "message": document.getElementById("message-8db6").value
  };
  xhr.onload = function() {
    if (xhr.status == 201) {
        data = xhr.response
        console.log("get in touch "+data);
        alert ("Message sent")
    }else {
      console.log("get in touch failed "+xhr.response)
    }
  };
  xhr.send(JSON.stringify(body));

 console.log("skdjbdskjfbdsjk");
});
