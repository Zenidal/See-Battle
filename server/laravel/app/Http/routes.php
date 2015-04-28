<?php

Route::get('registration', 'RegistrationController@register');
Route::get('authorization', 'AuthorizationController@authorization');
Route::get('logout', 'AuthorizationController@logout');
Route::get('creategame', 'GameController@create');
Route::get('acceptgame', 'GameController@accept');
Route::get('getstatusgame', 'GameController@get_status_game');
Route::get('confirmcell', 'GameController@confirm_cell');
Route::get('confirmfield', 'GameController@confirm_field');
Route::get('games', 'GameController@get');
Route::get('move', 'GameController@move');
Route::get('getfield', 'GameController@get_field');
Route::get('getstatistics', 'StatisticsController@get');
