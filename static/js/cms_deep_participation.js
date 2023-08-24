import { task_submit,deep_deleted_task, list_children_tasks, get_task_info, add_to_child_task_queue, remove_child_task_queue } from './tasks.js'
var element_id

function set_page_in_add_child_task_block(obj_task) {
  let deep_div_parent_task = document.getElementById('deep_div_parent_task')

  // <div class="col-10 border-light-gray p-3 bg-white mb-3">
  var outter = document.createElement("div")
  outter.className = "form-row col-10 border p-2 mb-4"
  outter.id = "outter_" + obj_task.uuid;

  var outer_container = document.createElement("div")
  outer_container.className="form-group col-md-12 mt-3 mt-md-0 d-flex flex-wrap align-items-center"

  // form_nav
  var form_nav = document.createElement("div")
  // form_nav.className = "col-md-6 px-0"
  form_nav.className = "col-md-10 px-0"

  // form_nav
  var form_nav_button = document.createElement("div")
  // form_nav.className = "col-md-6 px-0"
  form_nav_button.className = "col-md-2 px-0"

  var label = document.createElement("label")
  // label.innerText = "UUID : "
  label.className="d-flex"

  var uuid_task = document.createElement("lo")
  uuid_task.id = 'uuid_name'
  // uuid_task.innerText = 'UUID：' + obj_task.uuid;

  uuid_task.innerText = '活動名稱  UUID：' + obj_task.uuid;
  uuid_task.style = "margin-left: 26px;"; //  list-style-type: decimal;

  var nav_container = document.createElement("div")
  // nav_container.className = "d-flex align-items-center"
  nav_container.className = "form-group col-md-8 mt-3 mt-md-0"

  var input_name = document.createElement("input")
  input_name.id = "name_" + obj_task.uuid;
  input_name.type = "text"
  input_name.className ="form-control"
  input_name.value = obj_task.name;

  var obj_task_del_modal = document.createElement("div");
  obj_task_del_modal.className = "modal fade";
  obj_task_del_modal.id = "deleteModal_" + obj_task.uuid;

  obj_task_del_modal.setAttribute("tabindex", "-1");
  obj_task_del_modal.setAttribute("role", "dialog");

  var str_task_del_modal_innerHTML = str_task_del_modal.replaceAll("UUID_TASK", obj_task.uuid)
  obj_task_del_modal.innerHTML = str_task_del_modal_innerHTML;

  document.body.append(obj_task_del_modal);

  var del_img_div = document.createElement("div");
  del_img_div.className = "d-flex justify-content-end"

  var delete_img = document.createElement("button");
  delete_img.setAttribute("type", "button");
  delete_img.className = "btn btn-danger rounded-pill btn-block";
  delete_img.setAttribute("data-toggle", "modal");
  delete_img.setAttribute("style", "width: 150px");
  // style="width: 150px"

  delete_img.setAttribute("data-target", "#deleteModal_" + obj_task.uuid);
  delete_img.innerText = "刪除";

  del_img_div.append(delete_img);

  nav_container.append(input_name);

  label.append(uuid_task);

  form_nav.append(label);
  form_nav_button.append(del_img_div);

  form_nav.append(nav_container);
  outer_container.append(form_nav);
  outer_container.append(form_nav_button);

  // time_input
  var time_outter =  document.createElement("div")
  time_outter.className="col-md-8 mb-px"
  var time_label = document.createElement("label")
  time_label.innerHTML="時間"
  var time_container = document.createElement("div")
  time_container.className = "row"

  var time_inner_container = document.createElement("div")
  time_inner_container.className = "col-6"
  var time_inner =  document.createElement("div")
  time_inner.className = "input-group date"
  time_inner.id = "datetimepicker1"
  var time_input1 = document.createElement("input")
  time_input1.type = "text"
  time_input1.id = "task_start_date_" + obj_task.uuid
  time_input1.className = "form-control datetimepicker-input"

  var time_icon_outter = document.createElement("div")
  time_icon_outter.className = "input-group-append"
  time_icon_outter.dataset.target = "#datetimepicker1"
  time_icon_outter.dataset.toggle = "datetimepicker"
  var time_icon_container = document.createElement("div")
  time_icon_container.className="input-group-text"
  var time_icon =  document.createElement("i")
  time_icon.className="fa fa-calendar"

  var time_inner_container2 = document.createElement("div")
  time_inner_container2.className = "col-6"
  var time_inner2 =  document.createElement("div")
  time_inner2.className = "input-group date"
  time_inner2.id = "datetimepicker1"
  var time_input2 = document.createElement("input")
  time_input2.type = "text"
  time_input2.id = "task_due_date_" + obj_task.uuid
  time_input2.className = "form-control datetimepicker-input"

  $(function () {
    $("#task_start_date_" + obj_task.uuid).timepicker();
    $("#task_due_date_" + obj_task.uuid).timepicker();
  })

  var time_icon_outter2 = document.createElement("div")
  time_icon_outter2.className = "input-group-append"
  var time_icon_container2 = document.createElement("div")
  time_icon_container2.className="input-group-text"
  var time_icon2 =  document.createElement("i")
  time_icon2.className="fa fa-calendar"

  time_icon_container.append(time_icon)
  time_icon_outter.append(time_icon_container)
  time_inner.append(time_input1)
  time_inner.append(time_icon_outter)
  time_inner_container.append(time_inner)
  time_container.append(time_inner_container)
  time_outter.append(time_label)
  time_outter.append(time_container)

  time_icon_container2.append(time_icon2)
  time_icon_outter2.append(time_icon_container2)
  time_inner2.append(time_input2)
  time_inner2.append(time_icon_outter2)
  time_inner_container2.append(time_inner2)
  time_container.append(time_inner_container2)

  var list_period = [];
  try {
    list_period = obj_task.period.split("-");
  } catch (e) {}

  if (list_period.length == 2) {
    time_input1.value = list_period[0];
    time_input2.value = list_period[1];
  }

  var form_group =  document.createElement("div")
  form_group.className = "form-group col-12"
  var form_label = document.createElement("p")
  // form_label.innerText = "SDGs"
  var icon_container = document.createElement("div")
  icon_container.className = "d-flex flex-wrap"
  icon_container.id = `icon_container_${obj_task.uuid}`
  var icon_btn_outter =  document.createElement("div")
  icon_btn_outter.className ="d-block"
  var icon_btn = document.createElement("a")
  icon_btn.className = "btn btn-outline-dark rounded-0 participation-margin mt-md-0 mr-3 d-flex justify-content-center align-items-center"
  icon_btn.id = `icon_btn`

  icon_btn.dataset.target = "#SDGsModal"
  icon_btn.dataset.toggle = "modal"

  icon_btn.onclick= function(e){
    element_id = e.target.parentNode.parentNode.id
    // showSDGsModal()
  }

  icon_btn.innerText = "+"
  icon_btn.style = "cursor: pointer; height: 135px; width: 135px";

  icon_btn_outter.append(icon_btn)
  icon_container.append(icon_btn_outter)

  // Get task content
  var str_task_content = obj_task.content;
  var obj_task_content = {}

  try {
    obj_task_content = JSON.parse(str_task_content);
  } catch (e) {}

  // SDGs_container
  for (var index = 1; index < 28; index++) {
    if (obj_task_content["sdgs-" + index.toString()] == "1") {
      // Add SDGs icon

      var obj_a = document.createElement("a");
      obj_a.className = "d-block";
      // obj_a.id = "SDGs_container_" + ;

      // <img class="mr-3" src="/static/imgs/SDGs_04.jpg" alt="" style="width:60px">
      var index_sdg = ("0" + index).slice(-2);

      var obj_img = document.createElement("img");
      obj_img.id = "target_sdgs_" + index_sdg;
      obj_img.className = "mx-2 mt-3 mb-3 mt-md-0";//" participation-margin mt-md-0 mr-3";
      obj_img.src = "/static/imgs/SDGs_" + index_sdg + ".jpg";

      obj_img.alt = "";
      obj_img.style = "width:135px";

      // Append
      obj_a.append(obj_img);
      icon_container.append(obj_a);
    }
  }

  form_group.append(form_label)
  form_group.append(icon_container)

  // modal
  var modal = document.createElement("div")
  modal.className="modal fade"
  modal.id="deleteModal"+ obj_task.uuid
  modal.tabindex="-1"
  modal.setAttribute('aria-labelledby', 'exampleModalLabel')
  modal.setAttribute('aria-hidden', 'true')

  var modal_dialog = document.createElement("div")
  modal_dialog.className = "modal-dialog modal-dialog-centered"
  var modal_content = document.createElement("div")
  modal_content.className = "modal-content"
  var modal_body = document.createElement("div")
  modal_body.className = "modal-body m-auto"
  modal_body.style = "font-size: 20px;"
  modal_body.innerText = "確定刪除此活動設計。"
  var btn_container = document.createElement("div")
  btn_container.className = "modal-footer justify-content-center border-0"
  var cancel_btn = document.createElement("button")
  cancel_btn.type = "button"
  cancel_btn.className = "btn btn-secondary"
  cancel_btn.style = "width: 80px;"
  cancel_btn.dataset.dismiss = "modal"
  cancel_btn.innerText = "取消"
  var delete_btn = document.createElement("button")
  delete_btn.type = "button"
  delete_btn.className = "btn btn-primary"
  delete_btn.id = "deep_delete_task"
  delete_btn.style = "width: 80px;"
  delete_btn.dataset.dismiss = "modal"
  delete_btn.innerText = "確定"
  outer_container.append(time_outter);
  outer_container.append(form_group);

  outter.append(outer_container);
  deep_div_parent_task.append(outter);

  return true;
}

