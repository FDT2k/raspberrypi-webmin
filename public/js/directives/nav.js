(function () {
    'use strict';

	var app = angular.module('app').directive('navMenu',function(){
		console.log('test');
		return {
			restrict:'E',
			replace: true,
			templateUrl:'views/nav.html',
			controller: ['$rootScope','$scope','$location','SessionManager','UserService',function($rootScope,$scope,$location,SessionManager,UserService){

				$scope.session=SessionManager;
				$scope.user = UserService.user;
				$rootScope.$on('event:sessionmanager-authorized', function () {
		        //	$scope.user = UserService.user;
		        });


		        $scope.$watch( function () { return UserService.user; }, function (data) {
				    $scope.user = data;
				  }, true);

		        $scope.logout= function(){
		        	SessionManager.clearCredentials();
		        	$location.path('/');
		        }
			}],
			controllerAs:'vm'
		};
	});

})();