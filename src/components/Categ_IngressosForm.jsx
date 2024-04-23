'use client'

import { api } from '@/api';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function Categ_IngressosForm() {

    const CategoriaSchema = yup.object().shape({
        tipo: yup.string()
                    .min(3, "O tipo da categoria deve ter no mínimo 3 caracteres.")
                    .required("tipo da categoria é obrigatório"),
        descricao: yup.string()
                    .required("Descrição da categoria é obrigatório"),

      });
    
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ resolver: yupResolver(CategoriaSchema) });
    
      const router = useRouter();
    
      const onSubmit = async (data) => {
        api.post('/categ_ingressos', data)
          .then((response) => {
            toast.success('Evento cadastrado com sucesso!');
            router.replace('/admin/categ_ingressos');
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message || 'Erro ao cadastrar Categoria!');
          })
      };
    
      return (
        <>
          <div className="flex min-h-full flex-1 flex-col justify-left py-12 sm:px-6 lg:px-8">
            <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
              <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <form className="space-y-6" action="#" method="POST"  onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label htmlFor="tipo" className="block text-sm font-medium leading-6 text-gray-900">
                      Tipo da Categoria
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("tipo")}
                        type="text"
                        autoComplete="tipo"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.tipo && <p className="mt-2 text-sm text-red-600" id="tipo-error">{errors.tipo.message}</p>}
                  </div>
    
                  <div className='flex flex-row gap-x-4'>
    
                    <div>
                      <label htmlFor="descricao" className="block text-sm font-medium leading-6 text-gray-900">
                        Descricao
                      </label>
                      <div className="mt-2">
                        <input
                          {...register("descricao")}
                          type="text"
                          autoComplete="descricao"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.descricao && <p className="mt-2 text-sm text-red-600" id="descricao-error">{errors.descricao.message}</p>}
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