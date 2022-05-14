import React from 'react';

const Service = ({ service, setTreatment }) => {
    const { name, slots } = service;
    return (
        <div className="card lg:max-w-lg shadow-xl text-center">
            <div className="card-body">
                <h2 className="card-title text-xl mx-auto text-secondary">{name}</h2>
                <p>
                    {
                        slots.length ?
                            <span>{slots[1]}</span>
                            :
                            <span className='text-red-500'>Try Another day</span>
                    }
                </p>
                <p>{slots.length} {slots.length > 1 ? 'Spaces' : 'Space'} Available</p>
                <div className="card-actions justify-center">
                    <label
                        onClick={() => setTreatment(service)}
                        disabled={slots.length === 0}
                        htmlFor="Booking-modal"
                        className="btn btn-sm btn-secondary">Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default Service;