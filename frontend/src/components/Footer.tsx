import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <div className='mt-16 gap-8 flex flex-col items-center md:flex-row md:justify-between md:items-start md:gap-0 bg-gray-800 p-8 rounded-lg'>
            <div className='flex flex-col gap-4 items-center md:items-start'>
                <Link className='flex items-center' href="/">
                    <Image src="/logo.png" alt='lama shop' width='36' height='36' />
                    <p className='hidden md:block text-md font-medium tracking-wider text-white'>DelRAY SHOP</p>
                </Link>
                <p className='text-sm text-gray-400'>© 2025 DelRAY Shop</p>
                <p className='text-sm text-gray-400'>All rights reserved.</p>
            </div>
            <div className='flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start'>
                <p className='text-sm text-amber-50'>Links</p>
                <Link href="/">Homepage</Link>
                <Link href="/">Contact</Link>
                <Link href="/">Terms of service</Link>
                <Link href="/">Privacy policy</Link>
            </div>
            <div className='flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start'>
                <p className='text-sm text-amber-50'>Links</p>
                <Link href="/">All products</Link>
                <Link href="/">New arrivals</Link>
                <Link href="/">Best sellers</Link>
                <Link href="/">Sell</Link>
            </div>
            <div className='flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start'>
                <p className='text-sm text-amber-50'>Links</p>
                <Link href="/">About</Link>
                <Link href="/">Contact</Link>
                <Link href="/">Blog</Link>
                <Link href="/">Affiliate program</Link>
            </div>
        </div>
    );
};

export default Footer;