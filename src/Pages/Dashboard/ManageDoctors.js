import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import { TrashIcon } from '@heroicons/react/solid'
import { toast } from 'react-toastify';

const ManageDoctors = () => {
    const { data: doctors, isLoading, refetch } = useQuery('doctors', () =>
        fetch('http://localhost:5000/doctors', {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }

    const deleteHandle = email => {
        const confirm = window.confirm('Are you sure.?')
        if (confirm) {
            fetch(`http://localhost:5000/doctor/${email}`, {
                method: 'DELETE',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success('Successfully Deleted')
                        refetch();
                    }
                })
        }
    }

    return (
        <div>
            <h2 className='my-2 font-semibold'>Manage Doctors: {doctors.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, index) => <tr key={doctor._id}>
                                <th>{index + 1}</th>
                                <th>
                                    <div className="avatar">
                                        <div className="w-16 rounded-full">
                                            <img alt='Doctor' src={doctor.image} />
                                        </div>
                                    </div>
                                </th>
                                <td>{doctor.name}</td>
                                <td>{doctor.specialty}</td>
                                <td>
                                    <TrashIcon onClick={() => deleteHandle(doctor.email)} className='w-10 h-10 p-2 rounded-full text-red-600 hover:bg-red-600 hover:text-white'></TrashIcon>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageDoctors;