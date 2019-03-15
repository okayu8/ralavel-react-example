<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ToDo;
use DB;
use Illuminate\Support\Facades\Auth;

class DoneController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    function index(){
        $user = Auth::user();
        //$todos = DB::table('to_dos')->where('state', 1)->where('user_id', $user->id)->paginate(10);
        $todos = DB::table('to_dos')->where('state', 1)->paginate(10);
        
        return response()->json($todos);
        
    }

    /* function store(Request $request){
        $this->validate($request, [
            'title' => 'required|max:255',
            'description' => 'required|max:255',
        ]);
        $todo = new ToDo();
        $todo->title = $request->title;
        $todo->description = $request->description;
        $todo->save();
        return response()->json();
    } */

    function show(Request $request, $id){
        $todo = ToDo::find($id);
        return response()->json($todo);
        
    }

    function update(Request $request, $id){
        $this->validate($request, [
            'state' => 'required|max:255',
        ]);
        $todo = ToDo::find($id);
        $todo->state = $request->state;
        $todo->save();
        return response()->json();
    }

    function destroy(Request $request, $id){
        $todo = ToDo::find($id);
        $todo->delete();
        return response()->json();
    }
}
