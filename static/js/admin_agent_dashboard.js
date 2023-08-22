export function set_page_info_admin_agent_dashboard() {
  var email = getLocalStorage("email");
  if (email == SITE_HOSTERS[0]) {
    try {
      $('#admin_index').css('display', 'block');
      $('#cms_news_list').css('display', 'block');
      $('#cms_contact_us').css('display', 'block');
    } catch (e) { console.log(e) }
  }
}