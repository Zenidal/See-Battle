<?php

use Illuminate\Database\Migrations\Migration;

class CreateStatistiksTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('statistics', function($table) {
            $table->increments('id');
            $table->integer('wins')->unsigned()->default('0');
            $table->integer('defeats')->unsigned()->default('0');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
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
        Schema::drop('statistics');
    }

}
