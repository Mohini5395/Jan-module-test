let displayData = document.getElementById('displayData');
let inputField = document.getElementById('inputBox')
let submitBtn = document.getElementById('sbmtBtn')
let errorMsg = document.getElementById('errorFound')
let resultField = document.getElementById('yourResult')


var watToGet = {
    method: 'GET',
};


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}
getLocation();

function showPosition(position) {

    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&apiKey=1885437f6c74473996c88273ec6ec6ba`, watToGet)
        .then(resp => resp.json())
        .then(result => {

            console.log(result.features[0].properties)
            let currentData = result.features[0].properties;
            innerBox.innerHTML = `
  <div>Name of Time Zone:${currentData.timezone.name}</div>
  <span>Lat  : ${currentData.lat}</span>  <span>Long:${currentData.lon}</span>
  <div>Offset STD:${currentData.timezone.offset_STD}</div>
  <div>Offset STD Seconds:${currentData.timezone.offset_STD_seconds}</div>
  <div>Offset DST:${currentData.timezone.offset_DST}</div>
  <div>Offset DST Seconds:${currentData.timezone.offset_DST_seconds}</div>
  <div>Country:${currentData.country}</div>
  <div>Postcode:${currentData.postcode}</div>
  <div>City:${currentData.city}</div>
  
  `
  })
  
}

function showResult() {
    yourResult.innerHTML = "";
    resultField.style.border = "none";
    const address = inputField.value;

    if (address == "") {
        errorFound.innerHTML = "Please enter an Address"


    }
    else {
        
        fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=a63eb030f4264dc69c7646522b1686b2`)
            .then(resp => resp.json())
            .then((geocodingResult) => {
                console.log(geocodingResult.features[0].properties);
                let addressData = geocodingResult.features[0].properties;


                yourResult.innerHTML = `
        <h1>Your Result</h1>
        <div>Name of Time Zone :${addressData.timezone.name}</div>
        <span>Lat  : ${addressData.lat}</span>  <span>Long:${addressData.lon}</span>
        <div>Offset STD :${addressData.timezone.offset_STD}</div>
        <div>Offset STD Seconds :${addressData.timezone.offset_STD_seconds}</div>
        <div>Offset DST :${addressData.timezone.offset_DST}</div>
        <div>Offset DST Seconds :${addressData.timezone.offset_DST_seconds}</div>
        <div>Country :${addressData.country}</div>
        <div>Postcode :${addressData.postcode}</div>
        <div>City :${addressData.city}</div>
        
        `
                errorFound.innerHTML = "";
                resultField.style.border = "2px solid white";
            
            });  
        
    }
}

submitBtn.addEventListener('click', showResult);