import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-[90%] max-w-[800px] mx-auto'>
                <h2 className='text-white text-[3.5em] font-bold mb-6'>Welcome,</h2>
                <p className='text-white text-[2em] font-semibold mb-8'>
                    This is where your contacts will live. Click the button below to add a new contact.
                </p>
                <div>
                    <button onClick={()=>navigate('/contacts/new')} className="bg-transparent border-2 border-white text-white p-2 rounded-full w-80">
                        add your first contact
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;