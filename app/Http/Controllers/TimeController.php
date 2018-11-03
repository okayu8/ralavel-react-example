<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TimeController extends Controller
{
    function index(){
        $date =　date("Y/m/d");
        return response()->json($date);
    }
}
