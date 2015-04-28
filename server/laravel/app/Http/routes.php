<?php

Route::get('registration', 'RegistrationController@register');
Route::get('authorization', 'AuthorizationController@authorization');
Route::get('logout', 'AuthorizationController@logout');
Route::get('creategame', 'GameController@create');
Route::get('acceptgame', 'GameController@accept');
Route::get('gameisstarted', 'GameController@game_is_started');
Route::get('gameisready', 'GameController@game_is_ready');
Route::get('confirmcell', 'GameController@confirm_cell');
Route::get('confirmfield', 'GameController@confirm_field');
Route::get('games', 'GameController@get');
Route::get('move', 'GameController@move');
