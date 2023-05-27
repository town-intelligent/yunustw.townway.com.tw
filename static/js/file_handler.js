/* File upload handler
 * http://jsfiddle.net/DerekL/3wRpA/
 * https://stackoverflow.com/questions/53651409/writing-a-base64-string-to-file-in-python-not-working
 * https://stackoverflow.com/questions/34116682/save-base64-image-python
 */

/*The FileModal Class*/
function FileModal(accept){
  var callback = function(){};
  return {
    show: function(){
      $("<input>").attr({
        type: "file",
        accept: accept
      }).appendTo("body").hide().change(function(e){
        var file = e.target.files[0],
        reader = new FileReader();
        reader.onload = function(progress){
          callback(progress.target.result);
        };
        reader.readAsDataURL(file);
      }).click();
    },
    set onload(c){ callback = c; }
  }
}