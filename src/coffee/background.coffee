chrome.runtime.onMessage.addListener (request, sender, sendResponse) ->
  switch request.mode
    when "initialize"
      options = loadOptions()
      sendResponse { status: "success", options: options }
    when "loadOptions"
      options = loadOptions()
      sendResponse { status: "success", options: options }
    when "saveOptions"
      saveOptions request.options
      sendResponse { status: "success" }
    else
      console.error "Undefined function: #{request.mode}"

  true

saveOptions = (options) ->
  option_json = JSON.stringify(options)
  localStorage.setItem "options", option_json

loadOptions = ->
  JSON.parse(localStorage.getItem "options")
