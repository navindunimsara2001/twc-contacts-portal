import React from 'react'

interface ConfirmModalProps {
    visible: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmBox = ({ visible, message, onConfirm, onCancel }: ConfirmModalProps) => {
    const handleOnClose = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.id === 'container') onCancel();
    };
    if (!visible) return null;

    return (
        <div
            id='container'
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
        >
            <div className="bg-white p-6 rounded-3xl shadow-xl w-[75%] max-w-lg">
                <h2 className="text-lg font-semibold text-center mb-4 text-main">{message}</h2>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onConfirm}
                        className="bg-main text-white px-6 py-2 rounded-full hover:bg-teal-600 transition duration-200"
                    >
                        Yes
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-transparent border-2 border-main text-main px-6 py-2 rounded-full"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmBox