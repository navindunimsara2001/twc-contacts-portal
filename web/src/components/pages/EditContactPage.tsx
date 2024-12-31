import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { getContactById, updateContact } from '../../utils/api';
import { useMutation, useQuery } from '@tanstack/react-query';

const formSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: "Select a valid gender" })
  })
});

type FormData = z.infer<typeof formSchema>;

const EditContactPage = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: updateContact,
    onSuccess: () => {
      alert('Contact updated');
      reset();
      navigate('/contacts');
    },
    onError: () => {
      alert('Error in contact updated');
    }
  });

  const onSubmit = (data: FormData) => {
    if(id) mutation.mutate({id,...data});
  }

  const {id} = useParams();

  // Fetch existing user data
  const { data } = useQuery({
    queryKey: ['contact', id],
    queryFn: () => getContactById(id!),
    enabled: !!id,
  });

  // Set form values when data is fetched
  if (data) {
    setValue('fullName', data.fullName);
    setValue('email', data.email);
    setValue('phone', data.phone);
    setValue('gender', data.gender);
  }

  return (
    <>
      <h1 className='text-white text-[3.5em] font-bold ml-[20rem] mb-8'>Update Contact</h1>
      <div className='flex justify-center items-center'>
        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 grid-rows-2 gap-5 w-[55%]'>
          {/* full name */}
          <div>
            <input {...register("fullName")} className='w-80 px-4 py-2 bg-white rounded-full placeholder:text-main placeholder:pl-7 focus:outline-main font-semibold' type='text' placeholder='full name' />
            {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
          </div>
          {/* email */}
          <div>
            <input {...register("email")} className='w-80 px-4 py-2 bg-white rounded-full placeholder:text-main placeholder:pl-7 focus:outline-main font-semibold' type='text' placeholder='email' />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          {/* phone number */}
          <div>
            <input {...register("phone")} className='w-80 px-4 py-2 bg-white rounded-full placeholder:text-main placeholder:pl-7 focus:outline-main font-semibold' type='text' placeholder='phone number' />
            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
          </div>
          {/* gender */}
          <div className="w-80 mx-2 my-3">
            <div className="flex items-center space-x-4 ">
              <label className="text-white">Gender</label>

              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    {...register("gender")}
                    type="radio"
                    name="gender"
                    value="male"
                    className="w-5 h-5 bg-white border-gray-300 focus:ring-main peer-checked:bg-blue-500 peer-checked:border-blue-500"
                  />
                  <span className="text-white">Male</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    {...register("gender")}
                    type="radio"
                    name="gender"
                    value="female"
                    className="w-5 h-5 bg-white border-gray-300 focus:ring-main checked:bg-main"
                  />
                  <span className="text-white">Female</span>
                </label>
              </div>
              <br />
            </div>
            {errors.gender && <p className="text-red-500 block">{errors.gender.message}</p>}
          </div>
          {/* Submit Button */}
          <div className='my-5'>
            <button type="submit" className="bg-transparent border-2 border-white text-white p-2 rounded-full w-80">
              Update Contact
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditContactPage