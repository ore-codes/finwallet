<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;
    use HasUuids;

    protected $primaryKey = 'uuid';
    protected $fillable = ['type', 'counterparty_account', 'counterparty_bank', 'counterparty_name', 'amount', 'notes', 'status'];
    protected $with = ['user'];
    protected $appends = ['createdAtHumanReadable'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getCreatedAtHumanReadableAttribute($date)
    {
        return $this->created_at->diffForHumans();
    }
}
