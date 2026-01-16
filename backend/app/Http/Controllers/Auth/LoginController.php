<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

/**
 * @group Authentication
 */
class LoginController extends Controller
{
    /**
     * @bodyParam identifier string required Email or phone number. Example: user@example.com
     * @bodyParam password string required User password. Example: password123
     * @response 200 {"success":true,"message":"Login successful","data":{"user":{"id":1,"name":"John Doe","email":"user@example.com"},"token":"1|xxxxxxxxxxxx"}}
     * @response 422 {"success":false,"message":"The given data was invalid.","errors":{"identifier":["The provided credentials are incorrect."]}}
     */
    public function login(LoginRequest $request)
    {
        $identifier = $request->input('identifier');
        $password = $request->input('password');

        $user = User::where('email', $identifier)
            ->orWhere('username', $identifier)
            ->first();

        if (!$user || !Hash::check($password, $user->password)) {
            $this->logActivity('login_failed', null, "Failed login attempt for identifier: {$identifier}");
            throw ValidationException::withMessages([
                'identifier' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        $this->logActivity('login_success', $user, "User logged in successfully");

        return $this->sendSuccess([
            'user' => $user,
            'token' => $token,
        ], 'Login successful');
    }

    /**
     * @authenticated
     * @response 200 {"success":true,"message":"Logout successful","data":[]}
     * @response 401 {"success":false,"message":"Unauthenticated.","errors":[]}
     */
    public function logout()
    {
        $user = request()->user();
        
        if ($user) {
            $user->currentAccessToken()->delete();
            $this->logActivity('logout', $user, 'User logged out successfully');
        }

        return $this->sendSuccess([], 'Logout successful');
    }
}
