import React, { useState } from 'react';
import banner from '../../assets/images/chair.png'
import bg from '../../assets/images/bg.png'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';


const AppointmentBanner = () => {
    const [date, setDate] = useState(new Date());
    return (
        <div class="hero min-h-screen"
            style={{
                background: `url(${bg})`,
                backgroundSize: 'cover'
            }}>
            <div class="hero-content flex-col lg:flex-row-reverse lg:-mt-20">
                <img src={banner} alt='Chair' class="lg:max-w-xl rounded-lg shadow-2xl" />
                <div>
                    <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                    />
                    <p className='ml-2'>
                        You have selected {format(date, 'PP')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AppointmentBanner;