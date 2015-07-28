angular.module( 'springneo', [
  'springneo.home',
  'springneo.about',
  'springneo.login',
  'ui.router',
  'AngularSecurityManager',
  'Constants'
])
.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, AngularSecurityManagerProvider) {
  $urlRouterProvider.otherwise( '/home' );
  AngularSecurityManagerProvider.setConfig({ userAuthService: 'AuthenticationService', sessionService: 'SessionService', unAuthorizeState: 'login', forbiddenState: 'forbidden' });
})
.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
});

