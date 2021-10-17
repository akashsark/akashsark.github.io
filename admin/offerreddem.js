function redeemCode(){
 var xhr = new XMLHttpRequest();
 var url = "https://cameracomputerworld.herokuapp.com/offer/reddeemOfferCode"
 xhr.open("POST", url, false);
 xhr.setRequestHeader("Content-type", "application/json");
 var body = {
   "mobileNumber": document.getElementById("mphone").value,
   "offerCode":  document.getElementById("ofCode").value,
 };
 xhr.onload = function() {
   if (xhr.status == 201) {
        alert(xhr.response)
         document.getElementById("mphone").value="";
         document.getElementById("ofCode").value=""
   }else {
        alert(xhr.response)
   }
 };
 xhr.send(JSON.stringify(body));

}
