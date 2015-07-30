/**
 * Front End Security Manager.
 * @author 		Nikhil
 * @date 		9.Jul.2015
 * @version		1.5.0
 */
angular.module("AngularSecurityManagerConstants",[]).constant("INTERCEPT_STRATEGY",{PUBLIC:"public",IS_AUTHENTICATED:"is_authenticated",ROLES:"roles"}).constant("ACCESS_TYPE",{HAS_ANY_ROLE:"hasAnyRole",HAS_ROLE:"hasRole",HAS_NO_ROLES:"hasNoRoles"}).constant("HTTP_STATUS",{UN_AUTHORIZE:401,FORBIDDEN:403,OK:200,SERVER_ERROR:500}),angular.module("AngularSecurityManager",["Session","AngularSecurityManagerConstants"]).run(["$rootScope","AngularSecurityManager","$state",function(a,b,c){a.$on("$stateChangeStart",function(a,c,d,e,f){b.intercept(a,c,d)})}]).factory("AngularSecurityUtils",function(){return{intersectionObject:function(a,b,c){return _.filter(a,function(a){return _.contains(c,a[b])})}}}).provider("AngularSecurityManager",[function(){function a(){return d}function b(a){c(a),d=angular.extend({},d,a)}function c(a){if(!(a&&a.userAuthService&&a.sessionService&&a.unAuthorizeState&&a.forbiddenState))throw new Error("Invalid configuration.")}var d={userAuthService:"UserAuthService",sessionService:"SessionService",unAuthorizeState:"signin",forbiddenState:"403"};this.getConfig=a,this.setConfig=b;var e=!1;this.$get=["$http","$injector","$state","INTERCEPT_STRATEGY","ACCESS_TYPE","SessionService","AngularSecurityUtils",function(b,c,d,f,g,h,i){var j=c.get(a().userAuthService),k=a();return{getConfig:a,intercept:function(a,b,c){var h=this,i=j.isAuthenticated();if(b.params&&b.params.access){var l=b.params.access;if(void 0===l["public"]||l["public"]===!0||e)return i||(a.preventDefault(),d.go(k.unAuthorizeState)),void(e=!1);if(a.preventDefault(),i){var m=b.params.access.authStrategy;if(m){if(f.IS_AUTHENTICATED===m)return e=!0,void d.go(b,c);var n=j.getAuthenticatedUser();if(n){var o=b.params.access.accessType,p=b.params.access.hasRoles;e=o===g.HAS_ANY_ROLE?h.hasAnyRole(n,p):o===g.HAS_ROLE?h.hasRole(n,p):h.hasNoRoles(n,p)}else e=!1;if(e)return e=!0,void d.go(b,c);e=!1,d.go(k.unAuthorizeState)}}else d.go(k.unAuthorizeState)}},hasRole:function(a,b){var c=!1;return a.authorities&&(c=i.intersectionObject(a.authorities,"authority",b).length==b.length),c},hasNoRoles:function(a,b){var c=!0;return a.authorities&&(c=0===i.intersectionObject(a.authorities,"authority",b).length),c},hasAnyRole:function(a,b){var c=!1;return a.authorities&&(c=i.intersectionObject(a.authorities,"authority",b).length>0),c},changeState:function(b){b||d.go(a().unAuthorizeState)}}}]}]).directive("authorize",["$injector","AngularSecurityManager","ACCESS_TYPE",function(a,b,c){return{restrict:"E",template:'<div ng-if="display"><ng-transclude></ng-transclude></div>',priority:1e3,transclude:!0,scope:{accessType:"="},link:function(d,e,f,g){var h=(a.get(b.getConfig().sessionService),a.get(b.getConfig().userAuthService));d.$watch(f.access,function(a,e){if(d.display=!1,a){var f=h.getAuthenticatedUser();f&&h.isAuthenticated()&&(a.length?d.accessType&&(d.accessType===c.HAS_ANY_ROLE?d.display=b.hasAnyRole(f,a):d.accessType===c.HAS_ROLE?d.display=b.hasRole(f,a):d.display=b.hasNoRoles(f,a)):d.display=!1)}})}}}]);
