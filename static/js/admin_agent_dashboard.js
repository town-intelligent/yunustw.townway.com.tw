export function set_page_info_admin_agent_dashboard() {
  var email = getLocalStorage("email");
  if (email == SITE_HOSTERS[0]) {
    document.getElementById("admin_index").style.display = "block";
    document.getElementById("cms_news_list").style.display = "block";
    document.getElementById("cms_contact_us").style.display = "block";
  }
}