(function () {
    'use strict';

    angular
        .module('app')
        .controller('mainCtrl', ['$scope', 'dataService', function ($scope, dataService) {
            $scope.title = "Angular JS - 201";
            $scope.test = function (){
                dataService.test();
            };

            $scope.testread = function () {
                dataService.testRead();
            };
        }]);
})();