import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const MyAppointments = () => {

    const [appointments, setAppointments] = useState([]);
    const [user] = useAuthState(auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetch(`https://hasans-doctors-portal.herokuapp.com/myBookings?patient=${user.email}`, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        localStorage.removeItem('accessToken');
                        signOut(auth);
                        navigate('/')
                    }
                    return res.json()
                })
                .then(data => {
                    setAppointments(data)
                });
        }
    }, [user])

    return (
        <div>
            <h2 className='my-2 font-semibold'>My Appointments: {appointments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Treatment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.map((a, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{a.date}</td>
                                <td>{a.slot}</td>
                                <td>{a.treatmentName}</td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointments;