  var app = new Vue({
    el: '#app',
    data: {
      items: [{
        "name": "Bitcoin",
        "slug": "bitcoin"
      }]
    }
  })


  var urlParams;
  (window.onpopstate = function () {
      var match,
          pl     = /\+/g,  // Regex for replacing addition symbol with a space
          search = /([^&=]+)=?([^&]*)/g,
          decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
          query  = window.location.search.substring(1);
  
      urlParams = {};
      while (match = search.exec(query))
         urlParams[decode(match[1])] = decode(match[2]);
  })();
alert(urlParams)
  $.getJSON('https://areguig.github.io/crypto-price/currencies.json', function(data){
    if(urlParams.list && Array.isArray(JSON.parse(urlParams.list))){
      app.items = data.filter( d => JSON.parse(urlParams.list).includes(d.slug))
    } else {
      app.items=data.slice(0,100);
    }
  })

  new autoComplete({
    selector: 'input[id="search"]',
    source: function(term, response){
       response(currencies);
    }
})
