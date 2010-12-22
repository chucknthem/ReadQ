function $(id) {
   return document.getElementById(id);
}
var readQueue = [];

var removeItem = function(i) {
   chrome.extension.sendRequest({"cmd":"remove_item", "item":i});
}
chrome.extension.sendRequest({"cmd": "get_readqueue"}, function(response) {
      readQueue = response['response_msg'];

      console.log(readQueue);
      for (var i = 0; i < readQueue.length; i++) {
         var pel = document.createElement('p');
         var el = document.createElement('a');
         el.setAttribute('href', readQueue[i]['url']);
         el.innerHTML = readQueue[i]['title'];
         el.setAttribute('q_id', i);

         el.onclick = function() {
         removeItem(this.getAttribute('q_id'));
            chrome.tabs.create({'url':this.href});
         }
         el.onmouseover = function() {
            $('urlbar').innerHTML = this.href;
         }
         el.onmouseout = function() {
            $('urlbar').innerHTML = "";
         }
         pel.appendChild(el);
         $('links').appendChild(pel);
      }
   });
