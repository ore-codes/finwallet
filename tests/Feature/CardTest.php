<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CardTest extends TestCase
{
    use RefreshDatabase;

    public function test_cards_listing_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get(route('cards.index'));

        $response->assertOk();
    }

    public function test_add_card_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get(route('cards.create'));

        $response->assertOk();
    }

    public function test_user_can_add_card(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->post(route('cards.store'), [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'last4' => '8976',
                'expiry' => '05/24',
                'cvv' => '897',
                'type' => 'visa',
            ]);

        $this::assertSame(1, $user->cards()->count());
        $response->assertRedirect(route('cards.index'));
    }


}
