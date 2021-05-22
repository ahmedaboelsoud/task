<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Auth;

use Illuminate\Http\Request;

class AdminAuthController extends Controller
{

   
    public function logout()
    {
        Auth::logout();
        return redirect('/login');
    }


}
