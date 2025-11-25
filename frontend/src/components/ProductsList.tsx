import React from 'react';
import { ProductsType } from '@/types';
import Categories from './Categories';
import ProductCard from './ProductCard';
import { Minus } from 'lucide-react';
import Image from 'next/image';
import Pay from './Pay';

const ProductsList = () => {
  const cart = [
    {
      id: 1,
      name: "Nike Dri Flex T-Shirt",
      price: 28.9,
      image: "/products/4p.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 2,
      name: "Nike Air Essentials Pullover",
      price: 69.9,
      image: "/products/3b.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 3,
      name: "Under Armour StormFleece",
      price: 49.9,
      image: "/products/5o.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 4,
      name: "Nike Ultraboost Pulse",
      price: 59.9,
      image: "/products/7p.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
  ];
  return (
    
    <div className="mb-16">
      <h1 className="text-2xl font-bold">Cart Products</h1>
      <div className="flex flex-col lg:flex-row justify-between gap-16 mt-16">
        <div className="flex flex-col gap-6 w-full lg:w-2/3">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4">
              <Image
                src={item.image}
                alt={item.name}
                width={90}
                height={180}
                className="rounded-lg w-auto h-auto"
                quality={100}
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-800">
                    ${item.price.toFixed(2)}
                  </h2>
                  <div className="flex items-center gap-1 bg-red-100 rounded-md p-1">
                    <Minus className="w-2 h-2 text-red-300" />
                    <span className="text-[10px] text-red-300">Remove</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-1/3">
          <Pay cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default ProductsList;