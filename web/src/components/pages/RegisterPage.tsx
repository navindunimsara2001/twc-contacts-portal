import { z } from 'zod';
import AuthLayout from '../layouts/AuthLayout'
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { userRegister } from '../../utils/api';

const formSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is Required"),
  confirmPassword: z.string().min(1, "Re-enter password"),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirmPassword']
    });
  }
});

type FormData = z.infer<typeof formSchema>;

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const navigate = useNavigate();

  const onSubmit = (data: { email: string, password: string }) => {
    mutation.mutate(data);
  }

  const mutation = useMutation({
    mutationFn: userRegister,
    onSuccess: () => {
      alert('registered');
      reset()
      navigate('/login')
    },
    onError: () => {
      alert('Fail to register');
    }
  });

  return (
    <AuthLayout>
      <h1 className='text-white font-bold text-[3.5em] mb-8'>Register Now!</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='my-5'>
            <input {...register("email")} className='w-80 px-4 py-2 bg-white rounded-full placeholder:text-main placeholder:pl-7 focus:outline-main font-semibold' type='text' placeholder='e-mail' />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div className='my-5'>
            <input {...register("password")} className='w-80 px-4 py-2 bg-white rounded-full placeholder:text-main placeholder:pl-7 focus:outline-main font-semibold' type='password' placeholder='create password' />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <div className='my-5'>
            <input {...register("confirmPassword")} className='w-80 px-4 py-2 bg-white rounded-full placeholder:text-main placeholder:pl-7 focus:outline-main font-semibold' type='password' placeholder='confirm password' />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
          </div>
          <div className='mt-5'>
            <button type="submit" className="bg-transparent border-2 border-white text-white p-2 rounded-full px-5">
              Register
            </button>
          </div>
        </form>
        <div className='mt-10'>
          <h1 className='underline text-white font-semibold cursor-pointer' onClick={()=> navigate('/login')}>{'<'} Back to login</h1>
        </div>
      </div>
    </AuthLayout>
  )
}

export default RegisterPage