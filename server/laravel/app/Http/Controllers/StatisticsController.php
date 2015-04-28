<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Auth;

class StatisticsController extends Controller {
    /**
     * @param  Request  $request
     * @return Response
     */
    public function get() {
        if (Auth::check()) {
            $statistics = Auth::user()->statistics()->first();
            $wins = $statistics->wins;
            $defeats = $statistics->defeats;
            return response(['wins' => $wins,
                'defeats' => $defeats
                ], 200);
        } else {
            return response('You must login', 401);
        }
    }
}