function set_page_in_add_child_task_block_backup(obj_task) {
  let deep_div_parent_task = document.getElementById('deep_div_parent_task')

  var outter = document.createElement("div")
  outter.className = "form-row border p-2 mb-4"
  outter.id = "outter_" + obj_task.uuid;

  var outer_container = document.createElement("div")
  outer_container.className="form-group col-md-12 mt-3 mt-md-0 d-flex flex-wrap align-items-center"

  // form_nav
  var form_nav = document.createElement("div")
  form_nav.className = "col-md-6 px-0"

  var label = document.createElement("label")
  // label.innerText = "UUID : "
  label.className="d-flex"

  var uuid_task = document.createElement("lo")
  uuid_task.id = 'uuid_name'
  // uuid_task.innerText = 'UUID：' + obj_task.uuid;

  uuid_task.innerText = '活動名稱  UUID：' + obj_task.uuid;
  uuid_task.style = "margin-left: 26px;"; //  list-style-type: decimal;

  var nav_container = document.createElement("div")
  nav_container.className = "d-flex align-items-center"

  var input_name = document.createElement("input")
  input_name.id = "name_" + obj_task.uuid;
  input_name.type = "text"
  input_name.className ="form-control"
  input_name.value = obj_task.name;

  var obj_task_del_modal = document.createElement("div");
  obj_task_del_modal.className = "modal fade";
  obj_task_del_modal.id = "deleteModal_" + obj_task.uuid;

  obj_task_del_modal.setAttribute("tabindex", "-1");
  obj_task_del_modal.setAttribute("role", "dialog");

  var str_task_del_modal_innerHTML = str_task_del_modal.replaceAll("UUID_TASK", obj_task.uuid)
  obj_task_del_modal.innerHTML = str_task_del_modal_innerHTML;

  document.body.append(obj_task_del_modal);

  var delete_img = document.createElement("button");
  delete_img.setAttribute("type", "button");
  delete_img.className = "btn btn-danger rounded-pill btn-block";
  delete_img.setAttribute("data-toggle", "modal");
  delete_img.setAttribute("data-target", "#deleteModal_" + obj_task.uuid);
  delete_img.innerText = "刪除";

  nav_container.append(input_name);
  nav_container.append(delete_img);
  label.append(uuid_task);
  form_nav.append(label);
  form_nav.append(nav_container);
  outer_container.append(form_nav);

  // time_input
  var time_outter =  document.createElement("div")
  time_outter.className="col-md-8 mb-px"
  var time_label = document.createElement("label")
  time_label.innerHTML="時間"
  var time_container = document.createElement("div")
  time_container.className = "row"

  var time_inner_container = document.createElement("div")
  time_inner_container.className = "col-6"
  var time_inner =  document.createElement("div")
  time_inner.className = "input-group date"
  time_inner.id = "datetimepicker1"
  var time_input1 = document.createElement("input")
  time_input1.type = "text"
  time_input1.id = "task_start_date_" + obj_task.uuid
  time_input1.className = "form-control datetimepicker-input"

  var time_icon_outter = document.createElement("div")
  time_icon_outter.className = "input-group-append"
  time_icon_outter.dataset.target = "#datetimepicker1"
  time_icon_outter.dataset.toggle = "datetimepicker"
  var time_icon_container = document.createElement("div")
  time_icon_container.className="input-group-text"
  var time_icon =  document.createElement("i")
  time_icon.className="fa fa-calendar"

  var time_inner_container2 = document.createElement("div")
  time_inner_container2.className = "col-6"
  var time_inner2 =  document.createElement("div")
  time_inner2.className = "input-group date"
  time_inner2.id = "datetimepicker1"
  var time_input2 = document.createElement("input")
  time_input2.type = "text"
  time_input2.id = "task_due_date_" + obj_task.uuid
  time_input2.className = "form-control datetimepicker-input"

  $(function () {
    $("#task_start_date_" + obj_task.uuid).timepicker();
    $("#task_due_date_" + obj_task.uuid).timepicker();
  })

  var time_icon_outter2 = document.createElement("div")
  time_icon_outter2.className = "input-group-append"
  var time_icon_container2 = document.createElement("div")
  time_icon_container2.className="input-group-text"
  var time_icon2 =  document.createElement("i")
  time_icon2.className="fa fa-calendar"

  time_icon_container.append(time_icon)
  time_icon_outter.append(time_icon_container)
  time_inner.append(time_input1)
  time_inner.append(time_icon_outter)
  time_inner_container.append(time_inner)
  time_container.append(time_inner_container)
  time_outter.append(time_label)
  time_outter.append(time_container)

  time_icon_container2.append(time_icon2)
  time_icon_outter2.append(time_icon_container2)
  time_inner2.append(time_input2)
  time_inner2.append(time_icon_outter2)
  time_inner_container2.append(time_inner2)
  time_container.append(time_inner_container2)

  var list_period = [];
  try {
    list_period = obj_task.period.split("-");
  } catch (e) {}

  if (list_period.length == 2) {
    time_input1.value = list_period[0];
    time_input2.value = list_period[1];
  }

  var form_group =  document.createElement("div")
  form_group.className = "form-group col-12"
  var form_label = document.createElement("p")
  // form_label.innerText = "SDGs"
  var icon_container = document.createElement("div")
  icon_container.className = "d-flex flex-wrap"
  icon_container.id = `icon_container_${obj_task.uuid}`
  var icon_btn_outter =  document.createElement("div")
  icon_btn_outter.className ="d-block"
  var icon_btn = document.createElement("a")
  icon_btn.className = "btn btn-outline-dark rounded-0 participation-margin mt-md-0 mr-3 d-flex justify-content-center align-items-center"
  icon_btn.id = `icon_btn`

  icon_btn.dataset.target = "#SDGsModal"
  icon_btn.dataset.toggle = "modal"

  icon_btn.onclick= function(e){
    element_id = e.target.parentNode.parentNode.id
    // showSDGsModal()
  }

  icon_btn.innerText = "+"
  icon_btn.style = "cursor: pointer; height: 135px; width: 135px";

  icon_btn_outter.append(icon_btn)
  icon_container.append(icon_btn_outter)

  // Get task content
  var str_task_content = obj_task.content;
  var obj_task_content = {}

  try {
    obj_task_content = JSON.parse(str_task_content);
  } catch (e) {}

  // SDGs_container
  for (var index = 1; index < 28; index++) {
    if (obj_task_content["sdgs-" + index.toString()] == "1") {
      // Add SDGs icon

      var obj_a = document.createElement("a");
      obj_a.className = "d-block";
      // obj_a.id = "SDGs_container_" + ;

      // <img class="mr-3" src="/static/imgs/SDGs_04.jpg" alt="" style="width:60px">
      var index_sdg = ("0" + index).slice(-2);

      var obj_img = document.createElement("img");
      obj_img.id = "target_sdgs_" + index_sdg;
      obj_img.className = "mx-2 mt-3 mb-3 mt-md-0";//" participation-margin mt-md-0 mr-3";
      obj_img.src = "/static/imgs/SDGs_" + index_sdg + ".jpg";

      obj_img.alt = "";
      obj_img.style = "width:135px";

      // Append
      obj_a.append(obj_img);
      icon_container.append(obj_a);
    }
  }

  form_group.append(form_label)
  form_group.append(icon_container)

  // modal
  var modal = document.createElement("div")
  modal.className="modal fade"
  modal.id="deleteModal"+ obj_task.uuid
  modal.tabindex="-1"
  modal.setAttribute('aria-labelledby', 'exampleModalLabel')
  modal.setAttribute('aria-hidden', 'true')

  var modal_dialog = document.createElement("div")
  modal_dialog.className = "modal-dialog modal-dialog-centered"
  var modal_content = document.createElement("div")
  modal_content.className = "modal-content"
  var modal_body = document.createElement("div")
  modal_body.className = "modal-body m-auto"
  modal_body.style = "font-size: 20px;"
  modal_body.innerText = "確定刪除此活動設計。"
  var btn_container = document.createElement("div")
  btn_container.className = "modal-footer justify-content-center border-0"
  var cancel_btn = document.createElement("button")
  cancel_btn.type = "button"
  cancel_btn.className = "btn btn-secondary"
  cancel_btn.style = "width: 80px;"
  cancel_btn.dataset.dismiss = "modal"
  cancel_btn.innerText = "取消"
  var delete_btn = document.createElement("button")
  delete_btn.type = "button"
  delete_btn.className = "btn btn-primary"
  delete_btn.id = "deep_delete_task"
  delete_btn.style = "width: 80px;"
  delete_btn.dataset.dismiss = "modal"
  delete_btn.innerText = "確定"
  outer_container.append(time_outter);
  outer_container.append(form_group);

  outter.append(outer_container);
  deep_div_parent_task.append(outter);

  return true;
}

