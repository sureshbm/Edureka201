(function () {
    'use strict';

    angular
        .module('app')
        .controller('RoleController', ['$scope', 'roleDataService', function ($scope, roleDataService) {
            $scope.title = "Roles";
            $scope.curRoleName = "";
            $scope.roleName = "";
            $scope.description = "";
            $scope.permission = "";
            $scope.AddNew = "Hide";
            $scope.btnSave = "Save";
            
            $scope.writeData = function () {
                
                if ($scope.btnSave == "Update") {                    
                    roleDataService.updateRoleData($scope.curRoleName, $scope.roleName, $scope.description, $scope.permission).then(function (response) {
                        $scope.roleName = "";
                        $scope.description = "";
                        $scope.curRoleName = "";
                        $scope.permission = "";
                        $scope.btnSave = "Save";
                        $scope.readData();
                    });
                }
                else {
                    roleDataService.writeRoleData($scope.roleName, $scope.description, $scope.permission).then(function (response) {
                        $scope.roleName = "";
                        $scope.description = "";
                        $scope.curRoleName = "";
                        $scope.permission = "";
                        $scope.readData();
                    });
                }
            };

            $scope.readData = function () {              
                let roles = roleDataService.readRoleData().then(function (response) {
                    $scope.roles = response;                   
                });               
            };
            
            $scope.readData();

            $scope.editRole = function (roleName, description, permission) {
                $scope.roleName = roleName;
                $scope.curRoleName = roleName;
                $scope.description = description;
                $scope.permission = permission;
            };

            $scope.deleteRole = function (roleName) {
                let roles = roleDataService.deleteRoleData(roleName).then(function (response) {
                   $scope.readData();   
                });  
                
            };

            $scope.roleDivStatus = true;

            $scope.showHideRoleDiv = function () {
                $scope.roleDivStatus = !$scope.roleDivStatus;
                $scope.roleName = "";
                $scope.description = "";
                $scope.permission = "";

                if (!$scope.roleDivStatus) {
                    $scope.AddNew = "Add New";
                    $scope.roleDivStatusclass = "ng-hide";
                }                   
                else {
                    $scope.AddNew = "Hide";
                    $scope.roleDivStatusclass = "";
                    $scope.btnSave = "Save";
                }               
            };

            $scope.showRoleDiv = function () {
                $scope.roleDivStatusclass = "";
                $scope.AddNew = "Hide";
                $scope.btnSave = "Update";
            }

        }]);
})();