(function () {
	'use strict';

	angular
		.module('app', ['ui.bootstrap','ngRoute','oc.lazyLoad','fdt.JWTSessionManager'])
		.constant("API_CONFIG", { 
			"host":"http://__IPADDR__:3000/api",
			"loginMethod":"authenticate",
			"registerMethod":"_register",
			
			}
		).constant("JWT_CONFIG",{// required by JWTSessionManager
			"registerRoutes":false,
			"broadcastEvents":false
		})
		.config(config)
		.run(['$ocLazyLoad','$rootScope','SessionManager','UserService', function($ocLazyLoad,$scope, SessionManager,UserService) {
			SessionManager._publicArea=[
			'/login','/logout','/index', '/register','/tarif'
			];
			$ocLazyLoad.load([ // Load the authentication service used by the Session Manager
				'js/services/AuthenticationService.js',
				'js/services/ModalService.js',
			]);
			
			$scope.$on('event:sessionmanager-authorized', function () {
			 // UserService.currentUser();
			  console.log('authorized');
			});

			$scope.$on('event:sessionmanager-unauthorized', function () {
			  console.log('deauthorized');
			});

			SessionManager.load();
		}]);


	config.$inject = ['$routeProvider', '$locationProvider','$httpProvider'];
	function config($routeProvider, $locationProvider,$httpProvider) {
		
		$routeProvider
			.when('/', {
				//	controller: 'DashboardController',
					templateUrl: 'views/home.html'//,
				//	controllerAs: 'vm',
					/*resolve: {
						lazy: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'Blog',
								files: [
									'js/services/JWTSessionManager.js',
								]
							});
						}]
					}*/
				}
			)
			.otherwise({ redirectTo: '/login' });
	}


})();