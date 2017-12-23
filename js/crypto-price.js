var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
  })

  new autoComplete({
    selector: 'input[id="search"]',
    source: function(term, response){
        $.getJSON('https://files.coinmarketcap.com/generated/search/quick_search.json', { q: term }, function(data){ response(data.map(t => t.slug)); });
    }
});