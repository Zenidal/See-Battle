var homeCtrl = angular.module('app.HomeCtrl', ['ngCookies'])
        .controller('HomeCtrl', ['$scope', '$http', '$cookieStore', '$rootScope',
            function ($scope, $http, $cookieStore, $rootScope) {
                if ($rootScope.authorized) {
                    $scope.username = $cookieStore.get('username');
                }
            }]);