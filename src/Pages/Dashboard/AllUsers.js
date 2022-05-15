import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const AllUsers = () => {
    const { data, isLoading, refetch } = useQuery('allUsers', () =>
        fetch('http://localhost:5000/allUsers')
            .then(res => res.json())
    )

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='my-2 font-semibold'>No Of Users: {data?.length}</h2>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((a, index) => <tr>
                                <th>{index + 1}</th>
                                <td>{a.email}</td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;