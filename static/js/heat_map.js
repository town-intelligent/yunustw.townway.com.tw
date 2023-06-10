import { initMap, pad, successCallback, getGPS } from './map.js'
import { plan_info } from './plan.js'
import { get_task_info } from './tasks.js'

export function gotoHeatmap(next_site) {
    // Get project uuid
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var uuid = urlParams.get("uuid")

    window.location.replace(next_site + "?uuid=" + uuid);
}

export async function initGMap () {
}

export async function set_page_info_heat_map() {

  // Get project uuid
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var uuid = urlParams.get("uuid");

  try {
    var obj_project = plan_info(uuid);
    document.getElementById("project_title").innerHTML = obj_project.name;
  } catch (e) {
    console.log(e)
  }

  // Init Google map
  var map = initMap();

  // Get GPS record
  var obj_gps_result = getGPS(uuid);

  if (obj_gps_result.length == 0) {
    return;
  }
  
  // List tasks
  for (var index_task = 0; index_task < obj_gps_result.length; index_task++) {
    // Get tasks info
    var obj_task = {};
    var obj_task_gps = obj_gps_result[index_task];
    try {
      obj_task = get_task_info(obj_task_gps.uuid_task);
    } catch (e) { 
      console.log(e);
    }

    // Make marker image
    var obj_task_weight = {};
    try {
      obj_task_weight = JSON.parse(obj_task.content);
    } catch (e) { 
      console.log(e) ;
    }

    // Make weight images
    var index_weight = 0;
    // var icon_img = "";
    var list_icon_img = [];
    var cx = -45;

    for (const key in obj_task_weight) {
      index_weight ++;

      try {
        if (obj_task_weight[key] != "0") { 
          list_icon_img.push({ src: "/static/imgs/SDGsForMap/SDGs_" +  pad(index_weight) + ".svg", x: cx += 45, y: 0 , opacity: 1})
        }
      } catch (e) { 
        console.log(e);
      }
    }
    
    // Merge image
    await mergeImages(list_icon_img, { width: 400, height: 40}).then(b64 => successCallback(b64, map, obj_task, obj_task_gps));
  }
}
