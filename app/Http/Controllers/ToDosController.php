<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ToDo;
use DB;

class ToDosController extends Controller
{
    function index(){
        //$todos = ToDo::all();
        $todos = DB::table('to_dos') -> paginate(10);
        return response()->json($todos);
        
    }

    function store(Request $request){
        $this->validate($request, [
            'title' => 'required|max:255',
            'description' => 'required|max:255',
        ]);
        $todo = new ToDo();
        $todo->title = $request->title;
        $todo->description = $request->description;
        $todo->save();
        return response()->json();
    }

    function show(Request $request, $id){
        $todo = ToDo::find($id);
        return response()->json($todo);
        
    }

    function update(Request $request, $id){
        $this->validate($request, [
            'title' => 'required|max:255',
            'description' => 'required|max:255',
        ]);
        $todo = ToDo::find($id);
        $todo->title = $request->title;
        $todo->description = $request->description;
        $todo->save();
        return response()->json();
    }

    function destroy(Request $request, $id){
        $todo = ToDo::find($id);
        $todo->delete();
        return response()->json();
    }

    function login(Request $request){
        $this->middleware('auth')->except(['index', 'show']);
    }

}