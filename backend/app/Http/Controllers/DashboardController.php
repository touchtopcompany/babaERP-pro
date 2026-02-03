<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * @group Dashboard
 */
class DashboardController extends Controller
{
    /**
     * Get dashboard metrics
     * 
     * @authenticated
     * @response 200 {"success":true,"data":{"totalSales":0,"net":0,"invoiceDue":0,"totalSellReturn":0,"totalSellReturnPaid":0,"totalPurchase":0,"purchaseDue":0,"totalPurchaseReturn":0,"totalPurchaseReturnPaid":0,"expense":0}}
     */
    public function metrics(Request $request)
    {
        $user = $request->user();
        
        // For now, return default values
        // TODO: Implement actual calculations based on transactions
        $metrics = [
            'totalSales' => 0.00,
            'net' => 0.00,
            'invoiceDue' => 0.00,
            'totalSellReturn' => 0.00,
            'totalSellReturnPaid' => 0.00,
            'totalPurchase' => 0.00,
            'purchaseDue' => 0.00,
            'totalPurchaseReturn' => 0.00,
            'totalPurchaseReturnPaid' => 0.00,
            'expense' => 0.00,
        ];

        return $this->sendSuccess($metrics, 'Dashboard metrics retrieved successfully');
    }

    /**
     * Get sales data for the last 30 days
     * 
     * @authenticated
     * @response 200 {"success":true,"data":[{"date":"2025-12-01","value":0,"business":"C2Z Digital Solutions (C2Z1)"}]}
     */
    public function sales(Request $request)
    {
        $user = $request->user();
        
        // Generate last 30 days of data
        $salesData = [];
        $today = now();
        
        for ($i = 29; $i >= 0; $i--) {
            $date = $today->copy()->subDays($i);
            $salesData[] = [
                'date' => $date->format('Y-m-d'),
                'value' => 0, // TODO: Implement actual sales calculation
                'business' => 'C2Z Digital Solutions (C2Z1)',
            ];
        }

        return $this->sendSuccess($salesData, 'Sales data retrieved successfully');
    }
}

