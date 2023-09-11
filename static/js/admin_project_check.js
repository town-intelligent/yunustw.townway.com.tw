import {
  get_task_comment,
  verify_task_on_tplanet,
  get_task_info,
} from "./tasks.js";

export function set_page_info_admin_project_check(uuid) {
  var obj_resp_task_comment = get_task_comment(uuid);

  if (
    obj_resp_task_comment == false ||
    obj_resp_task_comment.comment.lenght == 0
  )
    return;

  // Get task comment list
  var list_task_comment = obj_resp_task_comment.comment;

  // Get tbody for comment table
  var obj_tbody_task_comment = document.getElementById("tbody_task_comment");

  for (var index = 0; index < list_task_comment.length; index++) {
    // Element tr set
    var obj_tr = document.createElement("tr");

    // Checkbox
    var obj_th_checkbox = document.createElement("th");
    obj_th_checkbox.scope = "row";
    obj_th_checkbox.className = "text-center align-middle";
    var obj_div_checkbox = document.createElement("div");
    obj_div_checkbox.className = "form-check";
    var obj_input_checkbox = document.createElement("input");
    obj_input_checkbox.className =
      "form-check-input position-static checkbox-1x";
    obj_input_checkbox.type = "checkbox";

    obj_input_checkbox.addEventListener("click", function (e) {
      selectComment(this);
    });

    if (list_task_comment[index].status == "1") {
      obj_input_checkbox.checked = true;
    }

    obj_input_checkbox.id = list_task_comment[index].email;
    obj_input_checkbox.value = list_task_comment[index].email;
    obj_div_checkbox.append(obj_input_checkbox);
    obj_th_checkbox.append(obj_div_checkbox);
    obj_tr.append(obj_th_checkbox);

    // Email
    var obj_div_email = document.createElement("td");
    obj_div_email.className = "text-center align-middle";
    obj_div_email.innerHTML = list_task_comment[index].email;
    obj_tr.append(obj_div_email);

    // Weight
    var obj_task_info = get_task_info(uuid);
    var obj_div_weight = document.createElement("td");
    obj_div_weight.className = "text-center align-middle";

    var content = null;
    try {
      content = JSON.parse(obj_task_info.content);
      for (var index_sdg = 1; index_sdg < 18; index_sdg++) {
        if (content["sdgs-" + index_sdg.toString()] == "1") {
          obj_div_weight.innerHTML =
            obj_div_weight.innerHTML + "SDGs-" + index_sdg.toString() + "、";
        }
      }

      for (var index_sdg = 18; index_sdg < 28; index_sdg++) {
        if (content["sdgs-" + index_sdg.toString()] == "1") {
          if (index_sdg == 18) {
            obj_div_weight.innerHTML = obj_div_weight.innerHTML + "德" + "、";
          } else if (index_sdg == 19) {
            obj_div_weight.innerHTML = obj_div_weight.innerHTML + "智" + "、";
          } else if (index_sdg == 20) {
            obj_div_weight.innerHTML = obj_div_weight.innerHTML + "體" + "、";
          } else if (index_sdg == 21) {
            obj_div_weight.innerHTML = obj_div_weight.innerHTML + "群" + "、";
          } else if (index_sdg == 22) {
            obj_div_weight.innerHTML = obj_div_weight.innerHTML + "美" + "、";
          } else if (index_sdg == 23) {
            obj_div_weight.innerHTML = obj_div_weight.innerHTML + "人" + "、";
          } else if (index_sdg == 24) {
            obj_div_weight.innerHTML = obj_div_weight.innerHTML + "文" + "、";
          } else if (index_sdg == 25) {
            obj_div_weight.innerHTML = obj_div_weight.innerHTML + "地" + "、";
          } else if (index_sdg == 26) {
            obj_div_weight.innerHTML = obj_div_weight.innerHTML + "產" + "、";
          } else if (index_sdg == 27) {
            obj_div_weight.innerHTML = obj_div_weight.innerHTML + "景" + "、";
          }
        }
      }
    } catch (e) {}
    // Remove the last symbol (、)
    if (obj_div_weight.innerHTML.length != 0) {
      obj_div_weight.innerHTML = obj_div_weight.innerHTML.substring(
        0,
        obj_div_weight.innerHTML.length - 1
      );
    }

    // Append
    obj_tr.append(obj_div_weight);

    // Comment
    var obj_div_comment = document.createElement("td");
    obj_div_comment.className = "text-center align-middle";
    obj_div_comment.innerHTML = list_task_comment[index].comment;
    obj_tr.append(obj_div_comment);

    // image
    var obj_a = document.createElement("a");
    obj_a.href = HOST_URL_TPLANET_DAEMON + list_task_comment[index].img;
    var obj_td_img = document.createElement("td");
    obj_td_img.className = "text-center align-middle";
    var obj_img = document.createElement("img");
    obj_img.src = HOST_URL_TPLANET_DAEMON + list_task_comment[index].img;
    obj_img.style = "max-width:60px";
    obj_a.append(obj_img);
    obj_td_img.append(obj_a);
    obj_tr.append(obj_td_img);

    // Tbody append
    obj_tbody_task_comment.append(obj_tr);
  }
}

