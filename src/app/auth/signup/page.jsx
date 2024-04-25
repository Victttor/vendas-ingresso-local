'use client'

import { api } from '@/api';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Register() {

  const RegisterSchema = yup.object().shape({
    email: yup.string()
                .email("Digite um email válido.")
                .required("Email é obrigatório"),
    password: yup.string()
                .min(8, "A senha deve ter no mínimo 8 caracteres.")
                .required("Senha é obrigatória"),
    first_name: yup.string()
                .required("Nome é obrigatório"),
    last_name: yup.string()
                .required("Sobrenome é obrigatório"),
    confirmPassword: yup.string()
                .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais')
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(RegisterSchema) });

  const router = useRouter();

  const onSubmit = async (data) => {
    console.log(data);
    toast.error(data.first_name);

    api.post('/auth/signup', data)
      .then((response) => {
        toast.success('Usuário cadastrado com sucesso!');
        router.replace('/auth/signin');
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || 'Erro ao cadastrar usuário!');
      })
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhPEmAE3adrAln8LQ00mLxwrb_2w4yVq5ALbys95Tg&s"
            alt="SoIngresos"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Crie sua conta
          </h2>
        </div>

        <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" action="#" method="POST"  onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    {...register("email")}
                    type="text"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.email && <p className="mt-2 text-sm text-red-600" id="email-error">{errors.email.message}</p>}
              </div>

              <div className='flex flex-row gap-x-4'>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Nome
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("first_name")}
                      type="text"
                      autoComplete="first_name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.first_name && <p className="mt-2 text-sm text-red-600" id="first_name-error">{errors.first_name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Sobrenome
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("last_name")}
                      type="text"
                      autoComplete="last_name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.last_name && <p className="mt-2 text-sm text-red-600" id="last_name-error">{errors.last_name.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    {...register("password")}
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.password && <p className="mt-2 text-sm text-red-600" id="password-error">{errors.password.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirmação de Senha
                </label>
                <div className="mt-2">
                  <input
                    {...register("confirmPassword")}
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.confirmPassword && <p className="mt-2 text-sm text-red-600" id="confirmPassword-error">{errors.confirmPassword.message}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                </div>

                <div className="text-sm leading-6">
                  <Link href="/auth/signin" className="font-semibold text-pink-600 hover:text-pink-500">
                    Já tenho cadastro
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
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
  