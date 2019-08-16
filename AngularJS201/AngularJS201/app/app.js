(function () {
    'use strict';

    angular.module('app', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    controller: 'mainCtrl',
                    templateUrl: '/app/templates/main.html'
                })
                .when('/user', {
                    controller: 'UserController',
                    templateUrl: '/app/templates/user.html'
                })
                .when('/role', {
                    controller: 'RoleController',
                    templateUrl: '/app/templates/role.html'
                })
                .when('/page', {
                    controller: 'PageController',
                    templateUrl: '/app/templates/page.html'
                })
                .when('/permission', {
                    controller: 'PermissionController',
                    templateUrl: '/app/templates/permission.html'
                })
                .when('/user-role', {
                    controller: 'UserRoleController',
                    templateUrl: '/app/templates/UserRole.html'
                })
                .otherwise({ redirectTo:'/'})

        }]);
})();