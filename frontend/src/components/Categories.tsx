"use client"
import { CategoryType } from '@/types';
import { Briefcase, Footprints, Glasses, Hand, Shirt, ShoppingBasket, Venus } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React from 'react';


const categories: CategoryType[] = [
    {
        name: "All",
        icon: <ShoppingBasket className="w-4 h-4" />,
        slug: "all",
    },
    {
        name: "T-shirts",
        icon: <Shirt className="w-4 h-4" />,
        slug: "t-shirts",
    },
    {
        name: "Shoes",
        icon: <Footprints className="w-4 h-4" />,
        slug: "shoes",
    },
    {
        name: "Accessories",
        icon: <Glasses className="w-4 h-4" />,
        slug: "accessories",
    },
    {
        name: "Bags",
        icon: <Briefcase className="w-4 h-4" />,
        slug: "bags",
    },
    {
        name: "Dresses",
        icon: <Venus className="w-4 h-4" />,
        slug: "dresses",
    },
    {
        name: "Jackets",
        icon: <Shirt className="w-4 h-4" />,
        slug: "jackets",
    },
    {
        name: "Gloves",
        icon: <Hand className="w-4 h-4" />,
        slug: "gloves",
    },
];


const Categories = () => {
    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get("category");

    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 bg-gray-100 pd-2 rounded-lg mb-4 text-sm'>
            {categories.map(({ name, icon, slug }) => {
                return <div className={`flex items-center justify-center gap-2 cursor-pointer px-2 py-1 rounded-md ${slug === selectedCategory ? "bg-white" : "text-gray-500"}`} key={name}>
                    {icon}
                    {name}
                </div>
            })}
        </div>
    );
};

export default Categories;