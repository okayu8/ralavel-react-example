<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;

class DateController extends Controller
{
    function index(){
        date_default_timezone_set('Asia/Tokyo');
        $date = Carbon::today()->toDateString();;
        //$date = "test";
        return response()->json($date);
    }
}
