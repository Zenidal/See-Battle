<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Readygame;
use App\User;

class Game extends Model {

    protected $fillable = ['game_id', 'user_id', 'user1id', 'user2id'];

    public function ready_games() {
        return $this->hasMany('App\ReadyGame');
    }

    public static function create_game($user) {
        $game_was_created = false;
        if ($user->game_id != NULL) {
            $game_was_created = true;
        }
        if (!$game_was_created) {
            $game = new Game();
            $game->user1_id = $user->id;
            $game->user1_name = $user->username;
            $game->save();
            $user->game_id = $game->id;
            $user->save();
            Readygame::create_ready_game($game->id);
            return true;
        } else {
            return false;
        }
    }

    public static function accept_game($user, $game_id) {
        if ($user->game_id == NULL) {
            $game = Game::find($game_id);
            if ($game->user2_id == NULL && $game->user1_id != $user->id) {
                $game->user2_id = $user->id;
                $game->user2_name = $user->username;
                $game->save();
                $user->game_id = $game_id;
                $user->save();
                return true;
            } else {
                return false;
            }
        } else {
            $existed_game = Game::find($user->game_id);
            if ($existed_game->user1_id != NULL && $existed_game->user2_id != NULL) {
                return false;
            }
            if ($existed_game->user1_id == $user->id && $existed_game->user2_id == NULL) {
                $game = Game::find($game_id);
                if ($game->user2_id == NULL && $game->user1_id != $user->id) {
                    $game->user2_id = $user->id;
                    $game->user2_name = $user->username;
                    $game->save();
                    $user->game_id = $game_id;
                    $user->save();
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
    
    public static function confirm($username){
        $user = User::where('username', '=', $username)->first();
        $game = Game::find($user->game_id);
        if($game->user1_name === $username){
            $game->user1_ready = true;
        }
        if($game->user2_name === $username){
            $game->user2_ready = true;
        }
        $game->save();
        return true;
    }

}
