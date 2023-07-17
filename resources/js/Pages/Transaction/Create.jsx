import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import SelectBox from "@/Components/SelectBox.jsx";
import banks from "@/data/banks.js";
import TextInput from "@/Components/TextInput.jsx";
import {useEffect} from "react";
import {FaCcMastercard, FaCcVisa} from "react-icons/fa6";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputError from "@/Components/InputError.jsx";

export default function Create({auth}) {
    const { data, setData, post, processing, errors, setError } = useForm({
        bank: '120001',
        account_number: '',
        recipient_name: '',
        amount: '',
        notes: '',
    });

    useEffect(function () {
        if (data.account_number.length === 10) {
            axios.get(`/api/verify-account/${data.account_number}/${data.bank}`)
                .then(response => {
                    if (response.status === 200) {
                        setData('recipient_name', response.data.data.account_name);
                        setError('recipient_name', '');
                    } else {
                        setData('recipient_name', '');
                    }
                });
        } else {
            setData('recipient_name', '');
        }
    }, [data.account_number, data.bank]);

    const submit = (e) => {
        e.preventDefault();

        post(route('transactions.send'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">New
                transaction</h2>}
        >
            <Head title="Send Money"/>

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex flex-col md:block p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <PrimaryButton className="self-end md:float-right inline-flex flex-col mr-4 mb-4">
                            <span className="self-start">Balance</span>
                            <span className="text-3xl font-semibold">₦{Intl.NumberFormat('en-US').format(auth.user.balance)}</span>
                        </PrimaryButton>
                        <h3 className="text-lg font-semibold text-gray-700">Send money to a Nigerian account</h3>
                        <form className="mt-6 space-y-6" onSubmit={submit}>
                            <div>
                                <h4 className="text-gray-600 font-bold">Recipient information*</h4>
                                <div className="md:flex md:justify-between md:space-x-4">
                                    <div>
                                        <InputLabel htmlFor="bank" value="Bank"/>
                                        <SelectBox
                                            id="bank"
                                            name="bank"
                                            className="mt-1 block w-full"
                                            value={data.bank}
                                            onChange={e => setData('bank', e.target.value)}
                                            required
                                        >
                                            {banks.map(bank => (
                                                <SelectBox.Option key={bank.code} value={bank.code}>{bank.name}</SelectBox.Option>
                                            ))}
                                        </SelectBox>
                                        <InputError message={errors.bank} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="account_number" value="Account number"/>
                                        <TextInput
                                            id="account_number"
                                            name="account_number"
                                            className="mt-1 block w-full"
                                            value={data.account_number}
                                            onChange={e => setData('account_number', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.account_number} className="mt-2" />
                                    </div>
                                </div>
                                {data.recipient_name.length > 0 && <div className="flex justify-end pt-4">
                                    <div className="bg-brand-700 rounded p-4 text-white">{data.recipient_name}</div>
                                </div>}
                                <InputError message={errors.recipient_name} className="mt-2" />
                            </div>
                            <div>
                                <h4 className="text-gray-600 font-bold">Transaction details*</h4>
                                <div>
                                    <div>
                                        <InputLabel htmlFor="amount" value="Amount (₦)"/>
                                        <TextInput
                                            id="amount"
                                            name="amount"
                                            className="mt-1 block"
                                            value={data.amount}
                                            onChange={e => setData('amount', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.amount} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="notes" value="Notes"/>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            className="input mt-1 block w-full"
                                            value={data.notes}
                                            onChange={e => setData('notes', e.target.value)}
                                        ></textarea>
                                        <InputError message={errors.notes} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end items-end gap-4">
                                <PrimaryButton disabled={processing}>Add card</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
