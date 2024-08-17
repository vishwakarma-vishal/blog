import React from 'react'

export const MiniCard = () => {
    return (
        <div className="flex items-center gap-2 bg-white py-2 px-2 rounded-full shadow">
            <img src="./src/assets/placeholder.jpg" alt="thumbnail" className="w-12 h-12 rounded-full" />
            <div><p className="text-md font-semibold">This is the new post </p>
                <p className="text-sm text-gray-500">Lorem ipsum dolor sit, adipisicing...</p>
            </div>
        </div>
    )
}
