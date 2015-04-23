<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Contracts\Auth\Registrar as RegistrarContract;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Validator;

class RegistrationController extends Controller implements RegistrarContract {

    use AuthenticatesAndRegistersUsers;

    /**
     * @param  Request  $request
     * @return Response
     */
    public function register(Request $request) {
        $data = $request->all();
        $validation_result = $this->validator($data);
        if ($validation_result->fails()) {
            $error_message = implode($validation_result->messages()->all());
            return response($error_message, 400);
        } else {
            $this->create($data);
            return response('User added succesfully', 200);
        }
    }

    public function create(array $data) {
        User::create_user($data['username'], $data['password']);
    }

    public function validator(array $data) {
        return Validator::make($data, [
                    'username' => 'required|min:6|max:50|unique:users,username',
                    'password' => 'required|min:6|max:50'
        ]);
    }

}
