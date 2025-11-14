'use client';

export default function Error() {

    return (
        <div className='text-center p-12'>
            <h1>Something went wrong</h1>
            <button onClick={() => {
                window.location.reload();
            }}
                className='px-10 bg-red-500 text-white py-3 rounded-md mt-5 hover:bg-red-600 font-semibold'>
                Retry
            </button>
        </div>
    );
    
}