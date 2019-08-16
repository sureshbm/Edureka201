(function () {
    'use strict';

    angular
        .module('app')
        .factory('dataService', ['$http', '$q', function ($http, $q) {
            var service = {};
            service.testRead = function () {
                $http.get('/Home/ReadData').then(function (response) {
                    if (response.data) {
                        alert(response.data);
                    }
                });
            };
            service.test = function () {
                var data = {
                    input: 'AngularJS - 201 course'
                };
                $http.post('/Home/WriteData', JSON.stringify(data)).then(function (response) {
                    if (response.data)
                        $scope.msg = "Post Data Submitted Successfully!";
                });
            };
            service.getUsers = function () {
                var deferred = $q.defer();
                $http.get('').then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };
            return service;
        }]);


    angular
        .module('app')
        .factory('userDataService', ['$http', '$q', function ($http, $q) {
            var userService = {};
            var users;

            userService.readUserData = function () {
                var deferred = $q.defer();
                $http.get('/User/ReadUserData').then(function (result) {
                    users = result.data;
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };


            userService.deleteUserData = function (userName) {
                let data = {
                    userName: userName
                };

                var deferred = $q.defer();
                $http.post('/User/deleteUserData', JSON.stringify(data)).then(function (result) {
                    users = result.data;
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };


            userService.writeUserData = function (userName, emailId) {
                let data = {
                    userName: userName,
                    emailId: emailId
                };

                var deferred = $q.defer();
                $http.post('/User/WriteUserData', JSON.stringify(data)).then(function (result) {
                    users = result.data;
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;

            };

            userService.updateUserData = function (currnetUserName, userName, emailId) {
                let data = {
                    currnetUserName: currnetUserName,
                    userName: userName,
                    emailId: emailId
                };

                var deferred = $q.defer();
                $http.post('/User/UpdateUserData', JSON.stringify(data)).then(function (result) {
                    users = result.data;
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;

            };
            return userService;
        }]);

    /// Roles

    angular
        .module('app')
        .factory('roleDataService', ['$http', '$q', function ($http, $q) {
            var roleService = {};
            var roles;

            roleService.readRoleData = function () {
                var deferred = $q.defer();
                $http.get('/Role/ReadRoleData').then(function (result) {
                    roles = result.data;
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };


            roleService.deleteRoleData = function (roleName) {
                let data = {
                    roleName: roleName
                };

                var deferred = $q.defer();
                $http.post('/Role/deleteRoleData', JSON.stringify(data)).then(function (result) {
                    roles = result.data;
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };


            roleService.writeRoleData = function (roleName, description, permission) {
                let data = {
                    roleName: roleName,
                    description: description,
                    permission: permission
                };

                var deferred = $q.defer();
                $http.post('/Role/WriteRoleData', JSON.stringify(data)).then(function (result) {
                    roles = result.data;
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;

            };

            roleService.updateRoleData = function (currnetRoleName, roleName, description, permission) {
                let data = {
                    currnetRoleName: currnetRoleName,
                    roleName: roleName,
                    description: description,
                    permission: permission
                };

                var deferred = $q.defer();
                $http.post('/Role/UpdateRoleData', JSON.stringify(data)).then(function (result) {
                    roles = result.data;
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;

            };
            return roleService;
        }]);



    /// pages

    angular
        .module('app')
        .factory('pageDataService', ['$http', '$q', function ($http, $q) {
            var pageService = {};
            var pages;

            pageService.readPageData = function () {
                var deferred = $q.defer();
                $http.get('/Page/ReadPageData').then(function (result) {
                    pages = result.data;
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };


            pageService.deletePageData = function (pageName) {
                let data = {
                    pageName: pageName
                };

                var deferred = $q.defer();
                $http.post('/Page/DeletePageData', JSON.stringify(data)).then(function (result) {
                    pages = result.data;
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };


            pageService.writePageData = function (pageName, description) {
                let data = {
                    pageName: pageName,
                    description: description
                };

                var deferred = $q.defer();
                $http.post('/Page/WritePageData', JSON.stringify(data)).then(function (result) {
                    pages = result.data;
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;

            };

            pageService.updatePageData = function (currnetPageName, pageName, description) {
                let data = {
                    currnetPageName: currnetPageName,
                    pageName: pageName,
                    description: description
                };

                var deferred = $q.defer();
                $http.post('/Page/UpdatePageData', JSON.stringify(data)).then(function (result) {
                    pages = result.data;
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;

            };
            return pageService;
        }]);

    /// Permissions

    angular
        .module('app')
        .factory('permissionDataService', ['$http', '$q', function ($http, $q) {
            var permissionService = {};
            var permissions;

            permissionService.savePermissionData = function (roleName, permission) {
               
                let data = {                
                    name: roleName                                    
                };
                //alert(JSON.stringify(data));
                var deferred = $q.defer();
                $http.post('/Permission/WritePermissionData', JSON.stringify(roleName)).then(function (result) {
                    permissions = result.data;
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            permissionService.readPermissionData = function () {
                var deferred = $q.defer();
                $http.get('/Permission/ReadPermissionData').then(function (result) {
                    permissions = result.data;
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            return permissionService;
        }]);


    /// UserRoleDataService

    angular
        .module('app')
        .factory('userRoleDataService', ['$http', '$q', function ($http, $q) {
            var userRoleService = {};
         
            userRoleService.saveUserRoleData = function (userRole) {                
                //alert(JSON.stringify(data));
                var deferred = $q.defer();
                $http.post('/UserRole/WriteUserRoleData', JSON.stringify(userRole)).then(function (result) {
                    userRole = result.data;
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };



            userRoleService.readUserData = function () {
               
                var deferred = $q.defer();
                $http.get('/User/ReadUserData').then(function (result) {                  
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            userRoleService.readRoleData = function () {
                var deferred = $q.defer();
                $http.get('/Role/ReadRoleData').then(function (result) {                   
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            return userRoleService;
        }]);
})();



