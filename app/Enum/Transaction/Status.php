<?php

namespace App\Enum\Transaction;

enum Status: string
{
    case Pending = 'pending';
    case Success = 'success';
    case Failed = 'failed';
}
