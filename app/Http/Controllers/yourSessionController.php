<?php

namespace App\Http\Controllers;



class YourSessionController extends Controller
{
    public function logout()
    {
        auth()->logout();

        session()->flash('message', 'Some goodbye message');

        return redirect('/login');
    }
}
