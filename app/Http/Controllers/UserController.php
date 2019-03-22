<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use JWTAuth;
use JWTAuthException;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index(Request $request) {
        $user = Auth::user();   #ログインユーザー情報を取得します。
        return response()->json($user);
    }

    public function sortMode(Request $request){
        $user = Auth::user();
        $user->sort_mode = $request->sortMode;
        $user->save();
    }
}

