angular
  .module('spa')
  .filter('sumOfValue', function () {
      return function (data, key) {        
          if (angular.isUndefined(data) && angular.isUndefined(key))
              return 0;        
          var sum = 0;        
          angular.forEach(data,function(value){
              sum = sum + parseInt(value[key]);
          });        
          return sum;
      }
  }).filter('totalSumPriceQty', function () {
      return function (data, key1, key2) {        
          if (angular.isUndefined(data) && angular.isUndefined(key1)  && angular.isUndefined(key2)) 
              return 0;        
          var sum = 0;
          angular.forEach(data,function(value){
              sum = sum + (parseInt(value[key1]) * parseInt(value[key2]));
          });
          return sum;
      }
  }).filter('unique', function() {

    return function (arr, field) {
      var o = {}, i, l = arr.length, r = [];
      for(i=0; i<l;i+=1) {
        o[arr[i][field]] = arr[i];
      }
      for(i in o) {
        r.push(o[i]);
      }
      return r;
    };
  }).filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  });