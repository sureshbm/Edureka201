(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserController', ['$scope', 'userDataService', function ($scope, userDataService) {
            $scope.title = "User List";
            $scope.curUserName = "";
            $scope.userName = "";
            $scope.emailId = "";
            $scope.AddNew = "Hide";
            $scope.btnSave = "Save";

            $scope.sortColumn = "userName";
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



            $scope.writeData = function () {                
                if ($scope.btnSave == "Update") {
                   
                    userDataService.updateUserData($scope.curUserName, $scope.userName, $scope.emailId).then(function (response) {
                        $scope.userName = "";
                        $scope.emailId = "";
                        $scope.curUserName = "";
                        $scope.btnSave = "Save";
                        $scope.readData();
                    });
                }
                else {
                    $scope.result =  userDataService.writeUserData( $scope.userName, $scope.emailId).then(function (response) {
                        $scope.userName = "";
                        $scope.emailId = "";
                        $scope.curUserName = "";
                        $scope.readData();
                       
                    });
                }
                console.log($scope.result);
            };

            $scope.readData = function () {              
                let users = userDataService.readUserData().then(function (response) {
                    $scope.users = response;                   
                }); 


            };
            
            $scope.readData();

            $scope.editUser = function (userName, emailId) {
                $scope.userName = userName;
                $scope.curUserName = userName;
                $scope.emailId = emailId;
            };

            $scope.deleteUser = function (userName) {
               let users = userDataService.deleteUserData(userName).then(function (response) {
                   $scope.readData();   
                });  
                
            };

            $scope.userDivStatus = true;

            $scope.showHideUserDiv = function () {
                $scope.userDivStatus = !$scope.userDivStatus;
                $scope.userName = "";
                $scope.emailId = "";

                if (!$scope.userDivStatus) {
                    $scope.AddNew = "Add New";
                    $scope.userDivStatusclass = "ng-hide";
                }                   
                else {
                    $scope.AddNew = "Hide";
                    $scope.userDivStatusclass = "";
                    $scope.btnSave = "Save";
                }               
            };

            $scope.showUserDiv = function () {
                $scope.userDivStatusclass = "";
                $scope.AddNew = "Hide";
                $scope.btnSave = "Update";
            }

        }]);
})();