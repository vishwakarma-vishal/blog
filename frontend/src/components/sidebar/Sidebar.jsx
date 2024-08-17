import React from 'react';
import { MiniCard } from './MiniCard';

export const Sidebar = () => {
    return (
        <div className="basis-1/3 space-y-4 py-4">
            <h2 className="text-2xl text-center text-gray-800">Recent Post</h2>
            
            <MiniCard/>
            <MiniCard/>
            <MiniCard/>
            <MiniCard/>
            <MiniCard/>
            <MiniCard/>
            <MiniCard/>
            <MiniCard/>
        </div>
    )
}
