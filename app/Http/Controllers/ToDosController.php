<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ToDo;
use DB;

class ToDosController extends Controller
{
    //TodoListの参照
    public function index()
    {
        //Todoを10件に分割して取得
        //$todos = ToDo::all();
        $todos = DB::table('to_dos')->where('state', 0)->paginate(10);

        return response()->json($todos);
    }

    //Todoの作成
    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|max:255',
            'description' => 'required|max:255',
            'limit' => 'required|max:255',
        ]);
        $todo = new ToDo();
        $todo->title = $request->title;
        $todo->description = $request->description;       
        //TODO:期限の実装が完了したらコメントアウト
        //$todo->limit = $request->limit;
        $todo->limit = 0;
        $todo->save();

        return response()->json();
    }

    //Todoの参照
    public function show(Request $request, $id)
    {
        $todo = ToDo::find($id);

        return response()->json($todo);
    }

    //Todoの更新
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'title' => 'required|max:255',
            'description' => 'required|max:255',
            'time' => 'required|max:255',
            'limit' => 'required|max:255',
        ]);
        $todo = ToDo::find($id);
        $todo->title = $request->title;
        $todo->description = $request->description;
        $todo->time = $request->time;
        $todo->limit = $request->limit;
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

    //TODO:仮置きなので今後削除する。ログインの処理。
    public function login(Request $request)
    {
        $this->middleware('auth')->except(['index', 'show']);
    }
}
