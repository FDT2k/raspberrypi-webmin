(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('LoginController', LoginController);
 
    LoginController.$inject = ['$scope','$location', 'AuthenticationService','SessionManager'];
    function LoginController($scope,$location, AuthenticationService,SessionManager) {
        var vm = $scope;
 
        $scope.login = login;
        
 
        function login() {
           
            vm.dataLoading = true;
            vm.promise = AuthenticationService.Login(vm.username, vm.password);

            vm.promise.then(function(response) {
                $location.path('/member');
                vm.dataLoading=false;
            }, function(response) {
                vm.dataLoading=false;
            });
            vm.promise;
        };
    }
 
})();