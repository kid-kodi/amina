// Define the `phonecatApp` module
angular.module( 'spa', [
  // ...which depends on the `phoneList` module
  'ngRoute', 
  'pascalprecht.translate', 
  'angularMoment', 
  'ngCookies',
  'constant',
  'signin',
  ] );