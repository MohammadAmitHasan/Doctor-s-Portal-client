import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init'

const BookingModal = ({ treatment, date, setTreatment, refetch }) => {
    const { name, slots } = treatment;
    const [user] = useAuthState(auth);

    const handleBooking = e => {
        e.preventDefault();
        const slot = e.target.slot.value;
        const formattedDate = format(date, 'PP');
        const booking = {
            treatmentName: name,
            date: formattedDate,
            slot,
            userName: user.displayName,
            userEmail: user.email,
            phone: e.target.phone.value,
        }

        fetch('https://hasans-doctors-portal.herokuapp.com/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(booking),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    toast(`Appointment confirmed on ${formattedDate} at ${slot} for ${name}`)
                }
                else {
                    toast.error(`You already have an Appointment on ${formattedDate} for ${name}`)
                }
                console.log(data)
            })
        refetch()
        setTreatment(null)
    }

    return (
        <div>
            <input type="checkbox" id="Booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="Booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg text-center">{name}</h3>

                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-2 mt-5 justify-items-center'>
                        <input type="text" value={format(date, 'PP')} disabled className="input input-bordered input-secondary w-full max-w-xs" />
                        <select name='slot' className="select select-primary w-full max-w-xs">
                            {
                                slots.map((slot, index) => <option
                                    key={index}
                                    value={slot}>{slot}
                                </option>)
                            }
                        </select>
                        <input type="text" disabled value={user?.displayName} className="input input-bordered input-secondary w-full max-w-xs" />
                        <input type="email" disabled value={user?.email} className="input input-bordered input-secondary w-full max-w-xs" />
                        <input type="text" name='phone' placeholder="Phone Number" className="input input-bordered input-secondary w-full max-w-xs" />
                        <input type="submit" className="btn btn-secondary w-full max-w-xs" />
                    </form>
                </div>
            </div>
        </div >
    );
};

export default BookingModal;