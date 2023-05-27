function mockup_get() {
  var form = new FormData();
    // form.append("email", getLocalStorage("email"));
    form.append("email", "forus999@gmail.com");

    var settings = {
      "url": HOST_URL_TPLANET_DAEMON + "/mockup/get",
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false,
      "data": form
    };
    // const banner_image = document.querySelector('#preview_progressbarTW_img')
    
    $.ajax(settings).done(function (response) {
      const obj = JSON.parse(response)
      const data = obj.description 
      exChange(data)
      console.log(data['banner-image']);
      exChange(data)
    });
  }

  function exChange(data) {
    // $('#Tbanner_image').css("background-image",`url( ${HOST_URL_TPLANET_DAEMON}${data['banner-image']})`)
    $('#Tbanner_image').attr("src",`${HOST_URL_TPLANET_DAEMON}${data['banner-image']}`)
    $('#t_planet_img').attr("src",`${HOST_URL_TPLANET_DAEMON}${data['t-planet-img']}`)
    $('#csr_img').attr("src",` ${HOST_URL_TPLANET_DAEMON}${data['csr-img']}`)
    $('#sdg_img').attr("src",` ${HOST_URL_TPLANET_DAEMON}${data['sdg-img']}`)
    $('#twins_img').attr("src",` ${HOST_URL_TPLANET_DAEMON}${data['twins-img']}`)
    $('#textarea1').text(`${data['t-planet-description']}`)
    $('#textarea2').text(`${data['csr-description']}`)
    $('#textarea3').text(`${data['sdg-description']}`)
    $('#textarea4').text(`${data['twins-description']}`)
  }

    // Add_parent_tasks
$(document).ready (function () {
  mockup_get();
})
