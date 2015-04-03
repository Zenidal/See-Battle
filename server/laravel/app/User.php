<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model {

    public static function register($data) {
        foreach (User::all() as $user) {
            if ($user->user_name == $data['user_name']) {
                return false;
            }
        }
        $user = new User;
        $user->user_name = $data['user_name'];
        $user->user_password = $data['user_password'];
        $user->save();
        return true;
    }

}
