var div = document.createElement('div');
div.backgroundColor = '#000000';
div.style.display = 'block';
div.style.position = 'fixed';
div.style.top = '40%';
div.style.left = '30%';
div.style.width = '20em';
div.style.height = '20em';
div.style.zIndex = '100';

chrome.extension.sendRequest({req: 'message'},
   function(response) {
      div.innerHTML = response.res;
      document.body.appendChild(div);
      setTimeout('document.body.removeChild(div)', 5000);
   });

