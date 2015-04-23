<?php

namespace App\Services;

use App\User;
use Validator;
use Illuminate\Contracts\Auth\Registrar as RegistrarContract;

class Registrar implements RegistrarContract {

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function validator(array $data) {
        return Validator::make($data, [
                    'user_name' => 'required|min:6|max:50',
                    'user_password' => 'required|min:6|max:50',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    public function create(array $data) {
        $role = Role::firstOrCreate(['role_name' => 'user']);
        $user = new User;
        $user->username = $data['user_name'];
        $user->password = $data['user_password'];
        $role->users()->save($user);
        return $user;
    }

}
