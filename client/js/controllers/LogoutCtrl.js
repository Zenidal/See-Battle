var logoutCtrl = angular.module('app.LogoutCtrl', ['ngCookies'])
        .controller('LogoutCtrl', ['$http', '$cookieStore', '$location', '$rootScope', function ($http, $cookieStore, $location, $rootScope)
            {
                if($rootScope.authorized){
                    $http({method: 'GET',
                    url: 'http://seebattle/See-Battle/server/laravel/public/logout'})
                        .success(function (data)
                        {

                            $rootScope.authorized = false;
                            $cookieStore.remove('username');
                            $cookieStore.remove('token');
                        })
                        .error(function (data)
                        {

                        });
                }
            }]);


