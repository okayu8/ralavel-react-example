<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ToDo;
use DB;

class ToDosController extends Controller
{
    function index(){
        //$todos = ToDo::all() -> paginate(5);
        $todos = DB::table('to_dos') -> paginate(5);
        return response()->json($todos);
        /* $todoData = [];
        
        Todo::all()->chunk(5, function($todos) {
            $page = 0;
            foreach ($todos as $todo) {
                $todoData[$page] = $todo;
            }
            $page++;
        }); */

        /* DB::table('to_dos')->orderBy('id')->chunk(5, function($todos) {
            foreach ($todos as $todo) {
                $todoData[] = $todo;
            }
        }); */

        return response()->json($todoData);
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