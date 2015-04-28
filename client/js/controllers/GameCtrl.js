var size = 10;
var cellWidth = "40px";
var cellHeight = "40px";
var cellColor = 'rgba(150, 150, 150, 0.3)';
var fillCellColor = 'rgb(0, 0, 255)';
var headColor = "rgba(150, 150, 150, 0.6)";
var cellBorder = "1px solid";
var hitColor = "red";
var missedColor = "violet";

var gameCtrl = angular.module('app.GameCtrl', ['ngCookies'])
        .controller('GameCtrl', ['$scope', '$http', '$cookieStore', '$rootScope', '$location',
            function ($scope, $http, $cookieStore, $rootScope, $location) {
                $scope.gameTimer = gameTimer;
                $scope.initField = initField;
                $scope.confirmField = confirmField;
                $scope.ready = ready;
                function ready() {
                    $http({
                        method: 'GET',
                        url: 'http://seebattle/See-Battle/server/laravel/public/confirmfield',
                        params: {
                            username: $cookieStore.get('username')
                        }
                    })
                            .success(function () {
                                $('.fieldConfirmation-modal').modal('show');
                            })
                            .error(function () {
                            });
                }
                function gameTimer() {
                    setTimeout(function run() {
                        $http.get('http://seebattle/See-Battle/server/laravel/public/getstatusgame')
                                .success(function (data) {
                                    $scope.gameStatus = data.status;
                                    $scope.game = data.game;
                                    if (data.status === 'Ready') {
                                        $scope.whoseTurn = data.whoseTurn;
                                    }
                                    setTimeout(run, 3000);
                                })
                                .error(function () {
                                });
                    }, 3000);
                }
                function confirmField() {
                    $http({
                        method: 'GET',
                        url: 'http://seebattle/See-Battle/server/laravel/public/confirmfield'
                    })
                            .success(function (data) {
                                $scope.confirmationResult = data;
                                $('.fieldConfirmation-modal').modal('show');
                            })
                            .error(function (data) {
                                $scope.confirmationResult = data;
                                $('.fieldConfirmation-modal').modal('show');
                            });
                }
                function initField() {
                    initialize1PField();
                    initialize2PField();
                }
                function initialize1PField()
                {
                    var myField = document.getElementById('myField');
                    var table = document.createElement('table');
                    var header = table.createTHead();
                    var headerRow = header.insertRow();
                    headerRow.innerHTML = "<td style='width: " + cellWidth + "; height: " + cellHeight + "; border: " + cellBorder + "; text-align: center; background-color: " + headColor + ";'>y/x</td>";
                    for (var j = 0; j < size; j++)
                    {
                        var newHead = headerRow.insertCell();
                        newHead.id = "x1_" + j;
                        newHead.name = "x1_" + j;
                        newHead.style.width = cellWidth;
                        newHead.style.height = cellHeight;
                        newHead.style.backgroundColor = headColor;
                        newHead.style.border = cellBorder;
                        newHead.style.textAlign = "center";
                        newHead.innerHTML = "<b>" + (j + 1) + "</b>";
                    }
                    var body = table.createTBody();
                    for (var i = 0; i < size; i++)
                    {
                        var newRow = body.insertRow();
                        newRow.innerHTML = "<th style='width: " + cellWidth + "; height: " + cellHeight + "; border: " + cellBorder + "; text-align: center; background-color: " + headColor + ";'>" + (i + 1) + "</th>";
                        for (var j = 0; j < size; j++)
                        {
                            var cell = newRow.insertCell();
                            cell.id = "cell1p_" + i + "_" + j;
                            cell.name = "cell1p_" + i + "_" + j;
                            cell.style.width = cellWidth;
                            cell.style.height = cellHeight;
                            cell.style.backgroundColor = cellColor;
                            cell.style.border = cellBorder;
                            cell.style.backgroundSize = 'cover';
                            cell.style.textAlign = "center";
                            cell.onclick = click1P;
                        }
                    }
                    myField.appendChild(table);
                }
                function initialize2PField()
                {
                    var opponentField = document.getElementById('opponentField');
                    var table = document.createElement('table');
                    var header = table.createTHead();
                    var headerRow = header.insertRow();
                    headerRow.innerHTML = "<td style='width: " + cellWidth + "; height: " + cellHeight + "; border: " + cellBorder + "; text-align: center; background-color: " + headColor + ";'>y/x</td>";
                    for (var j = 0; j < size; j++)
                    {
                        var newHead = headerRow.insertCell();
                        newHead.id = "x2_" + j;
                        newHead.name = "x2_" + j;
                        newHead.style.width = cellWidth;
                        newHead.style.height = cellHeight;
                        newHead.style.backgroundColor = headColor;
                        newHead.style.border = cellBorder;
                        newHead.style.textAlign = "center";
                        newHead.innerHTML = "<b>" + (j + 1) + "</b>";
                    }
                    var body = table.createTBody();
                    for (var i = 0; i < size; i++)
                    {
                        var newRow = body.insertRow();
                        newRow.innerHTML = "<th style='width: " + cellWidth + "; height: " + cellHeight + "; border: " + cellBorder + "; text-align: center; background-color: " + headColor + ";'>" + (i + 1) + "</th>";
                        for (var j = 0; j < size; j++)
                        {
                            var cell = newRow.insertCell();
                            cell.id = "cell2p_" + i + "_" + j;
                            cell.name = "cell2p_" + i + "_" + j;
                            cell.style.width = cellWidth;
                            cell.style.height = cellHeight;
                            cell.style.backgroundColor = cellColor;
                            cell.style.border = cellBorder;
                            cell.style.backgroundSize = 'cover';
                            cell.onclick = click2P;
                        }
                    }
                    opponentField.appendChild(table);
                }
                function click1P() {
                    if ($scope.gameStatus === 'Ready') {
                        if ($scope.game.user2_name === $cookieStore.get('username')) {
                            i = this.id.split('_')[1];
                            j = this.id.split('_')[2];
                            $http({
                                method: 'GET',
                                url: 'http://seebattle/See-Battle/server/laravel/public/move',
                                params: {
                                    row: i, column: j, walked: 'player2', gameId: $scope.game.id
                                }
                            })
                                    .success(function (data) {
                                        if (data === 'Hit') {
                                            document.getElementById('cell1p_' + i + '_' + j).style.backgroundColor = hitColor;
                                        }
                                        if (data === 'Missed') {
                                            document.getElementById('cell1p_' + i + '_' + j).style.backgroundColor = missedColor;
                                        }
                                        if (data === 'You win') {
                                            $('.winGame-modal').modal('show');
                                        }
                                    })
                                    .error(function () {
                                    });
                        }
                    }
                    if ($scope.gameStatus === 'Started') {
                        if ($scope.game.user1_name === $cookieStore.get('username')) {
                            i = this.id.split('_')[1];
                            j = this.id.split('_')[2];
                            $http({
                                method: 'GET',
                                url: 'http://seebattle/See-Battle/server/laravel/public/confirmcell',
                                params: {
                                    row: i, column: j, player: 'player1', gameId: $scope.game.id
                                }
                            })
                                    .success(function (data) {
                                        if (data === '0') {
                                            document.getElementById('cell1p_' + i + '_' + j).style.backgroundColor = cellColor;
                                        }
                                        if (data === '1') {
                                            document.getElementById('cell1p_' + i + '_' + j).style.backgroundColor = fillCellColor;
                                        }
                                    })
                                    .error(function () {
                                    });
                        }
                    }
                }
                function click2P() {
                    if ($scope.gameStatus === 'Ready') {
                        if ($scope.game.user1_name === $cookieStore.get('username')) {
                            i = this.id.split('_')[1];
                            j = this.id.split('_')[2];
                            $http({
                                method: 'GET',
                                url: 'http://seebattle/See-Battle/server/laravel/public/move',
                                params: {
                                    row: i, column: j, walked: 'player1', gameId: $scope.game.id
                                }
                            })
                                    .success(function (data) {
                                        if (data === 'Hit') {
                                            document.getElementById('cell2p_' + i + '_' + j).style.backgroundColor = hitColor;
                                        }
                                        if (data === 'Missed') {
                                            document.getElementById('cell2p_' + i + '_' + j).style.backgroundColor = missedColor;
                                        }
                                        if (data === 'You win') {
                                            $('.winGame-modal').modal('show');
                                        }
                                    })
                                    .error(function () {
                                    });
                        }
                    }
                    if ($scope.gameStatus === 'Started') {
                        if ($scope.game.user2_name === $cookieStore.get('username')) {
                            i = this.id.split('_')[1];
                            j = this.id.split('_')[2];
                            $http({
                                method: 'GET',
                                url: 'http://seebattle/See-Battle/server/laravel/public/confirmcell',
                                params: {
                                    row: i, column: j, player: 'player2', gameId: $scope.game.id
                                }
                            })
                                    .success(function (data) {
                                        if (data === '0') {
                                            document.getElementById('cell2p_' + i + '_' + j).style.backgroundColor = cellColor;
                                        }
                                        if (data === '1') {
                                            document.getElementById('cell2p_' + i + '_' + j).style.backgroundColor = fillCellColor;
                                        }
                                    })
                                    .error(function () {
                                    });
                        }
                    }
                }
            }]);

