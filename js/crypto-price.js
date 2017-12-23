  var app = new Vue({
    el: '#app',
    data: {
      list: [],
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

  $.getJSON('https://areguig.github.io/crypto-price/currencies.json', function(data){
    app.items=filterList(data);
  })


function filterList(data){
  list = urlParams.list?urlParams.list:localStorage.getItem("crypto_list")
  if(list && Array.isArray(JSON.parse(list))){
     localStorage.setItem("crypto_list", list);
     app.list=list
     return   data.filter(d => JSON.parse(list).includes(d.slug))
  } else {
    return data.slice(0,100);
  }
}