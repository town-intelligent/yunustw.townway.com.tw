export function set_page_info_admin_agent_dashboard() {
  var email = getLocalStorage("email");
  if (email == "secondhome2023.1@gmail.com" || email == "ysnp-gov@gmail.com" || email == "mickeypeng@tpwl.org") {
    document.getElementById("admin_index").style.display = "none";
    document.getElementById("cms_news_list").style.display = "none";
    document.getElementById("cms_contact_us").style.display = "none";
  }
}
