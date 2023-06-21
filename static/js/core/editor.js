function register_ckeditor_styles(elementIds) {
  const style = document.createElement('style');
  let styles = ``
  elementIds.map(elementId => {
    const element = document.querySelector(elementId);
    console.log(element, elementId)
    const height = element.style.height;
    // console.log(element.style.height);
    styles += `
${elementId} + div .ck-editor__editable_inline {
  min-height: ${height};
}
    `
    style.innerHTML = styles;
    document.head.appendChild(style);
  })
}
function register_ckeditor(elementIds) {
  window.ckeditorEditors = {};
  elementIds.map(elementId => {
    const element = document.querySelector(elementId);
    ClassicEditor.create(element)
    .then((newEditor) => {
      window.ckeditorEditors[elementId] = newEditor;
      console.log(`editor[${elementId}] registered`);
    })
    .catch((error) => {
      console.error(error);
    });
  })

  register_ckeditor_styles(elementIds)
}

function update_ckeditor_data() {
  if (window.ckeditorEditors) {
    for (const key in window.ckeditorEditors) {
      console.log(`${key} editor data updated`)

      window.ckeditorEditors[key].updateSourceElement();
    }
  }
}
