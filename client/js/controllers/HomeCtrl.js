var homeCtrl = angular.module('app.HomeCtrl', ['ngCookies'])
        .controller('HomeCtrl', ['$scope', '$http', '$cookieStore', '$rootScope', '$location',
            function ($scope, $http, $cookieStore, $rootScope, $location) {
                $scope.loadGames = loadGames;
                $scope.homeTimer = homeTimer;

                $scope.createGame = function () {
                    $http.get('http://seebattle/See-Battle/server/laravel/public/creategame')
                            .success(function (data) {
                                $scope.data = data;
                                $('.createGame-modal').modal('show');
                                loadGames();
                            })
                            .error(function (data) {
                                $scope.data = data;
                                $('.createGame-modal').modal('show');
                            });
                };

                $scope.acceptGame = function (id) {
                    $http({method: 'GET',
                        url: 'http://seebattle/See-Battle/server/laravel/public/acceptgame',
                        params: {'game_id': id}})
                            .success(function (data) {
                                $scope.data = data;
                                $('.acceptGame-modal').modal('show');
                                loadGames();
                            })
                            .error(function (data) {
                                $scope.data = data;
                                $('.acceptGame-modal').modal('show');
                            });
                };
                function loadGames() {
                    $http.get('http://seebattle/See-Battle/server/laravel/public/games')
                            .success(function (data) {
                                var games = [];
                                for (i = 0; i < data.length; i++) {
                                    if (data[i].user2_id === null) {
                                        games.push(data[i]);
                                    }
                                }
                                $scope.games = data;
                            })
                            .error(function (data) {
                                $scope.games = data;
                            });
                }
                ;
                function homeTimer() {
                    var timerId = setInterval(function () {
                        loadGames();
                    }, 2000);
                }
                ;
            }]);