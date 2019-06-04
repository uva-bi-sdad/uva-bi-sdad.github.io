(function (){
  var input = document.getElementById('TaskManager.TaskManagerClass_0_reporter');
  if(XWiki.docisnew) {
    input.defaultValue = "XWiki.aschroed";
  }
  input.type='hidden';
})();
require(['jquery'], function ($) {
   $(document).ready(function(){
      $("input[id='TaskManager.TaskManagerClass_0_progress']").change(function(event){
        var val = $(this).val();
        var status = "ToDo";
        if(val && val != ""){
            val = parseInt(val);
            if(val > 0 && val < 100){
               status = "InProgress";
            }
            else if(val >= 100){
               status = "Done";
           }
        }
         $("select[name='TaskManager.TaskManagerClass_0_status']").val(status);
      });
   });
});
