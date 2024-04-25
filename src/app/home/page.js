"use client";

import { api } from "@/api";
import { StarIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/*const _products = [
    {
        id: 1,
        name: 'Organize Basic Set (Walnut)',
        price: '$149',
        rating: 5,
        reviewCount: 38,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg',
        imageAlt: 'TODO',
        href: '#',
    },
    {
        id: 2,
        name: 'Organize Pen Holder',
        price: '$15',
        rating: 5,
        reviewCount: 18,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-02.jpg',
        imageAlt: 'TODO',
        href: '#',
    },
    {
        id: 3,
        name: 'Organize Sticky Note Holder',
        price: '$15',
        rating: 5,
        reviewCount: 14,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg',
        imageAlt: 'TODO',
        href: '#',
    },
    {
        id: 4,
        name: 'Organize Phone Holder',
        price: '$15',
        rating: 4,
        reviewCount: 21,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg',
        imageAlt: 'TODO',
        href: '#',
    },
    {
        id: 5,
        name: 'Organize Basic Set (Walnut)',
        price: '$149',
        rating: 5,
        reviewCount: 38,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg',
        imageAlt: 'TODO',
        href: '#',
    },
    {
        id: 6,
        name: 'Organize Pen Holder',
        price: '$15',
        rating: 5,
        reviewCount: 18,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-02.jpg',
        imageAlt: 'TODO',
        href: '#',
    },
    {
        id: 7,
        name: 'Organize Sticky Note Holder',
        price: '$15',
        rating: 5,
        reviewCount: 14,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg',
        imageAlt: 'TODO',
        href: '#',
    },
    {
        id: 8,
        name: 'Organize Phone Holder',
        price: '$15',
        rating: 4,
        reviewCount: 21,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg',
        imageAlt: 'TODO',
        href: '#',
    },    
    // More products...
]*/

export default function Home() {

    return (
        <section aria-labelledby="trending-heading" className="bg-white">
            <div className="py-4 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-8">
                <div className="border-t -mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
                    {}
                </div>
            </div>
        </section>
    );
}
