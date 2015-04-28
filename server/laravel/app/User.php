<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Role;
use App\Statistics;
use Illuminate\Contracts\Auth\Authenticatable;
use Auth;

class User extends Model implements Authenticatable {

    protected $fillable = ['username', 'password', 'role_id'];

    public function statistics(){
        return $this->hasOne('App\Statistics');
    }
    
    public function role() {
        return $this->belongsTo('App\Role');
    }

    public static function create_user($username, $password) {
        $statistics = new Statistics();
        $role_id = Role::where('name', '=', 'user')->first()->id;
        $user = User::create([
                    'username' => $username,
                    'password' => $password,
                    'role_id' => $role_id
        ]);
        $statistics->user_id = $user->id;
        $statistics->save();
        return $user;
    }

    public static function authorize($data) {
        if (Auth::viaRemember()) {
            return 'The user is already logged in.';
        }
        $credentials = array('username' => $data['username'], 'password' => $data['password']);
        return Auth::attempt($credentials, true);
    }

    public static function logout() {
        Auth::logout();
        return 'Logged out succesfully';
    }

    /**
     * Get the unique identifier for the user
     *
     * @return mixed
     */
    public function getAuthIdentifier() {
        return $this->getKey();
    }

    /**
     * Get the password for the user
     *
     * @return string
     */
    public function getAuthPassword() {
        return $this->password;
    }

    /**
     * Get the e-mail address where password reminders are sent
     *
     * @return string
     */
    public function getReminderEmail() {
        return $this->UserEmail;
    }

    /**
     * Get the remember token for the user
     *
     * @return string
     */
    public function getRememberToken() {
        return $this->remember_token;
    }

    /**
     * Get the remember token name used by the model
     *
     * @return string
     */
    public function getRememberTokenName() {

        return 'remember_token';
    }

    /**
     * Set the remember token for the user
     *
     * @var string
     */
    public function setRememberToken($value) {
        $this->remember_token = $value;
    }

    /**
     * Password need to be all time encrypted.
     *
     * @param string $password
     */
    public function setPasswordAttribute($password) {
        $this->attributes['password'] = bcrypt($password);
    }

}
