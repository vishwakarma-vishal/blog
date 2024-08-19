import React from 'react';
import { MiniCard } from './MiniCard';

export const Sidebar = () => {
    return (
        <div className="h-fit basis-1/3 space-y-4 px-4 py-8 bg-white shadow-xl rounded">
            <h2 className="text-2xl text-center text-gray-800">Recent Post</h2>

            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />

            <div className='space-y-2'>
                <h2 className="w-full text-lg font-semibold text-gray-800">Categories</h2>
                <div className=' flex flex-wrap gap-2 text-sm text-blue-600'>
                    <span className='hover:underline cursor-pointer'>Education</span>
                    <span className='hover:underline cursor-pointer'>Fitness</span>
                    <span className='hover:underline cursor-pointer'>Finance</span>
                    <span className='hover:underline cursor-pointer'>Entertainment</span>
                    <span className='hover:underline cursor-pointer'>Money</span>
                    <span className='hover:underline cursor-pointer'>Business</span>
                    <span className='hover:underline cursor-pointer'>Economy</span>
                    <span className='hover:underline cursor-pointer'>Self-help</span>
                </div>
            </div>
        </div>
    )
}
