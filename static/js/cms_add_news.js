import { news_add } from './news.js'
import { mockup_upload, mockup_get } from './mockup.js'

export function set_page_info_cms_add_news() {
  var form = new FormData();
  form.append("email", getLocalStorage("email"));
  var obj_mockup = mockup_get(form)
  try {
    if (obj_mockup.description.hasOwnProperty("news-banner-img")) {
      document.getElementById("news_banner_image").style.backgroundImage = "url(" + HOST_URL_TPLANET_DAEMON + obj_mockup.description["news-banner-img"] + ")";
    }
  } catch (e) {
    console.log(e);
  }
  // Set date picker
  $("#news_start").datepicker();
  $("#news_end").datepicker();
}

export function uploadNewsCover() {
  var file = new FileModal("image/*");
  file.onload = function(base64Img){

    // Preview
    // document.getElementById("news_banner").style.backgroundImage =  "url(" + base64Img + ")";
    document.getElementById("news_banner").src = base64Img;
  };
  file.show();
}

export function add_news_img(no) {
  var file = new FileModal("image/*");
  file.onload = function(base64Img){
    // Preview
    var image = new Image();
    image.src = base64Img;
    image.onload = function() {
      // Create canvas
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      
      // Resize (294x248)
      var scale = Math.min(294 / image.width, 248 / image.height);
      var width = image.width * scale;
      var height = image.height * scale;
 
      // 设置画布尺寸
      canvas.width = width;
      canvas.height = height;

      // 在画布上绘制缩放后的图像
      ctx.drawImage(image, 0, 0, width, height);

      // 将缩放后的图像转为 base64 格式
      var scaledBase64Img = canvas.toDataURL();

      // 设置缩略图
      var thumbnail = document.getElementById("news_img_" + no);
      thumbnail.src = scaledBase64Img;
      thumbnail.style.width = width + "px";
      thumbnail.style.height = height + "px";
    };
  };
  file.show();
}

export async function changeNewsListBanner() {
  var image_src = await upload_image_file(2400, null,"news_banner_image", true);
  var form = new FormData();
  form.append("email", getLocalStorage("email"));
  form.append("news-banner-img", DataURIToBlob(image_src));

  var result_banner_upload = mockup_upload(form);
}

export function btn_cms_news_submit() {

  if ("title", document.getElementById("news_title").value == "") {
    alert("請至少填寫新聞標題！");
    return;
  }

  var form = new FormData();
  form.append("email", SITE_HOSTERS[0]);
  
  try {
    if (DataURIToBlob(document.getElementById("news_banner").src))
      form.append("banner", DataURIToBlob(document.getElementById("news_banner").src));
  } catch (e) {}

  try {
    form.append("title", document.getElementById("news_title").value);
    form.append("description", document.getElementById("news_description").value);
    form.append("news_start", document.getElementById("news_start").value);
    form.append("news_end", document.getElementById("news_end").value);
  } catch (e) {}

  try {
    if (DataURIToBlob(document.getElementById("news_img_0").src))
      form.append("img_0", DataURIToBlob(document.getElementById("news_img_0").src));
  } catch (e) {}
  
  try {
    if (DataURIToBlob(document.getElementById("news_img_1").src))
      form.append("img_1", DataURIToBlob(document.getElementById("news_img_1").src));
  } catch (e) {}
  
  try {
    if (DataURIToBlob(document.getElementById("news_img_2").src))
      form.append("img_2", DataURIToBlob(document.getElementById("news_img_2").src));
  } catch (e) {}

  var result_news = news_add(form);
  if (result_news.result == true) {
    alert("上架成功!");
    window.location.replace("/backend/cms_news_list.html");
  } else {
    alert("上架失敗，請檢查資料欄位!");
  }

}

/* function news_banner_image_read(input){
  if(input.files && input.files[0]){
    var reader = new FileReader();
    reader.onload = function (e) {
      var url = e.target.result
       $("#twins_img").css('background-image', `url( ${url})`);
    }
    reader.readAsDataURL(input.files[0]);
  }
} */


// <tr class="bg-light">
