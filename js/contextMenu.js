// A generic onclick callback function.
/*function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}
*/
var readQueue = [];

function genericOnClick(info, tab) {
   var title = tab.title;
   var url = tab.url;
   if (info['linkUrl']) {
      url = info['linkUrl'];
      title = url;
   }
   readQueue.push({'title':title, 'url':url});
   localStorage['readqueue'] = JSON.stringify(readQueue);
}

if (localStorage['readqueue']) {
   readQueue = JSON.parse(localStorage['readqueue']);
}

var parentItem = chrome.contextMenus.create({"title": "Add To ReadQueue", 
      "contexts":["link", "page", "image", "video", "audio"], 
      "onclick":genericOnClick});

chrome.extension.onRequest.addListener(
   function(request, sender, sendResponse) {
      if (request['cmd'] == "remove_item") {
         var index = request['item'];
         readQueue.splice(index, 1);
         localStorage['readqueue'] = JSON.stringify(readQueue);
         sendResponse({'response_msg': readQueue});
      } else if (request['cmd'] == "get_readqueue") {
         sendResponse({'response_msg': readQueue});
      } else {
         sendResponse({response_msg: "fail"}); // snub them.
      }
   });