export function set_page_info_cms_deep_participation(){
  if(WEIGHT[1] == 1)
    $('#five').css('display', 'block');
  if(WEIGHT[2] == 1)
    $('#community').css('display', 'block');

  var index = 0;
  while (true) {
    if (document.getElementById("task_start_date_" + index) == null)
          break;
    $("#task_start_date_" + index).datepicker();
    $("#task_due_date_" + index).datepicker();


    index ++;
  }

  // Load child tasks
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var uuid_parent = urlParams.get("task")

  var list_uuid_child_child_tasks = list_children_tasks(uuid_parent);

  if (list_uuid_child_child_tasks.length == 0)
    return;

  for (var index; index < list_uuid_child_child_tasks.length; index++) {
    var uuid_task = list_uuid_child_child_tasks[index];
    var obj_task = get_task_info(uuid_task);

    var result = set_page_in_add_child_task_block(obj_task);

    if (result == true) {
      add_to_child_task_queue(obj_task.uuid)
    }
  }
}

export function deep_participation_add_child_task_block(obj_task) {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var uuid_project = urlParams.get("uuid")
  var uuid_parent = urlParams.get("task")
  var gps = urlParams.get("gps")

  var uuid_child = null;
  var task_parent_id = {"task_parent_id":uuid_parent};

  var form = new FormData();
  form.append("email", getLocalStorage("email"));
  form.append("uuid", uuid_project);
  form.append("tasks", JSON.stringify([task_parent_id]));
  form.append("gps_flag", gps);

  var obj_task = task_submit(form);

  if (obj_task.result == true){
    uuid_child = obj_task.task;
  } else {
    console.log("Error, submit task failed.");
    return;
  }

  add_to_child_task_queue(uuid_child)

  let deep_div_parent_task = document.getElementById('deep_div_parent_task')

  var outter = document.createElement("div")
  outter.className = "form-row col-10 border p-2 mb-4"
  outter.id = "outter_" + uuid_child

  var outer_container = document.createElement("div")
  outer_container.className="form-group col-md-12 mt-3 mt-md-0 d-flex flex-wrap align-items-center"

  // form_nav
  var form_nav = document.createElement("div")
  form_nav.className = "col-md-10 px-0"

  var form_nav_button = document.createElement("div")
  // form_nav.className = "col-md-6 px-0"
  form_nav_button.className = "col-md-2 px-0"

  var label = document.createElement("label")
  // label.innerText = "活動名稱"
  label.className="d-flex"

  var uuid_task = document.createElement("lo")
  uuid_task.id = 'uuid_name'
  uuid_task.innerText = '活動名稱  UUID：' + uuid_child;
  uuid_task.style = "margin-left: 26px; " // list-style-type: decimal;

  var nav_container = document.createElement("div")
  nav_container.className = "form-group col-md-8 mt-3 mt-md-0"

  var input_name = document.createElement("input")
  input_name.id = "name_" + uuid_child
  input_name.type = "text"
  input_name.className ="form-control"

  var obj_task_del_modal = document.createElement("div");
  obj_task_del_modal.className = "modal fade";
  obj_task_del_modal.id = "deleteModal_" + uuid_child;

  obj_task_del_modal.setAttribute("tabindex", "-1");
  obj_task_del_modal.setAttribute("role", "dialog");

  var str_task_del_modal_innerHTML = str_task_del_modal.replaceAll("UUID_TASK", uuid_child)
  obj_task_del_modal.innerHTML = str_task_del_modal_innerHTML;

  document.body.append(obj_task_del_modal);

  var del_img_div = document.createElement("div");
  del_img_div.className = "d-flex justify-content-end"

  var delete_img = document.createElement("button");
  delete_img.setAttribute("type", "button");
  delete_img.className = "btn btn-danger rounded-pill btn-block";
  delete_img.setAttribute("data-toggle", "modal");
  delete_img.setAttribute("data-target", "#deleteModal_" + uuid_child);
  delete_img.innerText = "刪除";

  del_img_div.append(delete_img);

  nav_container.append(input_name);

  label.append(uuid_task);

  form_nav.append(label);
  form_nav_button.append(del_img_div);

  form_nav.append(nav_container);
  outer_container.append(form_nav);
  outer_container.append(form_nav_button);

  // time_input
  var time_outter =  document.createElement("div")
  time_outter.className="col-md-6 mb-px"
  var time_label = document.createElement("label")
  time_label.innerHTML="時間"
  var time_container = document.createElement("div")
  time_container.className = "row"

  var time_inner_container = document.createElement("div")
  time_inner_container.className = "col-6"
  var time_inner =  document.createElement("div")
  time_inner.className = "input-group date"
  time_inner.dataset.target="nearest"
  time_inner.id = "datetimepicker1"
  var time_input1 = document.createElement("input")
  time_input1.type = "text"
  time_input1.id = "task_start_date_" + uuid_child
  time_input1.className = "form-control datetimepicker-input"
  time_input1.dataset.target = "#datetimepicker1"
  var time_icon_outter = document.createElement("div")
  time_icon_outter.className = "input-group-append"
  time_icon_outter.dataset.target = "#datetimepicker1"
  time_icon_outter.dataset.toggle = "datetimepicker"
  var time_icon_container = document.createElement("div")
  time_icon_container.className="input-group-text"
  var time_icon =  document.createElement("i")
  time_icon.className="fa fa-calendar"

  var time_inner_container2 = document.createElement("div")
  time_inner_container2.className = "col-6"
  var time_inner2 =  document.createElement("div")
  time_inner2.className = "input-group date"
  time_inner2.dataset.target="nearest"
  time_inner2.id = "datetimepicker1"
  var time_input2 = document.createElement("input")
  time_input2.type = "text"
  time_input2.id = "task_due_date_" + uuid_child
  time_input2.className = "form-control datetimepicker-input"
  time_input2.dataset.target = "#datetimepicker1"
  var time_icon_outter2 = document.createElement("div")
  time_icon_outter2.className = "input-group-append"
  time_icon_outter2.dataset.target = "#datetimepicker1"
  time_icon_outter2.dataset.toggle = "datetimepicker"
  var time_icon_container2 = document.createElement("div")
  time_icon_container2.className="input-group-text"
  var time_icon2 =  document.createElement("i")
  time_icon2.className="fa fa-calendar"

  // time datepicker
  $(function () {
    $("#task_start_date_" + uuid_child).timepicker();
    $("#task_due_date_" + uuid_child).timepicker();
  })

  time_icon_container.append(time_icon)
  time_icon_outter.append(time_icon_container)
  time_inner.append(time_input1)
  time_inner.append(time_icon_outter)
  time_inner_container.append(time_inner)
  time_container.append(time_inner_container)
  time_outter.append(time_label)
  time_outter.append(time_container)

  time_icon_container2.append(time_icon2)
  time_icon_outter2.append(time_icon_container2)
  time_inner2.append(time_input2)
  time_inner2.append(time_icon_outter2)
  time_inner_container2.append(time_inner2)
  time_container.append(time_inner_container2)

  // SDGs_container
  var form_group =  document.createElement("div")
  form_group.className = "form-group col-12"
  var form_label = document.createElement("p")
  // form_label.innerText = "SDGs"
  var icon_container = document.createElement("div")
  icon_container.className = "d-flex flex-wrap"
  icon_container.id = `icon_container_${uuid_child}`
  var icon_btn_outter =  document.createElement("div")
  icon_btn_outter.className ="d-block"
  var icon_btn = document.createElement("a")
  icon_btn.className = "btn btn-outline-dark rounded-0 participation-margin mt-md-0 mr-3 d-flex justify-content-center align-items-center"
  icon_btn.id = `icon_btn`

  icon_btn.dataset.target = "#SDGsModal"
  icon_btn.dataset.toggle = "modal"

  icon_btn.onclick= function(e){
    element_id = e.target.parentNode.parentNode.id
    // showSDGsModal()
  }

  icon_btn.innerText = "+"
  icon_btn.style = "cursor: pointer; height: 135px; width: 135px";

  icon_btn_outter.append(icon_btn)
  icon_container.append(icon_btn_outter)
  form_group.append(form_label)
  form_group.append(icon_container)

  // modal
  var modal = document.createElement("div")
  modal.className="modal fade"
  modal.id="deleteModal"+uuid_child
  modal.tabindex="-1"
  modal.setAttribute('aria-labelledby', 'exampleModalLabel')
  modal.setAttribute('aria-hidden', 'true')

  var modal_dialog = document.createElement("div")
  modal_dialog.className = "modal-dialog modal-dialog-centered"
  var modal_content = document.createElement("div")
  modal_content.className = "modal-content"
  var modal_body = document.createElement("div")
  modal_body.className = "modal-body m-auto"
  modal_body.style = "font-size: 20px;"
  modal_body.innerText = "確定刪除此活動設計。"
  var btn_container = document.createElement("div")
  btn_container.className = "modal-footer justify-content-center border-0"
  var cancel_btn = document.createElement("button")
  cancel_btn.type = "button"
  cancel_btn.className = "btn btn-secondary"
  cancel_btn.style = "width: 80px;"
  cancel_btn.dataset.dismiss = "modal"
  cancel_btn.innerText = "取消"
  var delete_btn = document.createElement("button")
  delete_btn.type = "button"
  delete_btn.className = "btn btn-primary"
  delete_btn.id = "deep_delete_task"
  delete_btn.style = "width: 80px;"
  delete_btn.dataset.dismiss = "modal"
  delete_btn.innerText = "確定"
  outer_container.append(time_outter);
  outer_container.append(form_group);

  outter.append(outer_container);
  deep_div_parent_task.append(outter)
}


