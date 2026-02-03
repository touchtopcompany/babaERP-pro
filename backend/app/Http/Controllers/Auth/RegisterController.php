<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

/**
 * @group Authentication
 */
class RegisterController extends Controller
{
    /**
     * @bodyParam name string required User's full name. Example: John Doe
     * @bodyParam email string required User's email address. Example: user@example.com
     * @bodyParam phone string optional User's phone number. Example: +255123456789
     * @bodyParam password string required User password. Example: password123
     * @bodyParam password_confirmation string required Password confirmation. Example: password123
     * @response 201 {"success":true,"message":"Registration successful","data":{"user":{"id":1,"name":"John Doe","email":"user@example.com"},"token":"1|xxxxxxxxxxxx"}}
     * @response 422 {"success":false,"message":"The given data was invalid.","errors":{"email":["The email has already been taken."]}}
     */
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'password' => Hash::make($request->input('password')),
        ]);

        $token = $user->createToken('auth-token')->plainTextToken;

        $this->logActivity('registration', $user, "User registered successfully");

        return $this->sendSuccess([
            'user' => $user,
            'token' => $token,
        ], 'Registration successful', 201);
    }
}

