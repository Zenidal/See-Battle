<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Readygame extends Model {

    public function game() {
        return $this->belongsTo('App\Game');
    }

    public static function create_ready_game($game_id) {
        for ($i = 0; $i < 10; $i++) {
            for ($j = 0; $j < 10; $j++) {
                $p1_cell = new Readygame();
                $p1_cell->game_id = $game_id;
                $p1_cell->accessory = 'player1';
                $p1_cell->row = $i;
                $p1_cell->column = $j;
                $p1_cell->value = "0";
                $p1_cell->save();

                $p2_cell = new Readygame();
                $p2_cell->game_id = $game_id;
                $p2_cell->accessory = 'player2';
                $p2_cell->row = $i;
                $p2_cell->column = $j;
                $p2_cell->value = "0";
                $p2_cell->save();
            }
        }
    }

    public static function confirm($i, $j, $player, $game_id) {
        $game = Game::find($game_id);
        $cells = $game->ready_games();
        $cell = $cells->where('row', '=', $i)->where('column', '=', $j)->where('accessory', '=', $player)->first();
        if ($cell->value === '0') {
            $cell->value = '1';
            $cell->save();
            return 1;
        }
        if ($cell->value === '1') {
            $cell->value = '0';
            $cell->save();
            return 0;
        }
    }

}
