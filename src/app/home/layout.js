'use client'
import Link from 'next/link'
import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { signOut, useSession } from 'next-auth/react';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation';

const userImageUrl = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

const perks = [
  {
    name: 'Troca gratuita',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg',
    description: 'Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.',
  },
  {
    name: 'Postagem no mesmo dia',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg',
    description: 'We offer a delivery service that has never been done before. Checkout today and receive your products within hours.',
  },
  {
    name: 'Desconto o ano todo',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
    description: 'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
  },
  {
    name: 'Preservação da natureza',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
    description: 'We’ve pledged 1% of sales to the preservation and restoration of the natural environment.',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Layout({children}) {
  const {status, data: session} = useSession();
  const router = useRouter();

  useEffect(
    () => {
      if (session) {
        if (session?.user?.is_admin === true)
          router.replace('/admin/home');
      }      
    }, 
    [session]
  );
  
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white shadow-sm border-b">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <img
                        className="block h-8 w-auto lg:hidden"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhPEmAE3adrAln8LQ00mLxwrb_2w4yVq5ALbys95Tg&s"
                        alt="Your Company"
                      />
                      <img
                        className="hidden h-8 w-auto lg:block"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhPEmAE3adrAln8LQ00mLxwrb_2w4yVq5ALbys95Tg&s"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {/* {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'border-indigo-500 text-gray-900'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))} */}
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">


                    {/* Profile dropdown */}
                    { (status === 'authenticated') && (
                    <>
                      <div className="flow-root">
                        <a href="#" className="group -m-2 flex items-center p-2">
                          <ShoppingCartIcon
                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                          <span className="sr-only">items in cart, view bag</span>
                        </a>
                      </div>
                      <span className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" aria-hidden="true" />

                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full bg-gray-50"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                            <span className="hidden lg:flex lg:items-center">
                              <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                                  {session?.user?.email}
                              </span>
                              <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      className={classNames(
                                        active ? 'bg-gray-50' : '',
                                        'w-full block px-3 py-1 text-sm leading-6 text-gray-900'
                                      )}
                                    >
                                      Seu perfil
                                    </button>
                                  )}
                              </Menu.Item>

                              <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => signOut({ redirect: false, callbackUrl: '/home'})}
                                      className={classNames(
                                        active ? 'bg-gray-50' : '',
                                        'w-full block px-3 py-1 text-sm leading-6 text-gray-900'
                                      )}
                                    >
                                      Sair
                                    </button>
                                  )}
                              </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </>
                    )}

                    { (status === 'unauthenticated') && (
                      <div className="space-x-2">
                        <Link
                          href="auth/signup"
                          className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Cadastrar-se
                        </Link>
                        <Link
                          href="/auth/signin"
                          className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Entrar
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 pb-3 pt-2">
                  {/* {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
                        'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))} */}
                </div>

                { (status === 'authenticated') && (
                  <div className="border-t border-gray-200 pb-3 pt-4">
                    <div className="flex items-center px-4">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={userImageUrl} alt="" />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">{session?.user?.first_name}</div>
                        <div className="text-sm font-medium text-gray-500">{session?.user?.email}</div>
                      </div>

                    </div>
                    <div className="mt-3 space-y-1">
                      <Disclosure.Button
                          as="button"
                          className="w-full text-left block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                      >
                        Seu perfil
                      </Disclosure.Button>
                      <Disclosure.Button
                          as="button"
                          onClick={() => signOut({ redirect: false, callbackUrl: '/home'})}
                          className="w-full text-left block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                      >
                        Sair
                      </Disclosure.Button>
                    </div>
                  </div>
                )}

                { (status === 'unauthenticated') && (
                  <div className="border-t border-gray-200 pb-3 pt-3">
                    <Link
                      href="auth/signup"
                      className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Cadastrar-se
                    </Link>
                    <Link
                      href="/auth/signin"
                      className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Entrar
                    </Link>

                  </div>
                )}

              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <main>

          {children}

          <section aria-labelledby="perks-heading" className="border-t border-gray-200 bg-gray-50">
            <h2 id="perks-heading" className="sr-only">
              Our perks
            </h2>

            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
              <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
                {perks.map((perk) => (
                  <div
                    key={perk.name}
                    className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                  >
                    <div className="md:flex-shrink-0">
                      <div className="flow-root">
                        <img className="-my-1 mx-auto h-24 w-auto" src={perk.imageUrl} alt="" />
                      </div>
                    </div>
                    <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                      <h3 className="text-base font-medium text-gray-900">{perk.name}</h3>
                      <p className="mt-3 text-sm text-gray-500">{perk.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </main>

        <footer aria-labelledby="footer-heading" className="bg-gray-50">
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-100 py-10 text-center">
              <p className="text-sm text-gray-500">&copy; 2024 Só Ingressos, Inc. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
