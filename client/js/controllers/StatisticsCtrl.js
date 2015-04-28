var statisticsCtrl = angular.module('app.StatisticsCtrl', ['ngCookies'])
        .controller('StatisticsCtrl', ['$scope', '$http', '$cookieStore', '$rootScope', '$location',
            function ($scope, $http, $cookieStore) {
                $scope.userName = $cookieStore.get('username');
                $scope.getStats = getStats;

                function getStats() {
                    $http({
                        method: 'GET',
                        url: 'http://seebattle/See-Battle/server/laravel/public/getstatistics',
                        params: {username: $cookieStore.get('username')}
                    })
                            .success(function (data) {
                                $scope.wins = data.wins;
                                $scope.defeats = data.defeats;
                            })
                            .error(function (data) {
                            });
                }
            }]);

