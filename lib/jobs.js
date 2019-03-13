/*
 * jobs.js - Redis jobs implementation
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var
  crud   = require( './crud'    ),
  email  = require( './email'   ),
  processData, start;
// ------------- END MODULE SCOPE VARIABLES ---------------

// --------------- BEGIN UTILITY METHODS ------------------

/**
* Don't forget to change your receipient details here
* I need to modeify this as most people who followed this tutorial always end up sending mail to me instead
*/

processData = function() {

  var receiver = 'konedangui@gmail.com';
  var username = 'Kone';
  var name = 'Dangui Ismael';
  var password = 'http://yourdomain.com/some-password-links';
  //email.sendPasswordReset(receiver, username, name, password);

  crud.read(
    'message',
    { status : 0 },
    {},
    function ( result_list ) {
      console.log( result_list.length )
      if (result_list!== undefined) {
        for (var i = 0; i < result_list.length; i++) {

          console.log( result_list.length );

          email.sendInfoMail(result_list[i].contact, result_list[i].subject, result_list[i].body);

          crud.update(
            'message',
            { '_id'     : result_list[i]._id },
            { status : '1' },
            function ( result_map ) {
              console.log( result_map );
            }
          );

        }
      }
    }
  );
   
}

// ---------------- END UTILITY METHODS -------------------

// ---------------- BEGIN PUBLIC METHODS ------------------



start = function () {
  setInterval(processData, 10*1000);
};

module.exports = {
  start : start
};
// ----------------- END PUBLIC METHODS -------------------
