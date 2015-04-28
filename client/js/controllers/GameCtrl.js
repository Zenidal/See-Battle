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
                $scope.ready = function () {
                    $http({
                        method: 'GET',
                        url: 'http://seebattle/See-Battle/server/laravel/public/confirmfield',
                        params: {
                            username: $cookieStore.get('username')
                        }
                    })
                            .success(function () {
                                $http.get('http://seebattle/See-Battle/server/laravel/public/gameisready')
                                        .success(function () {
                                            $scope.gameIsReady = true;
                                            $scope.whoseTurn = data.whose_turn;
                                            $scope.field = data.field;
                                            fillField();
                                        })
                                        .error(function () {
                                            $scope.gameIsReady = false;
                                        });
                            })
                            .error(function () {
                            });
                };

                function fillField() {
                    for (i = 0; i < $scope.field.length; i++) {
                        p = ($scope.field[i].accessory === 'player1') ? 1 : 2;
                        if ($scope.field[i].value === '0') {
                            document.getElementById('cell' + p + 'p_' + $scope.field[i].row + '_' + $scope.field[i].column).style.backgroundColor = cellColor;
                        }
                        if ($scope.field[i].value === '-1') {
                            document.getElementById('cell' + p + 'p_' + $scope.field[i].row + '_' + $scope.field[i].column).style.backgroundColor = hitColor;
                        }
                        if ($scope.field[i].value === '-2') {
                            document.getElementById('cell' + p + 'p_' + $scope.field[i].row + '_' + $scope.field[i].column).style.backgroundColor = missedColor;
                        }
                        if ($scope.field[i].value === '1') {
                            if ($scope.game.user2_name === $cookieStore.get('username')) {
                                document.getElementById('cell' + p + 'p_' + $scope.field[i].row + '_' + $scope.field[i].column).style.backgroundColor = missedColor;
                            }
                            else {
                                document.getElementById('cell' + p + 'p_' + $scope.field[i].row + '_' + $scope.field[i].column).style.backgroundColor = cellColor;
                            }
                        }
                    }
                }

                function gameTimer() {
                    setTimeout(function run() {
                        $http.get('http://seebattle/See-Battle/server/laravel/public/gameisstarted')
                                .success(function (data) {
                                    $scope.game = data;
                                    $scope.gameWasStarted = true;
                                })
                                .error(function () {
                                    setTimeout(run, 1000);
                                });
                    }, 1000);
                }
                function initField() {
                    $http.get('http://seebattle/See-Battle/server/laravel/public/gameisready')
                            .success(function (data) {
                                $scope.gameIsReady = true;
                                $scope.whoseTurn = data.whose_turn;
                                $scope.field = data.field;
                                fillField();
                            })
                            .error(function () {
                                $scope.gameIsReady = false;
                            });
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
                    if ($scope.gameIsReady) {
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
                    else {

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
                    $http.get('http://seebattle/See-Battle/server/laravel/public/gameisready')
                            .success(function (data) {
                                $scope.gameIsReady = true;
                                $scope.whoseTurn = data.whose_turn;
                                $scope.field = data.field;
                                fillField();
                            })
                            .error(function () {
                                $scope.gameIsReady = false;
                            });
                }
                function click2P() {
                    if ($scope.gameIsReady) {
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
                                        alert(data);
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
                    else {
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
                    $http.get('http://seebattle/See-Battle/server/laravel/public/gameisready')
                            .success(function (data) {
                                $scope.gameIsReady = true;
                                $scope.whoseTurn = data.whose_turn;
                                $scope.field = data.field;
                                fillField();
                            })
                            .error(function () {
                                $scope.gameIsReady = false;
                            });
                }
            }
        ]);