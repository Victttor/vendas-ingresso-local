'use client'

import { api } from '@/api';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function Lote_IngressosForm() {

    const Lote_IngressosSchema = yup.object().shape({
        nomeIngresso: yup.string()
                    .min(3, "O nome do lote deve ter no mínimo 3 caracteres.")
                    .required("Nome do lote é obrigatório"),
        first_lote: yup.number()
                    .required("Quantidade do lote é obrigatório"),
        sec_lote: yup.number()
                    .required("Quantidade do lote é obrigatório"),
      });
    
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ resolver: yupResolver(Lote_IngressosSchema) });
    
      const router = useRouter();
    
      const onSubmit = async (data) => {
        api.post('/lote_ingressos', data)
          .then((response) => {
            toast.success('Lote cadastrado com sucesso!');
            router.replace('/admin/lote_ingressos');
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message || 'Erro ao cadastrar lote!');
          })
      };
    
      return (
        <>
          <div className="flex min-h-full flex-1 flex-col justify-left py-12 sm:px-6 lg:px-8">
            <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
              <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <form className="space-y-6" action="#" method="POST"  onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label htmlFor="nomeIngresso" className="block text-sm font-medium leading-6 text-gray-900">
                      Nome do Lote
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("nomeIngresso")}
                        type="text"
                        autoComplete="nomeIngresso"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.nomeIngresso && <p className="mt-2 text-sm text-red-600" id="nomeIngresso-error">{errors.nomeIngresso.message}</p>}
                  </div>
    
                  <div className='flex flex-row gap-x-4'>
    
                    <div>
                      <label htmlFor="first_lote" className="block text-sm font-medium leading-6 text-gray-900">
                        Quantidade do Primeiro Lote
                      </label>
                      <div className="mt-2">
                        <input
                          {...register("first_lote")}
                          type="number"
                          autoComplete="first_lote"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.first_lote && <p className="mt-2 text-sm text-red-600" id="first_lote-error">{errors.first_lote.message}</p>}
                    </div>
    
                  </div>

                  <div className='flex flex-row gap-x-4'>
    
                    <div>
                      <label htmlFor="sec_lote" className="block text-sm font-medium leading-6 text-gray-900">
                      Quantidade do Segundo Lote
                      </label>
                      <div className="mt-2">
                        <input
                          {...register("sec_lote")}
                          type="number"
                          autoComplete="sec_lote"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.sec_lote && <p className="mt-2 text-sm text-red-600" id="sec_lote-error">{errors.sec_lote.message}</p>}
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