export function showDeleteModal (uuid_task) {
  $("#deleteModal").modal("show")
  var delete_uuid = document.querySelector('#delete_uuid')
  delete_uuid.innerText = "確定刪除此活動設計"+ uuid_task + "。"

  // Delete task
  deep_deleted_task(uuid_task);
  // Update local storage
  remove_child_task_queue(uuid_task)

  location.reload();
}

export function showDeleteModal_backup (uuid_task) {
  $("#deleteModal").modal("show")
  var delete_uuid = document.querySelector('#delete_uuid')
  delete_uuid.innerText = "確定刪除此活動設計"+ uuid_task + "。"
   $("#deep_delete_task").on("click",function(e){
    $("#deleteModal_" + uuid_task).modal("hide")
    $("#outter_" + uuid_task).remove()
    deep_deleted_task(uuid_task)

    // Update local storage
    remove_child_task_queue(uuid_task)
  })
  $('#deep_close_modal').on("click",function(e){
    $("#deleteModal_").modal("hide")
  })
}

export function showSDGsModal(){
  $('#SDGsModal').modal('show')
}

$(function () {
  $("#deep_participation_add_child_tasks").on("click",function(e) {
    e.preventDefault();
    deep_participation_add_child_task_block()
  })

})

$(function () {
  $("#btn_add_sdg_into_task").on("click", function(e) {

    e.stopPropagation();
    var list_target_sdgs = [];
    if (getLocalStorage("list_target_sdgs") != "") {
      list_target_sdgs = getLocalStorage("list_target_sdgs").split(",");
    }

    list_target_sdgs.push(getLocalStorage("target_sdgs"));

    // Get path
    var path = window.location.pathname;
    var page = path.split("/").pop();

    if (page == "cms_deep_participation.html") {
      var obj_icon_container = document.getElementById(element_id); // 'icon_container_' + uuid
      var obj_a = document.createElement("a");
      obj_a.className = "d-block";
      // obj_a.id = "SDGs_container_" + ;

      // <img class="mr-3" src="/static/imgs/SDGs_04.jpg" alt="" style="width:60px">
      var obj_img = document.createElement("img");
      obj_img.id = "target_sdgs_" + getLocalStorage("target_sdgs");
      obj_img.className = "mx-2 mt-3 mb-3 mt-md-0";//" participation-margin mt-md-0 mr-3";
      obj_img.src = "/static/imgs/SDGs_" + getLocalStorage("target_sdgs") + ".jpg";
      obj_img.alt = "";
      obj_img.style = "width:135px";

      // Append
      obj_a.append(obj_img);
      obj_icon_container.append(obj_a);
    }
    // Finish
    $("#SDGsModal").modal("hide");
  });
});
