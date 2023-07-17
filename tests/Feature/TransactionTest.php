<?php

namespace Tests\Feature;

use App\Enum\Transaction\Status;
use App\Enum\Transaction\Type;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TransactionTest extends TestCase
{
    use RefreshDatabase;

    public function test_transaction_history_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get(route('transactions.index'));

        $response->assertOk();
    }

    public function test_can_generate_statement(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get(route('transactions.report'));

        $response->assertDownload();
    }

    public function test_send_money_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get(route('transactions.create'));

        $response->assertOk();
    }

    public function test_user_can_send_money(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->post(route('transactions.send'), [
                'bank' => '000',
                'account_number' => '0123456789',
                'recipient_name' => 'XXX',
                'amount' => 20000,
                'notes' => '',
            ]);

        $this::assertSame(80000, $user->balance);
        $response->assertRedirect(route('transactions.index'));
    }
}
