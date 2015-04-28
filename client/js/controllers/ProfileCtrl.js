var profileCtrl = angular.module('app.ProfileCtrl', ['ngCookies'])
        .controller('ProfileCtrl', ['$scope', '$http', '$cookieStore', '$rootScope', '$location',
            function ($scope, $http, $cookieStore, $rootScope, $location) {
                $scope.userName = $cookieStore.get('username');
            }]);