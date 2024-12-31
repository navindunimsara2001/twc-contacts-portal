import React from 'react';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    return(
        <div className="grid grid-cols-2 grid-rows-1 bg-[url('/assets/auth-layout-bg.png')] w-full h-full bg-cover bg-no-repeat">
            <div className='my-auto mx-auto'>
                {children}
            </div>
            <div className='my-auto mx-auto'>
                <img src='/assets/company-logo.png' />
                <h2 className='text-main text-[4em] font-bold leading-3 mt-5'>Contacts</h2>
                <h2 className='text-main text-[4em] leading-2'>portal</h2>
            </div>
        </div>
    );
};

export default AuthLayout;