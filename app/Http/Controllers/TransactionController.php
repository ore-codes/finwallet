<?php

namespace App\Http\Controllers;

use App\Enum\Transaction\Status;
use App\Enum\Transaction\Type;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Transaction/Index', [
            'transactions' => $request->user()->transactions()->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Transaction/Create');
    }

    public function send(Request $request): RedirectResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'bank' => 'required',
            'account_number' => 'string|size:10|required',
            'recipient_name' => 'required',
            'amount' => 'required',
            'notes' => 'nullable',
        ]);

        if (!$this->canAffordTransaction($user, (float)$validated['amount'])) {
            throw ValidationException::withMessages(['amount' => 'Insufficient balance']);
        }

        $user->transactions()->create([
            'type' => Type::Sent,
            'counterparty_account' => $validated['account_number'],
            'counterparty_bank' => $validated['bank'],
            'counterparty_name' => $validated['recipient_name'],
            'amount' => $validated['amount'],
            'notes' => $validated['notes'],
            'status' => Status::Success,
        ]);
        $user->balance -= $validated['amount'];
        $user->save();

        return redirect(route('transactions.index'));
    }

    public function report(Request $request): \Illuminate\Http\Response
    {
        $pdf = Pdf::loadView('transactions/report', [
            'date' => date('d/m/Y'),
            'user' => $request->user(),
            'transactions' => $request->user()->transactions()->latest()->get(),
        ]);

        return $pdf->download('statement.pdf');
    }

    private function canAffordTransaction(User $user, float $amount): bool
    {
        return $user->balance >= $amount;
    }
}
