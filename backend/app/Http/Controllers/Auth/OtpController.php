<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SendOtpRequest;
use App\Http\Requests\Auth\VerifyOtpRequest;
use App\Models\Otp;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

/**
 * @group Authentication
 */
class OtpController extends Controller
{
    /**
     * @bodyParam identifier string required Email or phone number. Example: user@example.com
     * @bodyParam type string required OTP type (email or phone). Example: email
     * @response 200 {"success":true,"message":"OTP sent successfully","data":{"identifier":"user@example.com","type":"email","expires_at":"2025-12-05T21:20:00+00:00"}}
     * @response 404 {"success":false,"message":"User not found with the provided identifier.","errors":[]}
     */
    public function send(SendOtpRequest $request)
    {
        $identifier = $request->input('identifier');
        $type = $request->input('type');

        $user = User::where('email', $identifier)
            ->orWhere('phone', $identifier)
            ->first();

        if (!$user) {
            return $this->sendError('User not found with the provided identifier.', 404);
        }

        Otp::where('identifier', $identifier)
            ->where('type', $type)
            ->where('used', false)
            ->update(['used' => true]);

        $code = str_pad((string) rand(100000, 999999), 6, '0', STR_PAD_LEFT);
        $expiresAt = now()->addMinutes(10);

        Otp::create([
            'identifier' => $identifier,
            'code' => $code,
            'type' => $type,
            'expires_at' => $expiresAt,
            'used' => false,
        ]);

        if ($type === 'email') {
            Mail::raw("Your OTP code is: {$code}. This code will expire in 10 minutes.", function ($message) use ($identifier) {
                $message->to($identifier)
                    ->subject('OTP Verification Code');
            });
        } else {
        }

        $this->logActivity('otp_sent', $user, "OTP sent to {$type}: {$identifier}");

        return $this->sendSuccess([
            'identifier' => $identifier,
            'type' => $type,
            'expires_at' => $expiresAt->toIso8601String(),
        ], 'OTP sent successfully');
    }

    /**
     * @bodyParam identifier string required Email or phone number. Example: user@example.com
     * @bodyParam code string required 6-digit OTP code. Example: 123456
     * @bodyParam type string required OTP type (email or phone). Example: email
     * @response 200 {"success":true,"message":"OTP verified successfully","data":{"verified":true,"identifier":"user@example.com"}}
     * @response 400 {"success":false,"message":"Invalid OTP code.","errors":[]}
     * @response 400 {"success":false,"message":"OTP code has expired.","errors":[]}
     */
    public function verify(VerifyOtpRequest $request)
    {
        $identifier = $request->input('identifier');
        $code = $request->input('code');
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

        if ($user) {
            $this->logActivity('otp_verified', $user, "OTP verified for {$type}: {$identifier}");
        }

        $otp->update(['used' => true]);

        return $this->sendSuccess([
            'verified' => true,
            'identifier' => $identifier,
        ], 'OTP verified successfully');
    }
}
