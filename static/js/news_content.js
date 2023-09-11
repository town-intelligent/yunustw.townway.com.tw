import { news_get } from "./news.js";

export function set_page_info_news_content() {
  try {
    // Params
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var uuid = urlParams.get("uuid");

    var obj_news = news_get(uuid);

    document.getElementById("title").innerHTML = obj_news.content.title;
    document.getElementById("description").innerHTML =
      obj_news.content.description;

    if (obj_news.content.period != null) {
      document.getElementById("period").innerHTML = obj_news.content.period;
    } else {
      document.getElementById("period").innerHTML = "";
    }

    var obj_banner = document.getElementById("banner");
    obj_banner.style =
      "background-image: url(" +
      HOST_URL_TPLANET_DAEMON +
      obj_news.content.static.banner +
      "); height: 450px; background-repeat: no-repeat";

    for (var index = 0; index < 3; index++) {
      var obj_img = document.getElementById("img_" + index.toString());
      obj_img.style =
        "background-image:url(" +
        HOST_URL_TPLANET_DAEMON +
        obj_news.content.static["img_" + index.toString()] +
        "); width:100% ;height:160px; background-repeat: no-repeat";
    }
  } catch (e) {
    console.log(e);
  }
}
