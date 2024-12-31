import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createContact } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AlertBox from '../modal/AlertBox';

const formSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: "Select a valid gender" })
  })
});

type FormData = z.infer<typeof formSchema>;

const AddContactPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const mutation = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      setModalMessage('Your contact has beed saved successfully!');
      setModalVisible(true);
      reset();
    },
    onError: () => {
      setModalMessage('Error in contact creation');
      setModalVisible(true);
    }
  });

  const handleModalClose = () => {
    setModalVisible(false);
    navigate('/contacts');
  };

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  }

  return (
    <>
      <h1 className='text-white text-[3.5em] font-bold ml-[20rem] mb-8'>New Contact</h1>
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
                    checked
                    type="radio"
                    name="gender"
                    value="male"
                    className="w-5 h-5 bg-white border-gray-300 focus:ring-main peer-checked:bg-main"
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
              Add Contact
            </button>
          </div>
        </form>
      </div>
      <AlertBox visible={modalVisible} onClose={handleModalClose} message={modalMessage} />
    </>
  )
}

export default AddContactPage