<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGamesTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('games', function($table) {
            $table->increments('id');
            $table->integer('user1_id')->unsigned()->nullable();
            $table->integer('user2_id')->unsigned()->nullable();
            $table->string('user1_name', 50);
            $table->string('user2_name', 50);
            $table->boolean('user1_ready')->default(false);
            $table->boolean('user2_ready')->default(false);
            $table->enum('whose_turn', array('player1', 'player2'))->default('player1');
            $table->timestamps();
            $table->engine = 'InnoDB';
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::drop('games');
    }

}
