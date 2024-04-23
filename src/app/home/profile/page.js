"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { api } from '@/api';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useSession } from "next-auth/react";

export default function Profile() {
    const router = useRouter();
    const [cliente, setCliente] = useState({});
    const [preloadedValues, setPreloadedValues] = useState({
        email: "" ,
        first_name: "" ,
        last_name: "" ,
        address1: "" ,
        city: "" ,
        state: "" ,
        cep: "" ,
        phone: "" ,
    });

    const {status, data: session} = useSession();

    useEffect(
        () => {
            if (session) {
                setPreloadedValues({
                    ...preloadedValues,
                    email: session?.user?.email,
                    first_name: session?.user?.first_name,
                    last_name: session?.user?.last_name,
                });
            }      
        }, 
        [session]
    );



    useEffect(() => {
        api.get('/clientes')
            .then(response => {
                let cliente = response.data;
                if (cliente) {
                    setPreloadedValues({
                        email: session?.user?.email,
                        first_name: session?.user?.first_name,
                        last_name: session?.user?.last_name,
                        address1: cliente?.address1 || "",
                        address2: cliente?.address2 || "",
                        address3: cliente?.address3 || "",
                        city: cliente?.city || "",
                        state: cliente?.state || "",
                        cep: cliente?.cep || "",
                        phone: cliente?.phone || "",
                    });
                }
                setCliente(cliente);
            });
    }, []);


    const RegisterSchema = yup.object().shape({
        email:      yup.string()
                        .email("Digite um email válido.")
                        .required("Email é obrigatório"),
        first_name: yup.string()
                        .required("Nome é obrigatório"),
        last_name:  yup.string()
                        .required("Sobrenome é obrigatório"),
        phone:      yup.string()
                        .required("Telefone é obrigatório"),                    
        cep:        yup.string()
                        .required("CEP é obrigatório"),
        address1:   yup.string()
                        .required("Endereço é obrigatório"),
        city:       yup.string()
                        .required("Cidade é obrigatório"),
        state:      yup.string()
                        .required("UF é obrigatório"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({ resolver: yupResolver(RegisterSchema), defaultValues: preloadedValues});
        
    useEffect(() => reset(preloadedValues), [preloadedValues]);

    const cep = watch("cep");

    const onCepChange = (e) => {
        const cep = e.target.value;
        console.log("onCepChange", cep)
        if (cep.length === 8 || (cep.length === 9 && cep.includes('-')))   {
            api.get(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => {
                    let address = response.data;
                    console.log(address);
                    setPreloadedValues({
                        ...preloadedValues,
                        cep: address.cep,
                        address1: address.logradouro,
                        address2: address.bairro,
                        city: address.localidade,
                        state: address.uf,
                    });
                });
        }
    };

    const onSubmit = async (data) => {
        data = {...data, id: cliente.id};
        console.log(data);
        api.put('/clientes', data)
            .then((response) => {
                toast.success('Perfil atualizado com sucesso.');
                router.replace('/home');
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || 'Erro ao cadastrar usuário!');
            })
        };

    return (
        <section aria-labelledby="trending-heading" className="bg-white">
            <div className="py-4 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-8">
                <div className="space-y-10 divide-y divide-gray-900/10">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
                        <div className="px-4 sm:px-0">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Dados pessoais
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Mantenha seu endereço atualizado.
                            </p>
                        </div>

                        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"  onSubmit={handleSubmit(onSubmit)}>
                            <div className="px-4 py-6 sm:p-8">
                                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="first-name"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Primeiro nome
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("first_name")}
                                                readOnly
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.email && <p className="mt-2 text-sm text-red-600" id="email-error">{errors.email.message}</p>}
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="last-name"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Sobrenome
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("last_name")}
                                                readOnly
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.last_name && <p className="mt-2 text-sm text-red-600" id="last_name-error">{errors.last_name.message}</p>}
                                    </div>

                                    <div className="col-span-3">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Email
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("email")}
                                                readOnly
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.email && <p className="mt-2 text-sm text-red-600" id="email-error">{errors.email.message}</p>}
                                    </div>


                                    <div className="col-span-3">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Phone
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("phone")}
                                                id="phone"
                                                type="text"
                                                autoComplete="phone"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.phone && <p className="mt-2 text-sm text-red-600" id="phone-error">{errors.phone.message}</p>}
                                    </div>

                                    <div className="col-span-2">
                                        <label
                                            htmlFor="postal-code"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            CEP
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("cep", { onChange: onCepChange })}
                                                type="text"
                                                id="postal-code"
                                                autoComplete="postal-code"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.cep && <p className="mt-2 text-sm text-red-600" id="cep-error">{errors.cep.message}</p>}
                                    </div>

                                    <div className="col-span-full">
                                        <label
                                            htmlFor="address1"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Endereço
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("address1")}
                                                type="text"
                                                id="address1"
                                                autoComplete="address1"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.address1 && <p className="mt-2 text-sm text-red-600" id="address1-error">{errors.address1.message}</p>}
                                    </div>                                   

                                    <div className="sm:col-span-4 sm:col-start-1">
                                        <label
                                            htmlFor="city"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Cidade
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("city")}
                                                type="text"
                                                id="city"
                                                autoComplete="address-level2"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.city && <p className="mt-2 text-sm text-red-600" id="city-error">{errors.city.message}</p>}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="region"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            UF
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("state")}
                                                type="text"
                                                id="region"
                                                autoComplete="address-level1"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.state && <p className="mt-2 text-sm text-red-600" id="state-error">{errors.state.message}</p>}
                                    </div>


                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                                <button
                                    type="button"
                                    className="text-sm font-semibold leading-6 text-gray-900"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Atualizar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
