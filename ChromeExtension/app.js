let siteNames;

const textField = document.getElementById("deleteSite");

const t = document.getElementById("btn");

const siteList = document.querySelector("#listedSites");

chrome.runtime.sendMessage({ command: "fetch" }, (response) => {
  showData(response.data);
});

var showData = function (data) {
  siteNames = Object.values(data);

  if (
    !siteNames.includes(window.location.hostname) &&
    window.location.hostname != "lfabdiaheldcphllcmlkaemegeenfchc"
  ) {
    let addTotrustedSites = confirm(
      "Would you like to add this site to your trusted sites. Click 'Ok' to add"
    );
    const loc = window.location.hostname;
    if (addTotrustedSites) {
      siteNames.push(loc);
      chrome.runtime.sendMessage(
        {
          command: "post",
          [window.location.hostname]: window.location.hostname,
        },
        (response) => {
          siteNames.push(Object.values(response.data));
        }
      );
    }

    if (!siteNames.includes(window.location.hostname)) {
      document.body.innerHTML = generateHTML(window.location.hostname);
      document.body.style = generateStyling();
    }
  }

  for (let i = 0; i < siteNames.length; i++) {
    const listItem = document.createElement("li");
    listItem.innerHTML = siteNames[i];
    siteList.appendChild(listItem);
  }

  return true;
};

const generateHTML = (pageName) => {
  return `  
  <center>
      <h1 >Phishy Site: 505</h1>
      <hr>
      <h1 >${pageName}</h1>
  </center>`;
};

const generateStyling = () => {
  return `<style>@import url(https://fonts.googleapis.com/css?family=opensans:500);
      body {
        background: #33cc99;
        color: #fff;
        font-family: "Open Sans", sans-serif;
        max-height: 700px;
        overflow: hidden;
      }
      hr {
        padding: 0;
        border: none;
        border-top: 5px solid #fff;
        color: #fff;
        text-align: center;
        margin: 0px auto;
        width: 420px;
        height: 10px;
        z-index: -10;
      }
  
      hr:after {
        display: inline-block;
        position: relative;
        top: -0.75em;
        font-size: 2em;
        padding: 0 0.2em;
        background: #33cc99;
      }
       </style>`;
};

document.getElementById("btn").addEventListener("click", function () {
  chrome.runtime.sendMessage(
    { command: "erase", [textField.value]: textField.value },
    (response) => {
      console.log(textField.value);
    }
  );
});
