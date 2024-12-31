import React from 'react';

interface AlertBoxProps {
    visible: boolean;
    onClose: () => void;
    message: string; // Prop for dynamic message
}

const AlertBox = ({ visible, onClose, message }: AlertBoxProps) => {
    const handleOnClose = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.id === 'container') onClose();
    };

    if (!visible) return null;

    return (
        <div
            id='container'
            onClick={handleOnClose}
            className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'
        >
            <div className='bg-white p-6 rounded-3xl shadow-xl w-[75%] max-w-lg'>
                <h2 className='text-main text-lg font-semibold text-center mb-4'>{message}</h2>
                <div className='flex justify-center'>
                    <button
                        onClick={onClose}
                        className='bg-main text-white px-6 py-2 rounded-full hover:bg-teal-600 transition duration-200'
                    >
                        Okay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertBox;