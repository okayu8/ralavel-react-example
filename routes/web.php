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

Route::get('/', function () {
    return view('welcome');
});

Route::resource('users', 'UserController');

Route::get('logout', 'yourSessionController@logout');

Route::prefix('api')->group(function () {
    Route::resource('todos', 'ToDosController', ['only' => ['index', 'store', 'show', 'update', 'destroy', 'login']]);
    Route::resource('done', 'DoneController', ['only' => ['index', 'show', 'update', 'destroy', 'login']]);
    Route::resource('date', 'DateController', ['only' => ['index']]);
});

Auth::routes();

Route::get('/', 'HomeController@index')->name('home');

Route::get('/{any?}', function () {
    return view('welcome');
})->where('any', '.*');
