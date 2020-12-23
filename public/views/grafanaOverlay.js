if (window.location.pathname === "/login"){
//Hide website while processing overlay
document.querySelector("body > grafana-app > div").hidden = true
window.onload = function () {
    document.querySelector("body > grafana-app > div > div > react-container > div > div > div > div > h1").innerText = "SLA Dashboard"
    document.querySelector("body > grafana-app > div > div > react-container > div > div > div > div > h3").innerHTML = "Governify - Powered by  <img width=16 src='https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/8135670941548141941-512.png'>"
    //Show full website again
    document.querySelector("body > grafana-app > div").hidden = false;
    console.log("Governify overlay loaded.");
}
}