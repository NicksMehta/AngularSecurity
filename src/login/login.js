angular.module( 'springneo.login', ['ui.router', 'Security'])
.config(function config( $stateProvider ) {
  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      main: {
        controller: 'LoginController',
        templateUrl: 'src/login/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  })
  .state( 'logout', {
    url: '/logout',
    params : { access: { 'public' : true } },
    views: {
      main: {
        controller: 'LogoutController',
        template: ''
      }
    },
    data:{ pageTitle: 'Logout' }
  })
  .state( 'forbidden', {
    url: '/403',
    views: {
      main: {
        controller: 'ForbiddenController',
        templateUrl: 'src/login/forbidden.tpl.html'
      }
    },
    data:{ pageTitle: '403' }
  });
})

.controller( 'LoginController',['$scope', 'AuthenticationService', '$state', '$rootScope', function LoginController($scope, authenticationService, $state, $rootScope) {
  $scope.creds = {username: 'nick', password: '123456'};
	$rootScope.isAuthenticated = authenticationService.isAuthenticated();
  $scope.login = function(creds) {
    authenticationService.authenticate(creds, function(isAuthenticated) {
      if(isAuthenticated) {
        $state.go('home');
      }
    });
  };
}])
.controller('LogoutController', ['AuthenticationService', '$state', '$rootScope', function(authenticationService, $state, $rootScope) {
  $rootScope.isAuthenticated = false;
  authenticationService.logout(function() {
    $state.go('login');
  });
}])
.controller('ForbiddenController', function() {
  
});
