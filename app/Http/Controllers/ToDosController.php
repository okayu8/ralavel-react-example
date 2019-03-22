<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ToDo;
use App\User;
use DB;
use Illuminate\Support\Facades\Auth;

class ToDosController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    //TodoListの参照
    public function index()
    {
        //Todoを10件に分割して取得
        //$todos = ToDo::all();
        $user = Auth::user();
        $todos = DB::table('to_dos')->where('state', 0)->where('user_id', $user->id)->paginate(10);

        return response()->json($todos);
    }

    public function sort(Request $request)
    {
        $mode = $request->sortMode;
        try{
            if($mode == 'nearLimit'){
                $todos = DB::table('to_dos')
                    ->orderBy('date_time', 'asc')
                    ->get();
                $iterator = 0;
                foreach($todos as $t){
                    if($t->date_time === '0000-00-00 00:00:00'){
                        $t->sort_id = 9999;
                    }
                    $t->date_time = $iterator;
                    $iterator++;
                    $t->save();
                }

            }elseif($mode == 'farLimit'){

            }else{
                $todos = ToDo::all();

                foreach($todos as $t){
                    $t->sort_id = $t->id;
                    $t->save();
                }
                
            }
        }catch(Exception $e){
            return response()->json('server error '.$e);
        }
        return response()->json();
    }

    //Todoの作成
    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|max:255'
        ]);
        $todo = new ToDo();
        $user = Auth::user();
        $todo->title = $request->title;
        $todo->description = $request->description ? $request->description : "";       
        $todo->date_time = $request->limit ? $request->limit : date("Y/m/d H:i:s");
        $todo->user_id = $user->id;
        $todo->save();

        return response()->json();
    }

    //Todoの参照
    public function show(Request $request, $id)
    {
        $user = Auth::user();
        $todo = ToDo::find($id);
        //TODO:ユーザーのTodoのみ表示できるようにする必要あり
        //$todo = DB::table('to_dos')->where('state', 0)->where('user_id', $user->id)->where('id', $id);

        return response()->json($todo);
    }

    //Todoの更新
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'title' => 'required|max:255',
            'description' => 'max:255',
            'time' => 'max:255',
            'limit' => 'max:255',
        ]);
        $todo = ToDo::find($id);
        $todo->title = $request->title;
        $todo->description = $request->description;
        $todo->time = $request->time;
        $todo->date_time = $request->limit ? $request->limit : date("Y/m/d H:i:s");
        $todo->save();

        return response()->json();
    }

    //Todoの削除
    public function destroy(Request $request, $id)
    {
        $todo = ToDo::find($id);
        $todo->delete();

        return response()->json();
    }
}
