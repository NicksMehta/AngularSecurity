angular.module( 'springneo.home', [
  'ui.router',
  'AngularSecurityManagerConstants'
])
.config(function config( $stateProvider, INTERCEPT_STRATEGY, ACCESS_TYPE) {
  $stateProvider.state( 'home', {
    url: '/home',
    params: { access: { 'public' : false, authStrategy: INTERCEPT_STRATEGY.ROLES, hasRoles: ['ROLE_ADMIN', 'ROLE_EDITOR'], accessType: ACCESS_TYPE.HAS_ANY_ROLE } },
    views: {
      main: {
        controller: 'HomeCtrl',
        templateUrl: 'src/home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})
.controller( 'HomeCtrl', function HomeController( $scope ) {
});

