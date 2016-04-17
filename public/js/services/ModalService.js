(function () {
    'use strict';
 
    angular
        .module('app')
        .factory('ModalService', ModalService);
 
	ModalService.$inject = ['$http','$q',  '$rootScope','$uibModal'];
    
	function ModalService($http,$q , $rootScope,$uibModal) {
        var service = {};
		    service.openModal = openModal;
        service.openModalURL = openModalURL;
        return service;
        
		//return promise;
        

        function openModalURL(size,templateUrl,controller,controllerAs,resolve){
    			if (typeof size == "undefined"){
            	var size= 100;
            }
    			var modalParams = {
                  animation: true,
                 // templateUrl: template,
                  size: size,
                  /*controller: 'ModalInstanceCtrl',
                  controllerAs:'vm',
                  resolve: {
                    items: function () {
                      return $scope.items;
                    },
                    lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'login',
                                        files: [
                                            'js/controllers/LoginController.js',
                                        ]
                                    });
                                }]
                  }*/
                };
                if (typeof template !== "undefined"){
                	modalParams.template= template;
                }
                if (typeof templateUrl !== "undefined"){
                	modalParams.templateUrl= templateUrl;
                }
                if (typeof controller !== "undefined"){
                	modalParams.controller= controller;
                }
                if (typeof controllerAs !== "undefined"){
                	modalParams.controllerAs= controllerAs;
                }
                if (typeof resolve !== "undefined"){
                	modalParams.resolve= resolve;
                }
    			var modalInstance = $uibModal.open(modalParams);
    			return modalInstance.result;
		    }

        function openModal(size,template,controller,controllerAs,resolve){
          if (typeof size == "undefined"){
              var size= 100;
            }
          var modalParams = {
                  animation: true,
                 // templateUrl: template,
                  size: size,
                  /*controller: 'ModalInstanceCtrl',
                  controllerAs:'vm',
                  resolve: {
                    items: function () {
                      return $scope.items;
                    },
                    lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: 'login',
                                        files: [
                                            'js/controllers/LoginController.js',
                                        ]
                                    });
                                }]
                  }*/
                };
                if (typeof template !== "undefined"){
                  modalParams.template= template;
                }
                if (typeof templateUrl !== "undefined"){
                  modalParams.templateUrl= templateUrl;
                }
                if (typeof controller !== "undefined"){
                  modalParams.controller= controller;
                }
                if (typeof controllerAs !== "undefined"){
                  modalParams.controllerAs= controllerAs;
                }
                if (typeof resolve !== "undefined"){
                  modalParams.resolve= resolve;
                }
          var modalInstance = $uibModal.open(modalParams);
          return modalInstance.result;
        }
 
    }
 
 
})();