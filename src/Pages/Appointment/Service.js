import React from 'react';

const Service = ({ service, setTreatment }) => {
    const { name, slots } = service;
    return (
        <div class="card lg:max-w-lg shadow-xl text-center">
            <div class="card-body">
                <h2 class="card-title text-xl mx-auto text-secondary">{name}</h2>
                <p>
                    {
                        slots.length ?
                            <span>{slots[1]}</span>
                            :
                            <span className='text-red-500'>Try Another day</span>
                    }
                </p>
                <p>{slots.length} {slots.length > 1 ? 'Spaces' : 'Space'} Available</p>
                <div class="card-actions justify-center">
                    <label
                        onClick={() => setTreatment(service)}
                        disabled={slots.length === 0}
                        for="Booking-modal"
                        class="btn btn-secondary">Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default Service;