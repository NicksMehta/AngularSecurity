/**
 * Application Utils.
 */
angular.module('Utils', ['Config'])
.factory('URLService',['SERVER_URL', function(SERVER_URL) {
  return {
    getServerUrl : function(apiPath) {
      return SERVER_URL.baseUrl + apiPath;
    }
  };
}]);