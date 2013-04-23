//@ sourceMappingURL=background.map
(function() {
  var loadOptions, saveOptions;

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var options;

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
    return true;
  });

  saveOptions = function(options) {
    var option_json;

    option_json = JSON.stringify(options);
    return localStorage.setItem("options", option_json);
  };

  loadOptions = function() {
    return JSON.parse(localStorage.getItem("options"));
  };

}).call(this);
