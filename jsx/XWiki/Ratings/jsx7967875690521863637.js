function setVote(ulel, url, i) 
{
 return function() 
 {
   url = url + "&vote=" + i; 
   new Ajax.Request(url, 
   {
    method: 'get',
    onSuccess: function(transport)
    {
      var values = transport.responseText.evalJSON();
      
      var avgvote = values.avgvote;
      var uservote = values.uservote;
      var totalvotes = values.totalvotes;

      if( (avgvote = parseFloat(avgvote)) ) {
        var w = avgvote * 20;
        ulel.down("li.current-rating").style.width = w + "%";
      }
      else {
       alert(transport.responseText); //TODO proper error handling
      }

      var id = ulel.up('.rating-container').id;
      var msgdiv = $(id).down(".rating-message");
      if (msgdiv.prevmsg!="") {
       msgdiv.innerHTML =  msgdiv.prevmsg;
       msgdiv.prevmsg = "";
      }
      msgdiv.down("span").innerHTML = totalvotes;
     
      if( (uservote = parseInt(uservote)) ) {
        var w = uservote * 20;
        $(id + "-user").down('.star-rating').down("li.current-rating").style.width = w + "%";
      }
      else {
       alert(transport.responseText); //TODO proper error handling
      }     
    }
   });
 }
}

function showMsg(msgdiv, i) 
{
 return function() 
 {
   if (msgdiv.prevmsg=="")
    msgdiv.prevmsg = msgdiv.innerHTML;
   var msgs = ["Poor", "Satisfactory", "Good", "Very good", "Excellent"];
   msgdiv.update(msgs[i]);
 }
}

function hideMsg(msgdiv) 
{
 return function() 
 {
   if (msgdiv.prevmsg != "")
    msgdiv.update(msgdiv.prevmsg);
 }
}

document.observe("dom:loaded", function() 
{ 
  $$('.star-rating').each(function(el) 
  {
     if(! el.hasClassName('locked')) 
     {
        var url = "http://sdad.policy-analytics.net:8081/bin/view/XWiki/Ratings?xpage=plain&outputSyntax=plain" + "&doc=" + el.up('.rating-wrapper').id.substring(7);
        var msgdiv = el.up('.rating-container').down('.rating-message');

        el.select('a').each(function(astar, i) 
        {  
            Event.observe(astar, 'click', setVote(el, url, i + 1));
            msgdiv.prevmsg = "";
            Event.observe(astar, 'mouseover', showMsg(msgdiv, i));
            Event.observe(astar, 'mouseout', hideMsg(msgdiv));
        });
     }
  }); 
});
