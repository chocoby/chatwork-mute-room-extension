'use strict';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let options;
  switch (request.mode) {
    case "initialize":
      options = loadOptions();
      sendResponse({
        status: "success",
        options: options
      });
      break;
    case "loadOptions":
      options = loadOptions();
      sendResponse({
        status: "success",
        options: options
      });
      break;
    case "saveOptions":
      saveOptions(request.options);
      sendResponse({
        status: "success"
      });
      break;
    default:
      console.error("Undefined function: " + request.mode);
  }
});

function saveOptions(options) {
  let optionJson = JSON.stringify(options);
  localStorage.setItem("options", optionJson);
};

function loadOptions() {
  return JSON.parse(localStorage.getItem("options"));
};
