<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class CardController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Card/Index', [
            'cards' => $request->user()->cards,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Card/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $messages = [
            'type.required' => 'Could not resolve card brand. Make sure you are connected to the internet and you entered card number correctly.',
        ];
        $rules = [
            'first_name' => 'required',
            'last_name' => 'required',
            'last4' => 'string',
            'expiry' => 'required|string|size:5',
            'cvv' => 'required|string|size:3',
            'type' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return redirect(route('cards.create'))->withErrors($validator)->withInput();
        }

        $validated = $validator->validated();
        $request->user()->cards()->create($validated);

        return redirect(route('cards.index'));
    }
}
