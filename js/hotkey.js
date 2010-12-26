var oldkeypress = document.onkeypress;
var qkey = false;

var nullResponseListener = function(response) {}

document.onkeypress = function (keyevent) {
   if (keyevent.keyCode == 113) {
      qkey = true;
      setTimeout('qkey = false;', 700);
   } else if (qkey && keyevent.keyCode == 101) {
      var item = {'url':location.href, 'title':document.title}; 
      chrome.extension.sendRequest({'req': 'enQ', 'item': item}, 
            nullResponseListener);
   } else if(qkey && keyevent.keyCode == 100) {
      chrome.extension.sendRequest({'req': 'deQ'}, nullResponseListener);
   } else if(qkey && keyevent.keyCode == 114) {
      chrome.extension.sendRequest({'req': 'remove'}, nullResponseListener);
   } else if(qkey && keyevent.keyCode == 112) {
      chrome.extension.sendRequest({'req': 'pop'}, nullResponseListener);
   } else {
      qkey = false;
   }
   return true;
}
