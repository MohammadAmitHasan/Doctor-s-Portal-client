import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';

const AllUsers = () => {
    const { data, isLoading, refetch } = useQuery('allUsers', () =>
        fetch('http://localhost:5000/allUsers', {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
    )

    if (isLoading) {
        return <Loading></Loading>
    }

    const makeAdmin = email => {
        fetch(`http://localhost:5000/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    toast.error('Forbidden Access')
                }
                res.json()
            })
            .then(adminData => {
                if (adminData.modifiedCount > 0) {
                    toast.success('Successfully made an admin')
                    refetch();
                }
            })
    }

    return (
        <div>
            <h2 className='my-2 font-semibold'>No Of Users: {data?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((a, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{a.email}</td>
                                <td>{a.role !== 'admin' && <button onClick={() => makeAdmin(a.email)} className="btn btn-xs">Make Admin</button>}
                                </td>
                                <td><button className="btn btn-xs">Remove</button></td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;