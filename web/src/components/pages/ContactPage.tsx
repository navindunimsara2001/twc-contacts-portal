import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deteleteContact, getContacts } from '../../utils/api'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AlertBox from '../modal/AlertBox';
import { Contact } from '../../utils/types';
import ConfirmBox from '../modal/ConfirmBox';

const ContactPage = () => {
  const { data } = useQuery({ queryKey: ['contacts'], queryFn: getContacts });
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  const editContact = (id: string) => {
    navigate(`/contacts/edit/${id}`);
  }

  const queryClient = useQueryClient();

  const deleteContactById = (id: string) => {
    mutation.mutate(id);
  }

  const mutation = useMutation({
    mutationFn: deteleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      setModalMessage('Your contact has beed deleted successfully!');
      setModalVisible(true);
    },
    onError: () => {
      setModalMessage('Error in contact deletion');
      setModalVisible(true);
    }
  });

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const getAvatar = (gender: string) => {
    return gender === 'male' ? '/public/assets/male-avatar.png' : '/public/assets/female-avatar.png'
  }

  const deleteClick = (contact: Contact) => {
    setConfirmMessage(`Do you want to delete the contact "${contact.fullName}"?`);
    setSelectedId(contact.id!);
    setConfirmVisible(true);
  }

  const handleCancelDeletion = () => {
    setConfirmVisible(false);
  }

  const handleConfirmDeletion = () => {
    if (selectedId) {
      deleteContactById(selectedId);
      setModalVisible(false);
    }
  }

  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        <div className='w-[65%] min-h-[80vh] flex flex-col justify-center'>
          <div className='flex items-center mb-8'>
            <div>
              <h1 className='text-white font-bold text-[3.5em]'>Contacts</h1>
            </div>
            <div className='flex-grow'></div>
            <div>
              <button
                onClick={() => navigate('/contacts/new')}
                className="bg-transparent border-2 border-white text-white p-2 rounded-full px-5">
                Add new Contact
              </button>
            </div>
          </div>

          <div className='text-main overflow-hidden'>
            <div className="max-h-[500px] overflow-y-scroll scrollbar-hidden rounded-xl no-scrollbar">
              <table className="w-full table-auto bg-white">
                <thead className='font-semibold sticky top-0 bg-white shadow-md'>
                  <tr>
                    <th className='p-4'></th>
                    <th className='p-4 text-center'>Full Name</th>
                    <th className='p-4 text-center'>Gender</th>
                    <th className='p-4 text-center'>Email</th>
                    <th className='p-4 text-center'>Phone Number</th>
                    <th className='p-4'></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data?.map((contact) =>
                      <tr className="border-b">
                        <td className='p-4'><img width='49px' src={getAvatar(contact.gender)} /></td>
                        <td className='p-4 text-center'>{contact.fullName}</td>
                        <td className='p-4 text-center'>{contact.gender}</td>
                        <td className='p-4 text-center'>{contact.email}</td>
                        <td className='p-4 text-center'>{contact.phone}</td>
                        <td className='grid grid-cols-2 gap-2 p-4  justify-center items-center'>
                          <img src='/public/assets/edit-icon.svg'
                            onClick={() => editContact(contact.id!)}
                            className='cursor-pointer' />
                          <img src='/public/assets/delete-icon.svg'
                            onClick={() => deleteClick(contact)}
                            className='cursor-pointer' />
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <AlertBox visible={modalVisible} onClose={handleModalClose} message={modalMessage} />
      <ConfirmBox visible={confirmVisible} onCancel={handleCancelDeletion} onConfirm={handleConfirmDeletion} message={confirmMessage} />
    </>
  )
}

export default ContactPage