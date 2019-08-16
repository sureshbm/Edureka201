(function () {
    'use strict';

    angular
        .module('app')
        .controller('PageController', ['$scope', 'pageDataService', function ($scope, pageDataService) {
            $scope.title = "Pages";
            $scope.curPageName = "";
            $scope.pageName = "";
            $scope.description = "";
            $scope.AddNew = "Hide";
            $scope.btnSave = "Save";
            
            $scope.writeData = function () {
                
                if ($scope.btnSave == "Update") {
                    
                    pageDataService.updatePageData($scope.curPageName, $scope.pageName, $scope.description).then(function (response) {
                        $scope.pageName = "";
                        $scope.description = "";
                        $scope.curPageName = "";
                        $scope.btnSave = "Save";
                        $scope.readData();
                    });
                }
                else {
                    pageDataService.writePageData($scope.pageName, $scope.description).then(function (response) {

                        $scope.pageName = "";
                        $scope.description = "";
                        $scope.curPageName = "";
                        $scope.readData();
                    });
                }
            };

            $scope.readData = function () {              
                let pages = pageDataService.readPageData().then(function (response) {
                    $scope.pages = response;                   
                });               
            };
            
            $scope.readData();

            $scope.editPage = function (pageName, description) {
                $scope.pageName = pageName;
                $scope.curPageName = pageName;
                $scope.description = description;
            };

            $scope.deletePage = function (pageName) {

                let pages = pageDataService.deletePageData(pageName).then(function (response) {
                   $scope.readData();   
                });  
                
            };

            $scope.pageDivStatus = true;

            $scope.showHidePageDiv = function () {
                $scope.pageDivStatus = !$scope.pageDivStatus;
                $scope.pageName = "";
                $scope.description = "";

                if (!$scope.pageDivStatus) {
                    $scope.AddNew = "Add New";
                    $scope.pageDivStatusclass = "ng-hide";
                }                   
                else {
                    $scope.AddNew = "Hide";
                    $scope.pageDivStatusclass = "";
                    $scope.btnSave = "Save";
                }               
            };

            $scope.showPageDiv = function () {
                $scope.pageDivStatusclass = "";
                $scope.AddNew = "Hide";
                $scope.btnSave = "Update";
            }

        }]);
})();