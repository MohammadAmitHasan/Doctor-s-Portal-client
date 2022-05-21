import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51L1ZJ4A4Qye3rHidjC8HhO9zJZ0lGadBMT5OsZPrbrRDJhJWTGXnHMWBciEWCEMRtJ5BIuPJPjISg01nPybANkYE009MLMz9y0');

const Payment = () => {
    const { id } = useParams();
    const { data: appointment, isLoading } = useQuery(['booking', id], () =>
        fetch(`https://hasans-doctors-portal.herokuapp.com/booking/${id}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className='text-2xl text-center text-purple-600 font-semibold my-5'>Payment</h2>

            <div class="card max-w-xl bg-base-100 shadow-xl my-5 mx-auto">
                <div class="card-body">
                    <h3 className='text-2xl text-secondary font-semibold'>Hello, {appointment.userName}</h3>
                    <h2 className='text-3xl'>Please, Pay for {appointment.treatmentName}</h2>
                    <p className='text-lg'>Your Appointment: <span className='text-orange-700'>{appointment.date}</span> at <span className='text-orange-700'>{appointment.slot}</span></p>
                    <p>Payment Amount: ${appointment.price}</p>
                </div>
            </div>
            <div class="card max-w-xl bg-base-100 shadow-xl mx-auto">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm appointment={appointment} />
                    </Elements>
                </div>
            </div>

        </div>
    );
};

export default Payment;