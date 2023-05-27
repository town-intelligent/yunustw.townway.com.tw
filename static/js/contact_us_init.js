import { mockup_get } from './mockup.js'

export function set_page_info_contact_us () {
  var form = new FormData();
  form.append("email", "forus999@gmail.com");

  var obj_mockup = mockup_get(form)

  try {
    if (obj_mockup.description.hasOwnProperty("contact-us-banner-img")) {
      document.getElementById("contact_us_banner_1").style.backgroundImage = "url(" + HOST_URL_TPLANET_DAEMON + obj_mockup.description["contact-us-banner-img"] + ")";
      document.getElementById("contact_us_banner_2").style.backgroundImage = "url(" + HOST_URL_TPLANET_DAEMON + obj_mockup.description["contact-us-banner-img"] + ")";
    }
  } catch (e) { console.log(e);}
}