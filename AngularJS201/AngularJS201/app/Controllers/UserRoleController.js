(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserRoleController', ['$scope', 'userRoleDataService', function ($scope, userRoleDataService) {
            $scope.title = "Permission";    

            $scope.userRole = [];


            $scope.sortColumn = "UserName";
            $scope.reverseSort = false;

            $scope.sortData = function (column) {
                $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
                $scope.sortColumn = column;
            }

            $scope.getSortClass = function (column) {
                if ($scope.sortColumn == column)
                    return $scope.reverseSort ? "arrow-down" : "arrow-up";
                return "";
            }


            $scope.saveData = function () {                                
                let ur = userRoleDataService.saveUserRoleData($scope.userRole).then(function (response) {
                    return;
                });
            };          


            $scope.readData = function () { 
                let roles=[];
                let x = userRoleDataService.readRoleData().then(function (response) {
                    $scope.roles = response;
                    angular.forEach($scope.roles, function (value, key) {
                        roles.push(value);
                    });
                });

                let y = userRoleDataService.readUserData().then(function (response) {
                    $scope.users = response;
                    angular.forEach($scope.users, function (value, key) {
                         
                        let temp = {
                            UserName: value.UserName,
                            Role: roles,
                            SelectedRole: value.Role
                        };
                        $scope.userRole.push(temp);
                    });
                   
                });                
            };
            
           $scope.readData();

        }]);
})();