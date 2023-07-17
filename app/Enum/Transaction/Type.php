<?php

namespace App\Enum\Transaction;

enum Type: string
{
    case Sent = 'sent';
    case Received = 'received';
}
