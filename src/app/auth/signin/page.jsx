'use client'

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Login() {
  const router = useRouter();

  const {data: session} = useSession();
  useEffect(() => {
    if (session) {
      if (session?.user?.is_admin === true)
        router.replace('/admin/home');
      else 
        router.replace('/');
    }
    console.log(session);
  }, [session]);

  const LoginSchema = yup.object().shape({
    email: yup.string()
                .email("Digite um email válido.")
                .required("Email é obrigatório"),
    password: yup.string()
                .min(8, "A senha deve ter no mínimo 8 caracteres.")
                .required("Senha é obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginSchema) });
  
  const onSubmit = async (credentials) => {
    console.log(credentials);
    signIn('credentials', {...credentials, redirect: false} )
      .then((response) => {
        console.log(response);
        if (response?.ok) {
          toast.success('Usuário autenticado com sucesso!');
          router.replace('/');
        }
        else {
          toast.error('Email e/ou senha inválidos');
        }
      })
      .catch((error) => {
        toast.error('Email e/ou senha inválidos');
      })
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhPEmAE3adrAln8LQ00mLxwrb_2w4yVq5ALbys95Tg&s"
            alt="SoIngressos"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Entre na sua conta
          </h2>
        </div>

        <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} >
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    {...register("email")}
                    type="text"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.email && 
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                      {errors.email.message}
                  </p>
                }
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
                {errors.password &&
                  <p className="mt-2 text-sm text-red-600" id="password-error">
                      {errors.password.message}
                  </p>
                }
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                </div>

                <div className="text-sm leading-6">
                  <Link href="/auth/signup" className="font-semibold text-pink-600 hover:text-indigo-500">
                    Quero me cadastrar
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                >
                  Entrar
                </button>
              </div>
            </form>

          </div>

        </div>
      </div>
    </>
  )
}
  