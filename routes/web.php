<?php

use App\Http\Controllers\CardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function (Request $request) {
        return Inertia::render('Dashboard', [
            'cardCount' => $request->user()->cards()->count(),
            'transactions' => $request->user()->transactions()->latest()->take(5)->get(),
        ]);
    })->name('dashboard');
    Route::get('/cards', [CardController::class, 'index'])->name('cards.index');
    Route::get('/cards/new', [CardController::class, 'create'])->name('cards.create');
    Route::post('/cards/new', [CardController::class, 'store'])->name('cards.store');
    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::get('/transactions/new', [TransactionController::class, 'create'])->name('transactions.create');
    Route::post('/transactions/new', [TransactionController::class, 'send'])->name('transactions.send');
    Route::get('/transactions/statement', [TransactionController::class, 'report'])->name('transactions.report');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
