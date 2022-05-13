import React from 'react';
import banner from '../../assets/images/chair.png'
import bg from '../../assets/images/bg.png'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';


const AppointmentBanner = ({ date, setDate }) => {

    return (
        <div className="hero min-h-screen"
            style={{
                background: `url(${bg})`,
                backgroundSize: 'cover'
            }}>
            <div className="hero-content flex-col lg:flex-row-reverse lg:-mt-20">
                <img src={banner} alt='Chair' className="lg:max-w-xl rounded-lg shadow-2xl" />
                <div>
                    <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                    />
                </div>
            </div>
        </div>
    );
};

export default AppointmentBanner;