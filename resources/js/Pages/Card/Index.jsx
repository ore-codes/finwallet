import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import visaLogo from "../../../img/visa.svg";
import masterCardLogo from "../../../img/mastercard.svg";

export default function Index({auth, cards}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Cards</h2>}
        >
            <Head title="Cards"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <section>
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Active cards</h2>

                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    A list of cards you have added to your account and are enabled.
                                </p>
                            </header>
                            <div className="my-4">
                                {cards.map(card => (
                                    <div className="shadow-md rounded-md p-4 flex" key={card.uuid}>
                                        <div className="grid place-items-center p-2">
                                            <img src={card.type === 'visa' ? visaLogo : masterCardLogo} className="w-16 h-16"/>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-semibold">{"•••• ".repeat(3)} {card.last4}</h3>
                                            <h3 className="text-lg font-semibold">{card.first_name} {card.last_name}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center mt-8">
                                <Link href={route('cards.create')}>
                                    <PrimaryButton>Add new card</PrimaryButton>
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
