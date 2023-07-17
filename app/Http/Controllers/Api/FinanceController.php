<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class FinanceController extends Controller
{
    public function resolveCardBIN(string $bin): JsonResponse
    {
        $response = Http::withHeaders([
            'Authorization' => sprintf("Bearer %s", env('PAYSTACK_SECRET_KEY')),
        ])->get("https://api.paystack.co/decision/bin/$bin");

        $json = $response->json();

        if ($json['status']) {
            return response()->json([
                'data' => $json['data'],
            ]);
        } else {
            return response()->json([
                'error' => $json['message'],
            ], 400);
        }
    }

    public function verifyAccountNumber(string $number, string $code): JsonResponse
    {
        $response = Http::withHeaders([
            'Authorization' => sprintf("Bearer %s", env('PAYSTACK_SECRET_KEY')),
        ])->get("https://api.paystack.co/bank/resolve?account_number=$number&bank_code=$code");

        $json = $response->json();

        if ($json['status']) {
            return response()->json([
                'data' => $json['data'],
            ]);
        } else {
            return response()->json([
                'error' => $json['message'],
            ], 400);
        }
    }
}
