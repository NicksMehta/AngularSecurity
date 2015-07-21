/**
 * Authentication Service.
 * @author Nikhil
 * @date 9.Jul.2015
 */
angular.module('Security', ['Utils', 'Session', 'ngCookies', 'Constants'])
.constant('TOKEN_KEY', 'X-Auth-Token')
.factory('AuthenticationService', ['$http', '$rootScope', 'AppConstants', 'URLService', 'TOKEN_KEY', 'SessionService', '$cookieStore', '$q',  function($http, $rootScope, AppConstants, urlService, TOKEN_KEY, sessionService, $cookieStore, $q) {
  var loggedInUser;
  return {
    authenticate : function(creds, callback) {
      $rootScope.authenticatedUser = { username: creds.username, authorities: [{ authority: 'ROLE_EDITOR' }] };
	  $rootScope.isAuthenticated = true;
	  if(!!callback) { callback(true); }
    },
    logout : function(cb) {
      delete $rootScope.authenticated;
	  $rootScope.isAuthenticated = false;
      if(!!cb) { cb(); }
    },
    getAuthenticatedUser : function() {
      return $rootScope.authenticatedUser;
    },
    isAuthenticated : function() {
      return $rootScope.isAuthenticated;
    }
  };
}]);