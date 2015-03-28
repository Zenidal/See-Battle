var seeBattleApp = angular.module('seeBattleApp', ['ngRoute']);

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
                .otherwise(
                        {
                            redirectTo: '/'
                        });
    }]);