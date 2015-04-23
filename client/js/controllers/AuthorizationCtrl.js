var authCtrl = angular.module('app.AuthorizCtrl', ['ngCookies'])
        .controller('AuthorizationCtrl', ['$scope', '$http', '$location', '$cookieStore', '$rootScope',
            function ($scope, $http, $location, $cookieStore, $rootScope) {
                $scope.submit = function () {
                    $http({method: 'GET',
                        url: 'http://seebattle/See-Battle/server/laravel/public/authorization',
                        params: {'username': $scope.user_name, 'password': $scope.user_password}})
                            .success(function (data)
                            {
                                $rootScope.authorized = true;
                                $cookieStore.put('username', data.username);
                                $cookieStore.put('token', data.remember_token);
                                $scope.data = data.username + ' has successfully logged in.';
                                $('.authorization-modal').modal('show');
                            })
                            .error(function (data)
                            {
                                $scope.data = data;
                                $('.authorization-modal').modal('show');
                            });
                };
            }]);