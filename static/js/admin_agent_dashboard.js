export function set_page_info_admin_agent_dashboard() {
  var email = getLocalStorage("email");
  if (email == "tengmj@ncut.edu.tw") {
    document.getElementById("admin_index").style.display = "none";
    document.getElementById("cms_news_list").style.display = "none";
    document.getElementById("cms_contact_us").style.display = "none";
  }
}
