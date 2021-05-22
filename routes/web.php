<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\AdminAuthController;

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




Route::get('/', [UserController::class, 'index']);


Route::post('/logout', [AdminAuthController::class, 'logout']); 

Auth::routes(['register' => false,'register']);

Route::resource('users', UserController::class);

Route::group(['middleware' => ['auth']], function() {
    Route::resource('roles', RoleController::class);
});
