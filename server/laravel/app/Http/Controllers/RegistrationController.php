<?php namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Response;
class RegistrationController extends Controller
{    
    public function register()
    {
        if(isset($_GET['user_name']) && isset($_GET['user_password']))
        {
            $data = array(
                'user_name'=>$_GET['user_name'],
                'user_password'=>$_GET['user_password']
            );
            if(User::register($data))
            {
                return response('User added succesfully',200)->header('Content-Type', 'text');
            }
            else
            {
                return response('This user already exists.', 409)->header('Content-Type', 'text');
            }
        }
    }
}