export function selectComment(element) {
  var listCommentVerifiedEmail = [];

  // Loca old value
  try {
    listCommentVerifiedEmail = JSON.parse(
      getLocalStorage("commentVerifiedEmail")
    );
  } catch (e) {}

  // UnClicked - Remove data
  if (element.checked == false) {
    // Unselect select all checkbox
    document.getElementById("checkboxAll").checked = false;

    listCommentVerifiedEmail = listCommentVerifiedEmail.filter(
      (item) => item !== element.getAttribute("id")
    );
  }
  // Clicked - check duplicate data and push
  if (element.checked == true) {
    // Unselect select all checkbox
    document.getElementById("checkboxAll").checked = false;

    listCommentVerifiedEmail = listCommentVerifiedEmail.filter(
      (item) => item !== element.getAttribute("id")
    );
    listCommentVerifiedEmail.push(element.getAttribute("id"));
  }

  setLocalStorage(
    "commentVerifiedEmail",
    JSON.stringify(listCommentVerifiedEmail)
  );
}

export function selectCommentAll() {
  // Get checkbox
  var objCheckboxAll = document.getElementById("checkboxAll");

  // Get UUID
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var uuid = urlParams.get("uuid");

  var obj_resp_task_comment = get_task_comment(uuid);
  if (
    obj_resp_task_comment == false ||
    obj_resp_task_comment.comment.lenght == 0
  )
    return;

  // Get task comment list
  var list_task_comment = obj_resp_task_comment.comment;

  // UnClicked - Clear all getLocalStorage(commentVerifiedEmail) data
  // UnClicked - unclick all checkbox
  if (objCheckboxAll.checked == false) {
    setLocalStorage("commentVerifiedEmail", "");

    for (var index = 0; index < list_task_comment.length; index++) {
      document.getElementById(list_task_comment[index].email).checked = false;
    }
  }

  // Append all comment to getLocalStorage(commentVerifiedEmail)
  // Clicked - click all checkbox
  if (objCheckboxAll.checked == true) {
    var listCommentVerifiedEmail = [];
    for (var index = 0; index < list_task_comment.length; index++) {
      var commentEmail = document.getElementById(
        list_task_comment[index].email
      );
      listCommentVerifiedEmail.push(commentEmail.id);
    }
    setLocalStorage(
      "commentVerifiedEmail",
      JSON.stringify(listCommentVerifiedEmail)
    );

    for (var index = 0; index < list_task_comment.length; index++) {
      document.getElementById(list_task_comment[index].email).checked = true;
    }
  }
}

export function submitVerifiedTaskComment() {
  // Get UUID
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var uuid = urlParams.get("uuid");

  var listCommentVerifiedEmail = [];

  // Get comment verified email
  try {
    listCommentVerifiedEmail = JSON.parse(
      getLocalStorage("commentVerifiedEmail")
    );
  } catch (e) {
    return;
  }

  // Change status on T-planet
  var resultVerifyOnTplanet = verify_task_on_tplanet(
    uuid,
    getLocalStorage("commentVerifiedEmail")
  );
  if (resultVerifyOnTplanet.status == false) {
    console.log("Verify on t-planet failed.");
    return;
  }

  // TODO: Chnage status on eID
  /* for (var index = 0; index < listCommentVerifiedEmail.lenght; index++) {
    var resultVerifyOneID = verify_task_on_eid(uuid, listCommentVerifiedEmail[index]);
    if (resultVerifyOneID.status == false) {
      console.log("Verify on eID failed.")
      return;
    }
  } */

  // Final result
  alert("驗證成功!");
  window.location.replace("/backend/cms_agent.html");
}
