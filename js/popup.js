function $(id) {
   return document.getElementById(id);
}

window.onload = function() {
   var bgPage = chrome.extension.getBackgroundPage();
   var readQ = bgPage.readQ;
   for (var i = 0; i < readQ.size(); i++) {
      var pel = document.createElement('p');
      var el = document.createElement('a');
      var item = readQ.get(i);

      el.setAttribute('href', item['url']);
      el.innerHTML = item['title'];
      el.setAttribute('q_id', i);

      el.onclick = function() {
         var index = this.getAttribute('q_id');
         bgPage.readQ.remove(index);
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
}
