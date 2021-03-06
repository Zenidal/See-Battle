var seeBattleApp = angular.module('seeBattleApp',
        ['ngRoute', 'app.AuthorizCtrl', 'app.RegistrCtrl', 'app.LogoutCtrl', 'app.HomeCtrl', 'app.GameCtrl', 'app.ProfileCtrl', 'app.StatisticsCtrl']);

seeBattleApp.config(['$routeProvider', '$provide', function ($routeProvider) {
        $routeProvider
                .when('/',
                        {
                            redirectTo: '/Home'
                        })
                .when('',
                        {
                            redirectTo: '/Home'
                        })
                .when('/Home',
                        {
                            templateUrl: 'views/homeView.html',
                            controller: 'HomeCtrl'
                        })
                .when('/Profile',
                        {
                            templateUrl: 'views/profileView.html',
                            controller: 'ProfileCtrl'
                        })
                .when('/Statistics',
                        {
                            templateUrl: 'views/statisticsView.html',
                            controller: 'StatisticsCtrl'
                        }
                )
                .when('/Registration',
                        {
                            templateUrl: 'views/registrationView.html',
                            controller: 'RegistrationCtrl'
                        })
                .when('/Authorization',
                        {
                            templateUrl: 'views/authorizationView.html',
                            controller: 'AuthorizationCtrl'
                        })
                .when('/Logout',
                        {
                            templateUrl: 'views/homeView.html',
                            controller: 'LogoutCtrl'
                        })
                .when('/Game',
                        {
                            templateUrl: 'views/gameView.html',
                            controller: 'GameCtrl'
                        })
                .otherwise(
                        {
                            redirectTo: '/'
                        });
    }]);
seeBattleApp.run(function ($rootScope, $cookieStore) {
    username = $cookieStore.get('username');
    if (username !== undefined) {
        $rootScope.authorized = true;
    } else {
        $rootScope.authorized = false;
    }
});