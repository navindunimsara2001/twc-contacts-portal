import { z } from 'zod';
import AuthLayout from '../layouts/AuthLayout'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is Required"),
});

type FormData = z.infer<typeof formSchema>;


const LoginPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const navigate = useNavigate();

  const onSubmit = (data: {email: string, password: string})=>{
    mutation.mutate(data);
  }

  const mutation = useMutation({
    mutationFn: useAuth()?.login,
    onSuccess: () => {
      alert('Logged');
      reset()
      navigate('/contacts')
    },
    onError: () => {
      alert('Fail to log');
    }
  });


  return (
    <AuthLayout>
      <h1 className='text-white font-bold text-[3.5em]'>Hi there,</h1>
      <h1 className='text-white font-semibold text-[2em]'>Welcome to our <br /> contacts portal</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='my-5'>
            <input {...register('email')} className='w-80 px-4 py-2 bg-white rounded-full placeholder:text-main placeholder:pl-7 focus:outline-main font-semibold' type='text' placeholder='e-mail' />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div className='my-5'>
            <input {...register('password')} className='w-80 px-4 py-2 bg-white rounded-full placeholder:text-main placeholder:pl-7 focus:outline-main font-semibold' type='password' placeholder='password' />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <div className='flex items-center'>
            <button type="submit" className="bg-transparent border-2 border-white text-white p-2 rounded-full px-5">
              Login 
            </button>
            <h1 className='mx-5 text-white'>or</h1>
            <h1 className='text-white underline font-semibold cursor-pointer' onClick={()=> navigate('/register')}>Click here to Register</h1>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default LoginPage