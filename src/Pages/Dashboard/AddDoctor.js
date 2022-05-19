import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query'
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading'

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imagebbKey = '50f71ff2e37c5769a41fef5f905888a8';
    const onSubmit = async data => {
        const image = data.image[0];
        const url = `https://api.imgbb.com/1/upload?key=${imagebbKey}`;
        const formData = new FormData();
        formData.append('image', image);
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(result => {
                if (result.success === true) {
                    const imageURL = result.data.url;
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imageURL,
                    }
                    fetch('http://localhost:5000/doctor', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(doctor => {
                            console.log(doctor)
                            if (doctor.insertedId) {
                                toast.success('Added The doctor successfully');
                                reset();
                            }
                        })
                }
            })
    }

    const { data: services, isLoading } = useQuery('services', () =>
        fetch('http://localhost:5000/services')
            .then(res => res.json())
    )

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='my-2 font-semibold'>Add a Doctor</h2>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full max-w-xs grid grid-cols-1 gap-3 p-2">

                        <div>
                            <label className="label">
                                <span className="label-text">Doctor's Name</span>
                            </label>
                            <input type="text" placeholder="Doctor's Name" className="input input-bordered w-full max-w-xs"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'User Name required'
                                    }
                                })}
                            />
                            {errors.email?.type === 'required' &&
                                <p className='text-red-500 mt-1 rounded-lg'>
                                    {errors.email.message}
                                </p>}
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Doctor's Email</span>
                            </label>
                            <input type="email" placeholder="Doctor's Email" className="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Provide a valid email'
                                    },
                                    required: {
                                        value: true,
                                        message: 'Email required'
                                    }
                                })}
                            />
                            {errors.email?.type === 'required' &&
                                <p className='text-red-500 mt-1 rounded-lg'>
                                    {errors.email.message}
                                </p>}
                            {errors.email?.type === 'pattern' &&
                                <p className='text-red-500 mt-1 rounded-lg'>
                                    {errors.email.message}
                                </p>}
                        </div>


                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Specialty</span>
                            </label>
                            <select class="select select-bordered"
                                {...register("specialty")}
                            >
                                {
                                    services?.map(service => <option
                                        key={service._id}
                                        value={service.name}
                                    >{service.name}</option>)
                                }
                            </select>
                        </div>

                        <div className=''>
                            <label className="label">
                                <span className="label-text">Doctor's Image</span>
                            </label>
                            <input type="file" className="input input-bordered w-full max-w-xs"
                                {...register("image", {
                                    required: {
                                        value: true,
                                        message: 'Doctors Image required'
                                    }
                                })}
                            />
                            {errors.image?.type === 'required' &&
                                <p className='text-red-500 mt-1 rounded-lg'>
                                    {errors.image.message}
                                </p>}
                        </div>

                        <input className='btn w-full max-w-xs mt-3' type="submit" value='Add' />
                    </div>



                </form>
            </div>
        </div>
    );
};

export default AddDoctor;