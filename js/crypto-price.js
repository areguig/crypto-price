  new autoComplete({
    selector: 'input[id="search"]',
    source: function(term, response){
        $.getJSON('https://areguig.github.io/crypto-price/currencies.json', { q: term }, function(data){ response(data.map(d=>d.name)); });
    }
});