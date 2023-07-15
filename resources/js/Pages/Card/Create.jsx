import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {FaCcMastercard, FaCcVisa} from "react-icons/fa6";
import {useEffect, useState} from "react";
import InputError from "@/Components/InputError.jsx";

export default function Create({auth}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        last4: '',
        expiry: '',
        cvv: '',
        type: '',
    });
    const [cardNumber, setCardNumber] = useState('');

    useEffect(function () {
        const number = cardNumber.replace(/[^0-9]/gi, '');
        if (number.length >= 6) {
            if (data.type === '') {
                axios.get(`/api/bin/${number.substring(0, 6)}`)
                    .then(response => {
                        if (response.status === 200) {
                            setData('type', response.data.data.brand.toLowerCase());
                        } else {
                            setData('type', '');
                        }
                    });
            }
        } else {
            setData('type', '');
        }
    }, [cardNumber]);

    const cc_format = value => {
        const v = value
            .replace(/\s+/g, "")
            .replace(/[^0-9]/gi, "")
            .substring(0, 16);
        const parts = [];

        for (let i = 0; i < v.length; i += 4) {
            parts.push(v.substring(i, i + 4));
        }

        return parts.length > 1 ? parts.join(" ") : value;
    }

    const month_format = value => {
        const v = value
            .replace(/\s+/g, "")
            .replace(/[^0-9]/gi, "")
            .substring(0, 4);
        const parts = [];

        for (let i = 0; i < v.length; i += 2) {
            parts.push(v.substring(i, i + 2));
        }

        return parts.length > 1 ? parts.join("/") : value;
    }

    const changeCardNumber = e => {
        setCardNumber(cc_format(e.target.value));
        setData('last4', e.target.value.replace(/[^0-9]/gi, '').slice(-4));
    }

    const submit = (e) => {
        e.preventDefault();

        post(route('cards.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Add new
                card</h2>}
        >
            <Head title="Add new card"/>

            <div className="py-12">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700">New card information</h3>
                        <form className="mt-6 space-y-6" onSubmit={submit}>
                            <div>
                                <h4 className="text-gray-600 font-bold">Name*</h4>
                                <div className="flex justify-between space-x-4">
                                    <div>
                                        <InputLabel htmlFor="first_name" value="First name"/>
                                        <TextInput
                                            id="first_name"
                                            name="first_name"
                                            className="mt-1 block w-full"
                                            autoComplete="given-name"
                                            isFocused={true}
                                            value={data.first_name}
                                            onChange={e => setData('first_name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.first_name} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="last_name" value="Last name"/>
                                        <TextInput
                                            id="last_name"
                                            name="last_name"
                                            className="mt-1 block w-full"
                                            autoComplete="family-name"
                                            value={data.last_name}
                                            onChange={e => setData('last_name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.last_name} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-gray-600 font-bold">Card information*</h4>
                                <div className="w-full">
                                    <InputLabel htmlFor="card_number" value="Card Number"/>
                                    <TextInput
                                        id="card_number"
                                        name="number"
                                        className="mt-1 block w-full"
                                        autoComplete="cc-number"
                                        value={cardNumber}
                                        onChange={changeCardNumber}
                                        required
                                    />
                                </div>
                                <div className="flex justify-between space-x-4">
                                    <div>
                                        <InputLabel htmlFor="expiry_date" value="Expiry date"/>
                                        <TextInput
                                            id="expiry_date"
                                            name="expiry"
                                            className="mt-1 block w-full"
                                            value={data.expiry}
                                            autoComplete="cc-exp"
                                            onChange={e => setData('expiry', month_format(e.target.value))}
                                            required
                                        />
                                        <InputError message={errors.expiry} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="cvv" value="CVV"/>
                                        <TextInput
                                            id="cvv"
                                            name="cvv"
                                            className="mt-1 block w-full"
                                            value={data.cvv}
                                            type="password"
                                            autoComplete="cc-csc"
                                            onChange={e => setData('cvv', e.target.value.substring(0, 3))}
                                            required
                                        />
                                        <InputError message={errors.cvv} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                            <InputError message={errors.type} className="mt-2" />
                            <div className="flex justify-between items-end gap-4">
                                <div>
                                    {data.type === 'visa' && <h4 className="text-7xl text-brand-700"><FaCcVisa/></h4>}
                                    {data.type === 'mastercard' &&
                                        <h4 className="text-7xl text-brand-700"><FaCcMastercard/></h4>}
                                </div>
                                <PrimaryButton disabled={processing}>Add card</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
