var ctrl = angular.module('app.RegistrCtrl', [])

        .controller('RegistrationCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
                $scope.registrationResult = false;
                $scope.submit = function () {
                    errorMessage = '';
                    if ($scope.user_name.length < 6 || $scope.user_name.length > 30)
                    {
                        errorMessage += '\nLogin length should be in the range from 6 to 30 symbols.';
                    }
                    if ($scope.user_password1.length < 6 || $scope.user_password1.length > 30)
                    {
                        errorMessage += '\nPassword length should be in the range from 6 to 30 symbols.';
                    }
                    if ($scope.user_password1 !== $scope.user_password2)
                    {
                        errorMessage += '\nPassword and confirmation must match.';
                    }
                    if (errorMessage !== '')
                    {
                        alert(errorMessage);
                    }
                    else
                    {
                        $http({method: 'GET', url: 'http://seebattle/See-Battle/server/laravel/public/registration', params: {'user_name': $scope.user_name, 'user_password': $scope.user_password1}})
                                .success(function (data)
                                {
                                    $scope.registrationResult = true;
                                    $scope.data = data;
                                })
                                .error(function (data)
                                {
                                    $scope.registrationResult = true;
                                    $scope.data = data;
                                });
                    }
                };
            }
        ]);