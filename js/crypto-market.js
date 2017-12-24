  var currencies;
  const FILTER = "crypto_list"

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



  var app = new Vue({
    el: '#app',
    data: {
      list: urlParams.list?urlParams.list:localStorage.getItem(FILTER),
      items: [{
        "name": "Bitcoin",
        "slug": "bitcoin"
      }]
    },
    methods: {
      clearFilter: function (event) {
        this.items = currencies.slice(0,100)
        this.list = []
        localStorage.removeItem(FILTER)
        reloadScript()
        window.location.href=window.location.href.split(/[?#]/)[0];
      }
    }
  })

  
  $.getJSON('https://areguig.github.io/crypto-price/currencies.json', function(data){
    app.items=filterList(data);
  })


function filterList(data){
  if(app.list && Array.isArray(JSON.parse(app.list)) && JSON.parse(app.list).length>0){
    currencies = data
     localStorage.setItem(FILTER, app.list);
     return   data.filter(d => JSON.parse(app.list).includes(d.slug))
  } else {
    return data.slice(0,100);
  }
}

function reloadScript(){
  var head= document.getElementsByTagName('head')[0];
  document.getElementById("currency-js").remove();
   var script= document.createElement('script');
   script.type= 'text/javascript';
   script.src= 'https://files.coinmarketcap.com/static/widget/currency.js';
   head.appendChild(script);
}