import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DefaultLayout: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!auth?.token){
            navigate('/login');
        }
    },[auth]);

    const logoutAction = ()=> {
        auth?.logout();
        navigate('/login');
    }
    
    return (
        <div className="grid grid-cols-1 grid-rows-3 bg-[url('/assets/default-layout-bg.png')] w-full h-full bg-cover bg-no-repeat">
            <div className='mx-[15em] mt-[2em]'>
                <img src='/assets/company-logo.png' />
                <h2 className='text-white text-[3em] font-bold leading-3 mt-5'>Contacts</h2>
                <h2 className='text-white text-[2em] leading-2'>portal</h2>
            </div>
            <div className='flex justify-center items-center'>
                <div className='w-[75%]'>
                    <Outlet/>
                </div>
            </div>
            <div>
                <div className='flex justify-end items-center mr-20 fixed bottom-20 right-20'>
                    <img src='/assets/bx_log-out-circle.svg' />
                    <h2 className='mx-1 text-lg text-white font-bold underline cursor-pointer' onClick={logoutAction}>Logout</h2>
                </div>
            </div>
        </div>
    );
};

export default DefaultLayout;