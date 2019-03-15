<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;

class CheckController extends Controller
{
    function index()
    {
        if (Auth::check()) {
            return "true";
        }

        return "false";
    }
}
