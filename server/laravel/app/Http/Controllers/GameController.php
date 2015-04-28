<?php

namespace App\Http\Controllers;

use App\Game;
use App\User;
use App\Readygame;
use Auth;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;

class GameController extends Controller {

    public function create() {
        if (Auth::check()) {
            $game = Game::create_game(Auth::user());
            if ($game) {
                return response('The game was created.', 200);
            } else {
                return response('The game already exists.', 400);
            }
        } else {
            return response('You must login', 401);
        }
    }

    /**
     * @param  Request  $request
     * @return Response
     */
    public function accept(Request $request) {
        if (Auth::check()) {
            $game = Game::accept_game(Auth::user(), $request->input('game_id'));
            if ($game) {
                return response('The game was accepted.', 200);
            } else {
                return response('The game can not be accepted.', 400);
            }
        } else {
            return response('You must login', 401);
        }
    }

    public function game_is_started() {
        if (Auth::check()) {
            $game = Game::my_game_is_started(Auth::user());
            if (!$game) {
                return response('No active play.', 400);
            } else {
                return response($game, 200);
            }
        } else {
            return response('You must login', 401);
        }
    }

    public function game_is_ready() {
        if (Auth::check()) {
            $game = Game::my_game_is_ready(Auth::user());
            if (!$game) {
                return response('Game is not ready.', 400);
            } else {
                $whose_turn = GameController::whose_turn($game->id);
                $field = GameController::get_field($game->id);
                return response(['whose_turn' => $whose_turn,
                    'field' => $field], 200);
            }
        } else {
            return response('You must login', 401);
        }
    }

    /**
     * @param  Request  $request
     * @return Response
     */
    public function confirm_cell(Request $request) {
        if (Auth::check()) {
            $result = Readygame::confirm($request->input('row'), $request->input('column'), $request->input('player'), $request->input('gameId'));
            return response($result, 200);
        } else {
            return response('You must login', 401);
        }
    }

    /**
     * @param  Request  $request
     * @return Response
     */
    public function confirm_field(Request $request) {
        if (Auth::check()) {
            $result = Game::confirm($request->input('username'));
            if ($result) {
                return response(200);
            } else {
                return response(400);
            }
        } else {
            return response('You must login', 401);
        }
    }

    public function get() {
        $games = Game::all();
        return response($games, 200);
    }

    public static function get_field($game_id) {
        $game = Game::find($game_id);
        return $game->ready_games()->get();
    }

    /**
     * @param  Request  $request
     * @return Response
     */
    public function move(Request $request) {
        if (Auth::check()) {
            $game_id = $request->input('gameId');
            $walked = $request->input('walked');
            if ($walked === 'player1') {
                $player = 'player1';
                $opponent = 'player2';
            } else {
                $player = 'player2';
                $opponent = 'player1';
            }
            $game = Game::find($game_id);
            if ($walked === $game->whose_turn) {
                $cell_value = $game->ready_games()->where('row', '=', $request->input('row'))->where('column', '=', $request->input('column'))->where('accessory', '=', $opponent)->first();
                if ($cell_value->value === '1') {
                    $cell_value->value = '-1';
                    $cell_value->save();
                    if (GameController::check_for_ending($game_id, $opponent)) {
                        GameController::end_the_game($game_id, $player);
                        return response('You win', 200);
                    } else {
                        if ($game->whose_turn === 'player1') {
                            $game->whose_turn = 'player2';
                            $game->save();
                        } else if ($game->whose_turn === 'player2') {
                            $game->whose_turn = 'player1';
                            $game->save();
                        }
                        return response('Hit', 200);
                    }
                }
                if ($cell_value->value === '0') {
                    $cell_value->value = '-2';
                    $cell_value->save();
                    if ($game->whose_turn === 'player1') {
                        $game->whose_turn = 'player2';
                        $game->save();
                    } else if ($game->whose_turn === 'player2') {
                        $game->whose_turn = 'player1';
                        $game->save();
                    }
                    return response('Missed', 200);
                }
                if ($cell_value->value === '-1') {
                    return response('Reiteration', 200);
                }
                if ($cell_value->value === '-2') {
                    return response('Reiteration', 200);
                }
            } else {
                return response(400);
            }
        } else {
            return response('You must login', 401);
        }
    }

    public static function check_for_ending($game_id, $opponent) {
        $game = Game::find($game_id);
        for ($i = 0; $i < 10; $i++) {
            for ($j = 0; $j < 10; $j++) {
                $cell = $game->ready_games()
                                ->where('accessory', '=', $opponent)
                                ->where('row', '=', $i)
                                ->where('column', '=', $j)->first();
                if ($cell->value === '1') {
                    return false;
                }
            }
        }
        return true;
    }

    public static function end_the_game($game_id, $player) {
        $game = Game::find($game_id);
        if ($player === 'player1') {
            $winner = $game->user1_id;
            $loser = $game->user2_id;
        }
        if ($player === 'player2') {
            $winner = $game->user2_id;
            $loser = $game->user1_id;
        }
        $winner->statistics()->wins += 1;
        $winner->game_id = NULL;
        $loser->statistics()->defeats += 1;
        $loser->game_id = NULL;
        $winner->save();
        $loser->save();
        $game->ready_games()->delete();
        $game->delete();
    }

    public static function whose_turn($game_id) {
        $game = Game::find($game_id);
        if ($game->whose_turn === 'player1') {
            $user = User::find($game->user1_id);
        }
        if ($game->whose_turn === 'player2') {
            $user = User::find($game->user2_id);
        }
        return $user->username;
    }

}
