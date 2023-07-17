import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import visaLogo from "../../../img/visa.svg";
import masterCardLogo from "../../../img/mastercard.svg";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Index({ auth, transactions }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Transaction
                history</h2>}
        >
            <Head title="Transaction history"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <section>
                            <header className="flex flex-col md:flex-row justify-between md:items-center">
                                <h2 className="order-1 text-lg font-medium text-gray-900 dark:text-gray-100">View your transaction history.</h2>
                                <Link href={route('transactions.report')} className="self-end md:order-2">
                                    <PrimaryButton>Generate statement</PrimaryButton>
                                </Link>
                            </header>
                            <div className="my-4">
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
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
