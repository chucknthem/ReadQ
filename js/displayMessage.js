var div = document.createElement('div');
div.style.backgroundColor = '#CCFFCC';
div.style.display = 'block';
div.style.position = 'fixed';
div.style.zIndex = '100';
div.style.top = '40%';
div.style.marginLeft = 'auto';
div.style.marginRight = 'auto';
div.style.width = '100em';
div.style.height = 'auto';

chrome.extension.sendRequest({req: 'message'},
   function(response) {
      var len = response.res.length;
      div.innerHTML = response.res;

      document.body.appendChild(div);
      setTimeout('document.body.removeChild(div)', 5000);
   });

