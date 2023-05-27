export function mockup_upload(form) {
  
  var resultJSON = {};
  var settings = {
    "url": HOST_URL_TPLANET_DAEMON + "/mockup/new",
    "method": "POST",
    "async": false,
    "timeout": 0,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form
  };
  
  $.ajax(settings).done(function (response) {
    resultJSON = JSON.parse(response);
  });
  
  return resultJSON;
}

export function mockup_get(form) {
  var resultJSON = {};
  
  var settings = {
    "url": HOST_URL_TPLANET_DAEMON + "/mockup/get",
    "method": "POST",
    "timeout": 0,
    "async": false,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form
  };
  
  $.ajax(settings).done(function (response) {
    resultJSON = JSON.parse(response);
  });

  return resultJSON;
}
