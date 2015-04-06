<?php

namespace App\Http\Controllers;

use App\User;

class RegistrationController extends Controller {

    private $errorMessage = "";

    public function register() {
        $args = array(
            'user_name' => array(
                'filter' => FILTER_SANITIZE_STRING
            ),
            'user_password' => array(
                'filter' => FILTER_SANITIZE_STRING
            )
        );
        $my_inputs = filter_input_array(INPUT_GET, $args);
        if (!is_null($my_inputs['user_name']) && !is_null($my_inputs['user_password'])) {
            if (strlen($my_inputs['user_name']) < 6 || strlen($my_inputs['user_name']) > 50) {
                $errorMessage = "Login length should be in the range from 6 to 50 symbols";
            }
            if (strlen($my_inputs['user_password']) < 6 || strlen($my_inputs['user_password']) > 50) {
                $errorMessage = "Password length should be in the range from 6 to 50 symbols";
            }
            if (empty($errorMessage)) {
                if (User::register($my_inputs)) {
                    return response('User added succesfully', 200)->header('Content-Type', 'text');
                } else {
                    return response('This user already exists.', 409)->header('Content-Type', 'text');
                }
            } else {                
                return response($errorMessage, 400)->header('Content-Type', 'text');
            }
        }
    }
}
