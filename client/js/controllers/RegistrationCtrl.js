var ctrl = angular.module('app.RegistrCtrl', [])

        .controller('RegistrationCtrl', ['$scope', function ($scope) {
                $scope.submit = function(){
                    alert($scope.user_name);
                };
            }
        ]);