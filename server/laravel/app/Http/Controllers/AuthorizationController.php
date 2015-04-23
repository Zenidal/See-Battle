<?php

namespace App\Http\Controllers;

use App\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class AuthorizationController extends Controller {

    /**
     * @param  Request  $request
     * @return Response
     */
    public function authorization(Request $request) {
        $result = User::authorize(['username' => $request->input('username'), 'password' => $request->input('password')]);
        if ($result) {
            return Auth::user();
        } else {
            return response('Incorrect combination of user/password', 400);
        }
    }

    public function logout() {
        if (Auth::check()) {
            User::logout();
            return response('User logged out', 200);
        } else {
            return response(401);
        }
    }

}
