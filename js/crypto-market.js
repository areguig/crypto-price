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
      currency: "EUR",
      selection: "fav",
      list: urlParams.list?urlParams.list:localStorage.getItem(FILTER),
      items: []
    },
    computed: {
      orderedItems: function () {
        return this.items.sort((a, b) => a.ticker.rank - b.ticker.rank);
      }
    },
    methods: {
      clearFilter: function (event) {
        this.items = currencies.slice(0,100)
        this.list = []
        localStorage.removeItem(FILTER)
        window.location.href=window.location.href.split(/[?#]/)[0];
      }
    }
  })

  
  $.getJSON('./currencies.json', function(data){
    filterList(data).forEach(element => {
      $.getJSON('https://widgets.coinmarketcap.com/v1/ticker/'+element.slug+'/?convert=EUR', function(data){
        element.ticker = data[0];
        app.items.push(element)
      });
    });
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

navigator.serviceWorker && navigator.serviceWorker.register('./js/sw.js').then(function(registration) {
  console.log('Excellent, registered with scope: ', registration.scope);
});
