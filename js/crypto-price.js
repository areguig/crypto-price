  var app = new Vue({
    el: '#app',
    data: {
      items: [{
        "name": "Bitcoin",
        "slug": "bitcoin"
      }]
    }
  })

  $.getJSON('https://areguig.github.io/crypto-price/currencies.json', function(data){ 
    app.items=data;
  })

  new autoComplete({
    selector: 'input[id="search"]',
    source: function(term, response){
       response(currencies);
    }
})
