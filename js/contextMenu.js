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
      localStorage['readqueue'] = JSON.stringify(q);
   }
   var load = function() {
      if (localStorage['readqueue']) {
         q = JSON.parse(localStorage['readqueue']);
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

// click handlers
var genericOnClick = function(info, tab) {
   var title = tab.title;
   var url = tab.url;
   if (info['linkUrl']) {
      url = info['linkUrl'];
      title = url;
   }
   readQ.enQ({'title':title, 'url':url});
}
var deQClick = function(info, tab) {
   var item = readQ.deQ();
   chrome.tabs.create({'url':item.url});
}

// contextMenus
var parentItem = chrome.contextMenus.create({"title": "Add To ReadQueue",
      "contexts":context,
      "onclick":genericOnClick});

var deqItem = chrome.contextMenus.create({"title": "Next Q'd Page",
      "contexts":context,
      "onclick": deQClick});
