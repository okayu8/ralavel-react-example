<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/', function () {
    return view('welcome');
});

Route::resource('users', 'UserController');

Route::get('logout', 'YourSessionController@logout');

//ReactRooterがあるためapi.phpへの移行ができない
Route::prefix('api')->group(function () {
    Route::resource('todos', 'ToDosController', ['only' => ['index', 'store', 'show', 'update', 'destroy']]);
    Route::resource('done', 'DoneController', ['only' => ['index', 'show', 'update', 'destroy']]);
    Route::resource('date', 'DateController', ['only' => ['index']]);
    Route::resource('isLogin', 'CheckController', ['only' => ['index']]);
});
Route::post('/api/todos/sort', 'ToDosController@sort');


Route::get('/', 'HomeController@index')->name('home');

Route::get('/{any?}', function () {
    return view('welcome');
})->where('any', '.*');
