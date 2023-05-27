import { plan_info } from './plan.js'

export function set_page_info_cms_sdgs_setting(uuid){
  if (uuid != null) {
    var obj_project = plan_info(uuid);
    var list_sdgs = [];
    
    try {
      list_sdgs = obj_project.weight.split(",");
    } catch (e) {}
  
    for (var index = 0; index < list_sdgs.length; index++) {
      if (parseInt(list_sdgs[index]) != 0) {
        document.getElementById("sdg_" + (index+1).toString()).checked = true;
      }
    }
  }
}