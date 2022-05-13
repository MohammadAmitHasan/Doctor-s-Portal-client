import { format } from 'date-fns';
import React from 'react';

const BookingModal = ({ treatment, date, setTreatment }) => {
    const { name, slots } = treatment;
    const handleBooking = e => {
        e.preventDefault();
        const slot = e.target.slot.value;
        console.log(slot)
        setTreatment(null)
    }
    return (
        <div>
            <input type="checkbox" id="Booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label for="Booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg text-center">{name}</h3>

                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-2 mt-5 justify-items-center'>
                        <input type="text" value={format(date, 'PP')} disabled className="input input-bordered input-secondary w-full max-w-xs" />
                        <select name='slot' className="select select-primary w-full max-w-xs">
                            {
                                slots.map(slot => <option key={slot._id} value={slot}>{slot}</option>)
                            }
                        </select>
                        <input type="text" placeholder="Name" className="input input-bordered input-secondary w-full max-w-xs" />
                        <input type="text" placeholder="Email" className="input input-bordered input-secondary w-full max-w-xs" />
                        <input type="text" placeholder="Phone Number" className="input input-bordered input-secondary w-full max-w-xs" />
                        <input type="submit" className="btn btn-secondary w-full max-w-xs" />
                    </form>
                </div>
            </div>
        </div >
    );
};

export default BookingModal;