var regCtrl = angular.module('app.RegistrCtrl', [])
        .controller('RegistrationCtrl', ['$scope', '$http', '$location', function ($scope, $http) {
                $scope.submit = function () {
                    errorMessage = '';
                    if ($scope.user_name.length < 6 || $scope.user_name.length > 50)
                    {
                        errorMessage += '\nLogin length should be in the range from 6 to 50 symbols.';
                    }
                    if ($scope.user_password1.length < 6 || $scope.user_password1.length > 50)
                    {
                        errorMessage += '\nPassword length should be in the range from 6 to 50 symbols.';
                    }
                    if ($scope.user_password1 !== $scope.user_password2)
                    {
                        errorMessage += '\nPassword and confirmation must match.';
                    }
                    if (errorMessage !== '')
                    {
                        $scope.errorMessage = errorMessage;
                        $('.errorModal').modal('show');
                    }
                    else
                    {
                        $http({method: 'GET', url: 'http://seebattle/See-Battle/server/laravel/public/registration', params: {'username': $scope.user_name, 'password': $scope.user_password1}})
                                .success(function (data)
                                {
                                    $scope.data = data;
                                    $('.registration-modal').modal('show');
                                })
                                .error(function (data)
                                {
                                    $scope.data = data;
                                    $('.registration-modal').modal('show');
                                });
                    }
                };
            }
        ]);