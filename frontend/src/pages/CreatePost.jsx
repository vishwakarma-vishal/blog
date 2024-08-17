import React from 'react'

const CreatePost = () => {
    return (
        <div>
            <h1 className='text-2xl font-semibold text-gray-800 mb-4'>Create a new Post</h1>

            <form className='border bg-white p-6 space-y-2 border-none rounded shadow-lg'>
                <div className='space-y-1'>
                    <label htmlFor="thumbnail" className='text-md font-semibold text-gray-800'>Thumbnail</label><br/>
                    <input id="thumbnail" type="image" className='w-full h-20 bg-transparent border-2 border-dashed rounded'/>
                </div>
                <div className='space-y-1'>
                    <label htmlFor="category" className='text-md font-semibold text-gray-800'>Category</label><br/>
                    <select id="category"  className='w-full border p-2 outline-none rounded'>
                        <option value="education">Education</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="fitness">Fitness</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="finance">Finance</option>
                    </select>
                </div>
                <div className='space-y-1'>
                    <label htmlFor="title" className='text-md font-semibold text-gray-800'>Title</label><br/>
                    <input id="title" type="text" placeholder="Enter post title" className='w-full border p-2 outline-none rounded'/>
                </div>
                <div className='space-y-1'>
                    <label htmlFor="description" className='text-md font-semibold text-gray-800'>Description</label><br/>
                    <textarea id="description" placeholder='Write your post...'  className='w-full h-[30vh] border p-2 outline-none rounded' />
                </div>
                <button className='bg-green-500 text-white font-semibold px-4 py-2 rounded-full'>Create post</button>
            </form>
        </div>
    )
}

export default CreatePost;