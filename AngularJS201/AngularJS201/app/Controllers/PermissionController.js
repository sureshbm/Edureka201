(function () {
    'use strict';

    angular
        .module('app')
        .controller('PermissionController', ['$scope', 'permissionDataService', function ($scope, permissionDataService) {
            $scope.title = "Permission";    

            $scope.test = function () {
                
                angular.forEach($scope.rolePermissions, function (value, key) {
                    let temp = "";
                    if (value.R ) {
                        temp += "R";
                    }
                    if (value.W) {
                        temp += "W";
                    }
                    if (value.U) {
                        temp += "U";
                    }
                    if (value.D) {
                        temp += "D";
                    }
                    console.log(temp);
                    $scope.permissions[key].Permission = temp 
                });  
            };


            $scope.saveData = function () {
                
                angular.forEach($scope.rolePermissions, function (value, key) {
                    let R = (value.R == true || value.R != -1) ? "R" : "";
                    let W = (value.W == true || value.W != -1) ? "W" : "";
                    let U = (value.U == true || value.U != -1) ? "U" : "";
                    let D = (value.D == true || value.D != -1) ? "D" : "";
                    let tempPermissions = R + W + U + D;
                    $scope.rolePermissions[key].Permission = tempPermissions; 
                });
                let permissions = permissionDataService.savePermissionData($scope.rolePermissions,"NA").then(function (response) {
                    return;
                });
            };          



            $scope.readData = function () {   
                let permissions = permissionDataService.readPermissionData().then(function (response) {
                   
                    $scope.permissions = response;
                    $scope.rolePermissions=[];
                    angular.forEach($scope.permissions, function (value, key) {
                        let temp = {
                            RoleName: value.RoleName,
                            Permission: value.Permission,
                            R: value.Permission.indexOf('R'),
                            W: value.Permission.indexOf('W'),
                            U: value.Permission.indexOf('U'),
                            D: value.Permission.indexOf('D')
                        };  
                        $scope.rolePermissions.push(temp);
                        
                    });
                                                         
                });               
            };
            
           $scope.readData();

        }]);
})();