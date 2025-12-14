<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Models\Otp;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

/**
 * @group Authentication
 */
class ResetPasswordController extends Controller
{
    /**
     * @bodyParam identifier string required Email or phone number. Example: user@example.com
     * @bodyParam code string required 6-digit OTP code. Example: 123456
     * @bodyParam password string required New password. Example: newpassword123
     * @bodyParam password_confirmation string required Password confirmation. Example: newpassword123
     * @bodyParam type string required OTP type (email or phone). Example: email
     * @response 200 {"success":true,"message":"Password reset successful","data":{"message":"Password has been reset successfully."}}
     * @response 400 {"success":false,"message":"Invalid OTP code.","errors":[]}
     * @response 400 {"success":false,"message":"OTP code has expired.","errors":[]}
     * @response 404 {"success":false,"message":"User not found with the provided identifier.","errors":[]}
     */
    public function reset(ResetPasswordRequest $request)
    {
        $identifier = $request->input('identifier');
        $code = $request->input('code');
        $password = $request->input('password');
        $type = $request->input('type');

        $otp = Otp::where('identifier', $identifier)
            ->where('code', $code)
            ->where('type', $type)
            ->where('used', false)
            ->first();

        if (!$otp) {
            return $this->sendError('Invalid OTP code.', 400);
        }

        if (!$otp->isValid()) {
            $otp->update(['used' => true]);
            return $this->sendError('OTP code has expired.', 400);
        }

        $user = User::where('email', $identifier)
            ->orWhere('phone', $identifier)
            ->first();

        if (!$user) {
            return $this->sendError('User not found with the provided identifier.', 404);
        }

        $user->password = Hash::make($password);
        $user->save();

        $otp->update(['used' => true]);

        $this->logActivity('password_reset', $user, "Password reset via {$type}: {$identifier}");

        return $this->sendSuccess([
            'message' => 'Password has been reset successfully.',
        ], 'Password reset successful');
    }
}
