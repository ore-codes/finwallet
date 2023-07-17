import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Dashboard({ auth, cardCount, transactions }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 flex flex-col md:flex-row aliign-stretch text-gray-900 dark:text-gray-100">
                            <Link className="contents" href={route('transactions.index')}>
                                <PrimaryButton className="inline-flex flex-col mr-4 mb-4">
                                    <span className="self-start">Balance</span>
                                    <span className="text-3xl font-semibold">₦{Intl.NumberFormat('en-US').format(auth.user.balance)}</span>
                                </PrimaryButton>
                            </Link>
                            <Link className="contents"  href={route('cards.index')}>
                                <PrimaryButton className="mr-4 mb-4">
                                    <span className="text-3xl font-semibold">{cardCount}</span>
                                    <span>&nbsp;active cards</span>
                                </PrimaryButton>
                            </Link>
                        </div>
                        {transactions.map(transaction => (
                            <div className="border-t p-4 flex items-center space-x-4" key={transaction.uuid}>
                                <div className="basis-1/6 grid place-items-center">
                                    {transaction.type === 'sent'
                                        ? <div className="bg-red-200 text-red-900 p-2 rounded text-sm">DEBIT</div>
                                        : <div className="bg-green-200 text-green-900 p-2 rounded text-sm">CREDIT</div>}
                                </div>
                                <div className="md:contents">
                                    <div className="md:basis-3/6">{transaction.counterparty_name}</div>
                                    <div className="md:basis-1/6 font-semibold">₦{Intl.NumberFormat("en-US").format(transaction.amount)}</div>
                                    <div className="md:basis-1/6">{transaction.createdAtHumanReadable}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
