// A generic onclick callback function.
/*function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}
*/

var readQ = (function() {
   //private
   var q = [];
   var save = function() {
      window.localStorage['readqueue'] = JSON.stringify(q);
   }
   var load = function() {
      if (window.localStorage['readqueue']) {
         q = JSON.parse(window.localStorage['readqueue']);
      } 
   }
   return ({ //public
      "enQ":function(item) {
         q.push(item);
         save();
      },
      "deQ":function() {
         var item = q.shift();
         save();
         return item;
      },
      "remove":function(index) {
         var item = q.splice(index, 1);
         save();
         return item;
      },
      "insert":function(index, item) {
         q.splice(index, 0, item);
         save();
      },
      "get":function(index) {
         return q[index];
      },
      "size":function() {
         return q.length;
      }
   });

   // main
   load();
})();
// config
var context = ["link", "page", "image", "video", "audio"];

// message passing
var message = "";

var displayMessage = function (msg) {
   message = msg;
   chrome.tabs.executeScript(null, { file:'js/displayMessage.js'});
}

chrome.extension.onRequest.addListener(
   function(request, sender, sendResponse) {
      if (request.req == "message") {
         sendResponse({res: message});
      } else if (request.req == "deQ") {
         var item = readQ.deQ();
         chrome.tabs.create({'url':item.url});
      } else if (request.req == "enQ") {
         readQ.enQ(request.item);
         displayMessage(request.item.url + " added to readQ");
      } else if (request.req == "remove") {
         var item = readQ.deQ();
         displayMessage(item.url + " removed from readQ");
      } else {
         sendResponse({});
      }
   });

// click handlers
var genericOnClick = function(info, tab) {
   var title = tab.title;
   var url = tab.url;
   if (info['linkUrl']) {
      url = info['linkUrl'];
      title = url;
   }

   readQ.enQ({'title':title, 'url':url});
   displayMessage(url + " added to the queue");
}
var deQClick = function(info, tab) {
   var item = readQ.deQ();
   chrome.tabs.create({'url':item.url});
}

// contextMenus
var enqItem = chrome.contextMenus.create({"title": "Add To ReadQueue",
      "contexts":context,
      "onclick":genericOnClick});

var deqItem = chrome.contextMenus.create({"title": "Next Q'd Page",
      "contexts":context,
      "onclick": deQClick});
