var divs = document.querySelectorAll('#container > div');

console.log(divs);

//Array.prototype.forEach.call(DOMElement , function(div) { ... }) = [].

// divs.forEach(function(div){ // it worked at chrome 57
[].forEach.call(divs, function(div){ // changed if user is on old version of browser
  div.addEventListener('click', function(e){
    console.log(e.currentTarget);
    console.log(e.target);
    var data = this.dataset.attr;
    console.log(data);
  });
});