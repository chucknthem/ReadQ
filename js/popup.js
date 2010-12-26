function $(id) {
   return document.getElementById(id);
}

window.onload = function() {
   var bgPage = chrome.extension.getBackgroundPage();
   var readQ = bgPage.readQ;
   function removeChildNodes(node) {
      while(node.hasChildNodes()) {
         node.removeChild(node.firstChild);
      }
   }
   for (var i = 0; i < readQ.size(); i++) {
      var pel = document.createElement('p');
      var el = document.createElement('a');
      var item = readQ.get(i);
      var delete_el = document.createElement('a');

      // link next to a url to delete it
      delete_el.setAttribute('href', '#');
      delete_el.setAttribute('q_id', i);
      delete_el.innerHTML = "[X]";
      delete_el.style.float = 'right';
      el.setAttribute('href', item['url']);
      el.setAttribute('q_id', i);
      el.innerHTML = item['title'];

      delete_el.onclick = function() {
         var index = this.getAttribute('q_id');
         var p_el = this.parentNode;
         bgPage.readQ.remove(index);
         // update next few links so their q_ids are synched with the readQ indexes
         for (var sib = p_el.nextSibling; sib; sib = sib.nextSibling) {
            for (var sib2 = sib.firstChild; sib2; sib2 = sib2.nextSibling) {
               var qid = parseInt(sib2.getAttribute('q_id'));
               sib2.setAttribute('q_id', qid - 1);
            }
         }
         p_el.parentNode.removeChild(p_el);
         return false;
      }

      el.onclick = function() {
         var index = this.getAttribute('q_id');
         bgPage.readQ.remove(index);
         chrome.tabs.create({'url':this.href});
         return false;
      }
      el.onmouseover = function() {
         $('urlbar').innerHTML = this.href;
      }
      el.onmouseout = function() {
         $('urlbar').innerHTML = "";
      }
      pel.appendChild(el);
      pel.appendChild(delete_el);
      $('links').appendChild(pel);
   }
}
