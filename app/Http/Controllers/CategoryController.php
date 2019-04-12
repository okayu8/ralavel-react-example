<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    //Categoryの参照
    public function index()
    {
        $user = Auth::user();
        $categories = DB::table('category')->where('user_id', $user->id);

        return response()->json($categories);
    }

}
