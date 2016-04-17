(function () {
    'use strict';
 
    angular
        .module('fdt.JWTSessionManager')
        .factory('AuthenticationService', AuthenticationService);
 
    AuthenticationService.$inject = ['$http','$q', '$cookieStore', '$rootScope', '$timeout','API_CONFIG','SessionManager'];
    
	function AuthenticationService($http,$q ,$cookieStore, $rootScope, $timeout,API_CONFIG,SessionManager) {
        var service = {};

        service.Login = Login;
		      
        return service;
 
        function Login(username, password) {

            console.log('Login');
            var deferred = $q.defer();

            $http.post(API_CONFIG.host+'/'+API_CONFIG.loginMethod, { username: username, password: password }).then(
				function(response){
					var headers = response.headers();
					if(headers['token']){
						deferred.resolve(response);
						SessionManager.setCredentials(headers['token']);
					}else{
						deferred.reject(response);
						SessionManager.clearCredentials();
					}
				},
				function (response){
					deferred.reject(response);
					SessionManager.clearCredentials();
				}
			);
			return deferred.promise;

          
        }
 
    }
 
 
})();