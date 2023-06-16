// mockup_get
import { mockup_upload } from './mockup.js'

function mockup_get() {
    var form = new FormData();
    form.append("email", getLocalStorage("email"));

    var settings = {
      "url": HOST_URL_TPLANET_DAEMON + "/mockup/get",
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false,
      "data": form
    };

    $.ajax(settings).done(function (response) {
      try {
        const obj = JSON.parse(response);
        if (obj.result != false && $.isEmptyObject(obj.description) === false) {
          const data = obj.description;
          exChange(data);
        }
      } catch(e) {console.log(e);}
    });
  }

function exChange(data) {
  $('#Tbanner_image').css("background-image",`url( ${HOST_URL_TPLANET_DAEMON}${data['banner-image']})`)
  
  if (`${data['t-planet-img']}`.localeCompare("undefined") === -1) {
    $('#t_planet_img').attr("src",`${HOST_URL_TPLANET_DAEMON}${data['t-planet-img']}`)
  }
  
  $('#csr_img').css("background-image",`url( ${HOST_URL_TPLANET_DAEMON}${data['csr-img']})`)
  $('#sdg_img').css("background-image",`url( ${HOST_URL_TPLANET_DAEMON}${data['sdg-img']})`)
  $('#twins_img').css("background-image",`url( ${HOST_URL_TPLANET_DAEMON}${data['twins-img']})`)
  
  if (`${data['t-planet-description']}`.localeCompare("undefined") === -1) {
    $('#textarea1').val(`${data['t-planet-description']}`)
  }

  if (`${data['csr-description']}`.localeCompare("undefined") === -1) {
    $('#textarea2').val(`${data['csr-description']}`)
  }

  if (`${data['sdg-description']}`.localeCompare("undefined") === -1) {
    $('#textarea3').val(`${data['sdg-description']}`)
  }

  if (`${data['twins-description']}`.localeCompare("undefined") === -1) {
    $('#textarea4').val(`${data['twins-description']}`)
  }
}

export function mockup_new() {
  const banner_image = document.querySelector('#banner-image').files[0];
  const t_planet_img = document.querySelector('#t-planet-img').files[0];
  const csr_img = document.querySelector('#csr-img').files[0];
  const sdg_img = document.querySelector('#sdg-img').files[0];
  const twins_img = document.querySelector('#twins-img').files[0];
    
  const t_planet_description = document.querySelector('#textarea1').value;
  const csr_description = document.querySelector('#textarea2').value;
  const sdg_description = document.querySelector('#textarea3').value;
  const twins_description = document.querySelector('#textarea4').value;

  var formData = new  FormData();
  formData.append("banner-image",banner_image)
  formData.append("t-planet-img",t_planet_img)
  formData.append("csr-img",csr_img)
  formData.append("sdg-img",sdg_img)
  formData.append("twins-img", twins_img)

  formData.append("t-planet-description",t_planet_description)
  formData.append("csr-description ",csr_description)
  formData.append("sdg-description",sdg_description)
  formData.append("twins-description",twins_description)
  formData.append("email",  getLocalStorage("email"));
  var resultJSON = mockup_upload(formData)
  if (resultJSON.result == true) {
    alert("更新成功");
    location.reload();      
  } else {
    alert("更新失敗，請洽系統管理人員");
  }
}
  
function banner_image_read(input){
  if(input.files && input.files[0]){
    var reader = new FileReader();
    reader.onload = function (e) {
      var url = e.target.result
      $("#Tbanner_image").css('background-image', `url( ${url})`);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

function t_planet_img_read(input){
  if(input.files && input.files[0]){
    var reader = new FileReader();
    reader.onload = function (e) {
      var url = e.target.result
       $("#t_planet_img").attr('src', `${url}`);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

function csr_img_read(input){
  if(input.files && input.files[0]){
    var reader = new FileReader();
    reader.onload = function (e) {
      var url = e.target.result
       $("#csr_img").css('background-image', `url( ${url})`);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

function sdg_img_read(input){
  if(input.files && input.files[0]){
    var reader = new FileReader();
    reader.onload = function (e) {
      var url = e.target.result
       $("#sdg_img").css('background-image', `url( ${url})`);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

function twins_img_read(input){
  if(input.files && input.files[0]){
    var reader = new FileReader();
    reader.onload = function (e) {
      var url = e.target.result
       $("#twins_img").css('background-image', `url( ${url})`);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

// Add_parent_tasks
$(document).ready (function () {
  mockup_get();
  $('#banner-image').on("change",function(e){
    banner_image_read(this)
  })
  $('#t-planet-img').on("change",function(e){
    t_planet_img_read(this)
  })
  $('#csr-img').on("change",function(e){
    csr_img_read(this)
  })
  $('#sdg-img').on("change",function(e){
    sdg_img_read(this)
  })
  $('#twins-img').on("change",function(e){
    twins_img_read(this)
  })
  $("#store").on("click", function(e) {
    e.preventDefault();
    mockup_new();
  });
})
