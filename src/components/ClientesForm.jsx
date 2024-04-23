'use client'

import { api } from '@/api';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function ClientesForm() {

    const ClienteSchema = yup.object().shape({
        name: yup.string()
                    .min(3, "O nome do cliente deve ter no mínimo 3 caracteres.")
                    .required("Nome do cliente é obrigatório"),
        phone: yup.string()
                    .required("Numero do telefone é obrigatório"),
        email: yup.string()
                    .required("Email é obrigatório"),
        city: yup.string()
                    .required("Cidade é obrigatório"),
      });
    
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ resolver: yupResolver(ClienteSchema) });
    
      const router = useRouter();
    
      const onSubmit = async (data) => {
        api.post('/cliente', data)
          .then((response) => {
            toast.success('Cliente cadastrado com sucesso!');
            router.replace('/admin/cliente');
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message || 'Erro ao cadastrar cliente!');
          })
      };
    
      return (
        <>
          <div className="flex min-h-full flex-1 flex-col justify-left py-12 sm:px-6 lg:px-8">
            <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
              <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <form className="space-y-6" action="#" method="POST"  onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                      Nome do Cliente
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("name")}
                        type="text"
                        autoComplete="name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.name && <p className="mt-2 text-sm text-red-600" id="name-error">{errors.name.message}</p>}
                  </div>
    
                  <div className='flex flex-row gap-x-4'>
    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                        Telefone
                      </label>
                      <div className="mt-2">
                        <input
                          {...register("phone")}
                          type="text"
                          autoComplete="phone"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.phone && <p className="mt-2 text-sm text-red-600" id="phone-error">{errors.phone.message}</p>}
                    </div>
    
                  </div>

                  <div className='flex flex-row gap-x-4'>
    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email
                      </label>
                      <div className="mt-2">
                        <input
                          {...register("email")}
                          type="text"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.email && <p className="mt-2 text-sm text-red-600" id="email-error">{errors.email.message}</p>}
                    </div>
    
                  </div>

                  <div className='flex flex-row gap-x-4'>
    
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                        Cidade
                      </label>
                      <div className="mt-2">
                        <input
                          {...register("city")}
                          type="text"
                          autoComplete="city"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.city && <p className="mt-2 text-sm text-red-600" id="city-error">{errors.city.message}</p>}
                    </div>
    
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Cadastrar
                    </button>
                  </div>
                </form>
    
              </div>
    
            </div>
          </div>
        </>
      )    
}