angular.
  module('spa').
  factory('DB', [ '$rootScope', '$http', '$q', '$resource',
    function( $rootScope, $http, $q, $resource ) {
      
      var customer = (function(){
        return $resource('/customer', {}, {
            query  : { method: 'GET', url: '/customer/list', isArray: true },
            create : { method: 'POST', url: '/customer/create' },
            get    : { method: 'GET', url: '/customer/read/:id', params : { id : 'id'}},
            remove : { method: 'DELETE', url: '/customer/delete/:id', params : { id : 'id'}},
            update : { method: 'POST', url: '/customer/update/:id', params : { id : 'id'}}
       });
      })();


      var item = (function(){
        return $resource('/item', {}, {
            query  : { method: 'GET', url: '/item/list', isArray: true },
            create : { method: 'POST', url: '/item/create' },
            get    : { method: 'GET', url: '/item/read/:id', params : { id : 'id'}},
            remove : { method: 'DELETE', url: '/item/delete/:id', params : { id : 'id'}},
            update : { method: 'POST', url: '/item/update/:id', params : { id : 'id'}}
       });
      })();

      var supplier = (function(){
        return $resource('/supplier', {}, {
            query  : { method: 'GET', url: '/supplier/list', isArray: true },
            create : { method: 'POST', url: '/supplier/create' },
            get    : { method: 'GET', url: '/supplier/read/:id', params : { id : 'id'}},
            remove : { method: 'DELETE', url: '/supplier/delete/:id', params : { id : 'id'}},
            update : { method: 'POST', url: '/supplier/update/:id', params : { id : 'id'}}
       });
      })();

      var sale = (function(){
        return $resource('/sale', {}, {
            query  : { method: 'GET', url: '/sale/list', isArray: true },
            create : { method: 'POST', url: '/sale/create' },
            get    : { method: 'GET', url: '/sale/read/:id', params : { id : 'id'}},
            remove : { method: 'DELETE', url: '/sale/delete/:id', params : { id : 'id'}},
            update : { method: 'POST', url: '/sale/update/:id', params : { id : 'id'}}
       });
      })();

      var payment = (function(){
        return $resource('/payment', {}, {
            query  : { method: 'GET', url: '/payment/list', isArray: true },
            create : { method: 'POST', url: '/payment/create' },
            get    : { method: 'GET', url: '/payment/read/:id', params : { id : 'id'}},
            remove : { method: 'DELETE', url: '/payment/delete/:id', params : { id : 'id'}},
            update : { method: 'POST', url: '/payment/update/:id', params : { id : 'id'}}
       });
      })();

      var expense = (function(){
        return $resource('/expense', {}, {
            query  : { method: 'GET', url: '/expense/list', isArray: true },
            create : { method: 'POST', url: '/expense/create' },
            get    : { method: 'GET', url: '/expense/read/:id', params : { id : 'id'}},
            remove : { method: 'DELETE', url: '/expense/delete/:id', params : { id : 'id'}},
            update : { method: 'POST', url: '/expense/update/:id', params : { id : 'id'}}
       });
      })();


      var transaction = (function(){
        return $resource('/transaction', {}, {
            query  : { method: 'GET', url: '/transaction/list', isArray: true },
            create : { method: 'POST', url: '/transaction/create' },
            get    : { method: 'GET', url: '/transaction/read/:id', params : { id : 'id'}},
            remove : { method: 'DELETE', url: '/transaction/delete/:id', params : { id : 'id'}},
            update : { method: 'POST', url: '/transaction/update/:id', params : { id : 'id'}}
       });
      })();


      var report = (function(){
        return $resource('/report', {}, {
            query  : { method: 'GET', url: '/report/list', isArray: true },
            create : { method: 'POST', url: '/report/create' },
            get    : { method: 'GET', url: '/report/read/:id', params : { id : 'id'}},
            remove : { method: 'DELETE', url: '/report/delete/:id', params : { id : 'id'}},
            update : { method: 'POST', url: '/report/update/:id', params : { id : 'id'}}
       });
      })();

      var role = (function(){
        return $resource('/role', {}, {
            query  : { method: 'GET', url: '/role/list', isArray: true },
            create : { method: 'POST', url: '/role/create' },
            get    : { method: 'GET', url: '/role/read/:id', params : { id : 'id'}},
            remove : { method: 'DELETE', url: '/role/delete/:id', params : { id : 'id'}},
            update : { method: 'POST', url: '/role/update/:id', params : { id : 'id'}}
       });
      })();

      var user = (function(){
        return $resource('/user', {}, {
            query  : { method: 'GET', url: '/user/list', isArray: true },
            create : { method: 'POST', url: '/user/create' },
            get    : { method: 'GET', url: '/user/read/:id', params : { id : 'id'}},
            remove : { method: 'DELETE', url: '/user/delete/:id', params : { id : 'id'}},
            update : { method: 'POST', url: '/user/update/:id', params : { id : 'id'}}
       });
      })();


      var permission = (function(){
        return $resource('/permission', {}, {
            query  : { method: 'GET', url: '/permission/list', isArray: true },
            create : { method: 'POST', url: '/permission/create' },
            get    : { method: 'GET', url: '/permission/read/:id', params : { id : 'id'}},
            remove : { method: 'DELETE', url: '/permission/delete/:id', params : { id : 'id'}},
            update : { method: 'POST', url: '/permission/update/:id', params : { id : 'id'}}
       });
      })();

      var setting = (function(){
        return $resource('/setting', {}, {
            query  : { method: 'GET', url: '/setting/list', isArray: true },
            create : { method: 'POST', url: '/setting/create' },
            get    : { method: 'GET', url: '/setting/read/:id', params : { id : 'id'} },
            remove : { method: 'DELETE', url: '/setting/delete/:id', params : { id : 'id'}  },
            update : { method: 'POST', url: '/setting/update/:id', params : { id : 'id'}  }
       });
      })();

      var message = (function(){
        return $resource('/message', {}, {
            query  : { method: 'GET', url: '/message/list', isArray: true },
            create : { method: 'POST', url: '/message/create' },
            get    : { method: 'GET', url: '/message/read/:id', params : { id : 'id'}},
            remove : { method: 'DELETE', url: '/message/delete/:id', params : { id : 'id'}},
            update : { method: 'POST', url: '/message/update/:id', params : { id : 'id'}}
       });
      })();

      return {
        customer   : customer,
        message    : message,
        item       : item,
        supplier   : supplier,
        sale       : sale,
        payment    : payment,
        expense    : expense,
        transaction: transaction,
        report     : report,
        role       : role,
        user       : user,
        permission : permission,
        setting    : setting
      };
    }
  ]);