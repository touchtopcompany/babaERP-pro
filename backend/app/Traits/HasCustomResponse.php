<?php

namespace App\Traits;

use App\Models\Log;
use Illuminate\Support\Str;

trait HasCustomResponse
{
    public function sendSuccess($data, $message = "Request was successful", $code = 200)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], $code);
    }

    public function sendError($message = "An error occurred", $code = 400, $errors = [])
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors
        ], $code);
    }

    protected function logActivity(string $action, $model = null, ?string $description = null): void
    {
        $requestUser = request()->user();
        $userId = null;
        
        if ($model instanceof \App\Models\User) {
            $userId = $model->id;
        } elseif ($requestUser) {
            $userId = $requestUser->id;
        }
        
        Log::create([
            'id' => Str::uuid(),
            'user_id' => $userId,
            'action' => $action,
            'description' => $description,
            'model_type' => $model ? get_class($model) : null,
            'model_id' => $model?->id,
            'ip_address' => request()->ip(),
        ]);
    }
}
