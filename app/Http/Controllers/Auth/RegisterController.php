<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function create(Request $request) {
        $request->validate([
            'username' => 'required|unique:users|max:255',
            'score' => 'required|integer|max:999999',
        ]);
        $user = new User();
        $user->username = $request->username;
        $user->score = $request->score;
        $user->save();
    }
}
