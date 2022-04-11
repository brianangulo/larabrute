<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request, $username = null)
    {
        if ($username !== null) {
            return User::where('username', $username)->first();
        }
        return User::orderByRaw('CONVERT(score, SIGNED) desc')->get();
    }
}
