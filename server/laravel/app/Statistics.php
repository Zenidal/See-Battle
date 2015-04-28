<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Statistics extends Model {

    public function user() {
        return $this->belongsTo('App\User');
    }

    
    
}
