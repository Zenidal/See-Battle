var seeBattleApp = angular.module('seeBattleApp', ['ngRoute', 'app.RegistrCtrl']);

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
                            //controller: 'HomeCtrl'
                        })
                .when('/Profile',
                        {
                            templateUrl: 'views/profileView.html',
                            //controller: 'ProfileCtrl'
                        })
                .when('/Statistics',
                        {
                            templateUrl: 'views/statisticsView.html',
                            //controller: 'StatisticsCtrl'
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
                .otherwise(
                        {
                            redirectTo: '/'
                        });
    }]);