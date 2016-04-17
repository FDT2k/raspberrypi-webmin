(function () {
	'use strict';

	angular
		.module('fdt.JWTSessionManager', ['ngRoute', 'ngCookies','oc.lazyLoad'])
		.config(config)
		.service('APIInterceptor', APIInterceptor)
		.service('SessionManager',SessionManager)
		.run(run);

	config.$inject = ['$routeProvider', '$locationProvider','$httpProvider'];
	function config($routeProvider, $locationProvider,$httpProvider) {
		$routeProvider

			.when('/login', {
					controller: 'LoginController',
					templateUrl: 'views/login.html',
					controllerAs: 'vm',
					resolve: {
		                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
		                    return $ocLazyLoad.load({
		                        name: 'login',
		                        files: [
		                            'js/controllers/LoginController.js',
		                        ]
		                    });
		                }]
		            }
				}
			)
			
			.when('/logout',{
					controller: function(SessionManager){
						console.log('logout');
						console.log('user logging out');
						SessionManager.clearCredentials();
						//$location.path("/");
					},
					template: ''

			})
			
			.otherwise({ redirectTo: '/' });

		$httpProvider.interceptors.push('APIInterceptor');
	}

	APIInterceptor.$inject= ['$rootScope','$location','$cookieStore','SessionManager'];
	function APIInterceptor($rootScope,$location,$cookieStore,SessionManager) {
		var service = this;

		service.request = function(config) { 
		//	console.log(config.method,config.url);
		//	console.log("token: "+SessionManager.token);
			config.headers["Authorization"]="Bearer "+SessionManager.token; // injecting authentication token
			return config;
		};

		service.response = function(response) {
		//	console.log(response.config.method,response.config.url);
		//	console.log("token: "+SessionManager.token);
			if(response.data){
				if(response.data.error_code> 100 && response.data.error_code <200){
					SessionManager.clearCredentials();
					console.log('invalid response from backend');
				}/*else if (response.data.new_token !=""){// token is about to expire
					//replace the token 
					SessionManager.setCredentials(response.data.new_token);
				}*/
				//console.log(response.new_token);

				if(response.data && response.data.data && response.data.data.token && response.data.data.token != ""){
					SessionManager.setCredentials(response.data.data.token);
				}
			}
			return response;
		};

	}

	SessionManager.$inject= ['$rootScope','$cookieStore','$location'];
	function SessionManager($rootScope,$cookieStore,$location){
		var service = this;
		
		service.hasToken= function(){
			return ( typeof service.token != "undefined" && service.token && service.token !='' );
		}

		service.setCredentials = function (token) {
			var authdata = token;
			service.token = token;
			$rootScope.globals = {
				token: authdata
		 	};
		  	$cookieStore.put('globals', $rootScope.globals);
			service.isLogged()
		}

		service.clearCredentials = function SetCredentials(token) {
				console.log('cleared credentials');
				$rootScope.globals = {};
				service.token="";
				$cookieStore.remove('globals');
				//$location.path('/login');
				
				service.isUnlogged();

		}

		service.isLogged=function(){
			$rootScope.$broadcast('event:sessionmanager-authorized');
		}

		service.isUnlogged = function(){
			$rootScope.$broadcast('event:sessionmanager-unauthorized');
		}
		//call this allows to initialize the Service. and event callback properly
		service.load = function (){
			$rootScope.globals = $cookieStore.get('globals') || {};
		
			if ($rootScope.globals.token) {
				service.token = $rootScope.globals.token;
				service.isLogged();
			}
		}
		
		
		


		service.authorizationRequired = function (){
			var path = $location.path();
	//		console.log(service.hasToken());
	//		console.log($.inArray(path,service._publicArea));
			if($.inArray(path,service._publicArea)==-1 && !service.hasToken()){
			//	console.log('require authentication');
			}
		}



		service.publicArea= function(array){
			console.log(typeof service._publicArea);
			if(typeof service._publicArea !== 'array'){
		//		service._publicArea =  ['/login','/logout']
			}
			if((typeof optionalArg === 'undefined') ){
				return service._publicArea;
			}else{
				service._publicArea=array;
			}
			
		}
		return service;
	} 

	run.$inject = ['$rootScope', '$location', '$cookieStore', '$http',"SessionManager"];
	
	function run($rootScope, $location, $cookieStore, $http,SessionManager) {


		$rootScope.$on('$locationChangeStart', function (event, next, current) {

			SessionManager.authorizationRequired();
		//	event.preventDefault();
		});
	}

})();