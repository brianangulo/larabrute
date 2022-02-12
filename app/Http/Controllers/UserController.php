<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request, $username = null): JsonResponse
    {
        if ($username !== null) {
            $user = User::where('username', $username)->first();
            return JsonResponse::fromJsonString(json_encode($user));    
        }
        $users = User::orderByRaw('CONVERT(score, SIGNED) desc')->get();
        return JsonResponse::fromJsonString(json_encode($users));
    }
}
