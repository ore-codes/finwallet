import { Link, Head } from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="FinWallet - The money app for the modern era." />
            <div className="shadow-lg fixed top-0 left-0 w-screen z-10">
                <nav className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row justify-between">
                    <ApplicationLogo/>

                    <div className="flex space-x-8 items-center justify-center py-2 lg:p-0">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="text-brand-700 hover:text-brand-400 font-semibold">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-brand-700 hover:text-brand-400 font-semibold">
                                    Sign in
                                </Link>
                                <Link href={route('register')}
                                      className="px-2 py-3 bg-brand-700 rounded-md text-white hover:bg-brand-400 font-semibold">
                                    Join FinWallet
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
            <div className="min-h-screen flex items-center max-w-7xl mx-auto pt-32 lg:pt-16">
                <div className="basis-5/12 p-6">
                    <h1 className="text-5xl text-brand-700 font-bold py-6">The money app for the modern era.</h1>
                    <div className="text-lg font-semibold">Make free transfers, enjoy cashless payment options and earn interest on your savings with <span className="text-brand-700">FinWallet</span>.</div>
                </div>
                <div className="basis-7/12 bg-[url('/img/hero.svg')] self-stretch">

                </div>
            </div>
        </>
    );
}
