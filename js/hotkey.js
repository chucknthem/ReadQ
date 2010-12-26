var oldkeypress = document.onkeypress;
var qkey = false;

var nullResponseListener = function(response) {}

document.onkeypress = function (keyevent) {
   if (keyevent.keyCode == 113) {
      console.log('qpress');
      qkey = true;
      setTimeout('qkey = false;', 700);
   } else if (qkey && keyevent.keyCode == 101) {
      console.log('q then e');
      var item = {'url':location.href, 'title':document.title}; 
      chrome.extension.sendRequest({'req': 'enQ', 'item': item}, 
            nullResponseListener);
   } else if(qkey && keyevent.keyCode == 100) {
      console.log('q then d');
      chrome.extension.sendRequest({'req': 'deQ'}, nullResponseListener);
   } else if(qkey && keyevent.keyCode == 114) {
      console.log('q then r');
      chrome.extension.sendRequest({'req': 'remove'}, nullResponseListener);
   } else {
      qkey = false;
   }
   return true;
}
