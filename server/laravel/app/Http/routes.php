<?php
Route::get('registration', 'RegistrationController@register');
Route::get('authorization', 'AuthorizationController@authorization');
Route::get('logout', 'AuthorizationController@logout');
