(function () {
    'use strict';
 
    angular
        .module('app')
        .factory('UserService', UserService);
 
	UserService.$inject = ['$http','$q',  '$rootScope','API_CONFIG','SessionManager'];
    
	function UserService($http,$q , $rootScope,API_CONFIG,SessionManager) {
        var service = {};
        service.user = {}
		service.registerUser = registerUser;
		service.currentUser = currentUser;
		service.getAvailabilty = getAvailabilty;
        return service;
 
        function registerUser(data) {

            var deferred = $q.defer();

            $http.post(API_CONFIG.host+'/'+API_CONFIG.registerMethod, data).then(
				function(response){
					if(response.data.result ){
						deferred.resolve(response);
						
					}else{
						deferred.reject(response);
					}
				},
				function (response){
					deferred.reject(response);
					//SessionManager.clearCredentials();
				}
			);
			return deferred.promise;
        }

		function getAvailabilty(data) {

            var deferred = $q.defer();

            $http.get(API_CONFIG.host+'/_busy_days', {params:data}).then(
				function(response){
					if(response.data.result ){
						deferred.resolve(response);
						
					}else{
						deferred.reject(response);
					}
				},
				function (response){
					deferred.reject(response);
					//SessionManager.clearCredentials();
				}
			);
			return deferred.promise;
        }

		function currentUser(){
			var deferred = $q.defer();
			 $http.get(API_CONFIG.host+'/_user',{}).then(
				function(response){
					if(response.data.result ){
						deferred.resolve(response);
						
					}else{
						deferred.reject(response);
					}
				},
				function (response){
					deferred.reject(response);
					
				}
			);

			

		  	deferred.promise.then(function(response) {
				service.user=  response.data.data;
			}, function(response) {
				service.user = {}

			});
			return deferred.promise;
		}
 
    }
 
 
})();