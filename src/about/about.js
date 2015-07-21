angular.module( 'springneo.about', [
  'ui.router'
])

.config(function config( $stateProvider) {
  $stateProvider.state( 'about', {
    url: '/about',
    views: {
      main: {
        controller: 'AboutCtrl',
        templateUrl: 'about/about.tpl.html'
      }
    },
    data:{ pageTitle: 'About Page' }
  });
})

.controller( 'AboutCtrl', function AboutCtrl( $scope ) {
});
