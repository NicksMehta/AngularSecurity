/**
 * Session Service.
 * @author Nikhil.
 * @date 25.Oct.2015.
 */

angular.module('Session', [])
.factory('SessionService', [function() {
	return {
		isAuthenticated : function() {
			return this.getSessionUser() ? true : false;
		},
		setSessionUser : function(user) {
			if(!!user) {
				//localStorageService.set('sessionUser', user);
			}
		},
		getSessionUser : function() {
			//return localStorageService.get('sessionUser');
		},
		destroySession : function() {
			//localStorageService.remove('sessionUser');
		},
		setSession : function(key, value) {
			//localStorageService.set(key, value);	
		},
		evictSession : function(key) {
			//localStorageService.remove(key);
		},
		getSessionValue : function() {
			//localStorageService.get(key);	
		}
	};
}]);