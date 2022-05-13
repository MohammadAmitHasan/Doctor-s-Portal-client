import React from 'react';
import auth from '../../firebase.init';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Loading from '../Shared/Loading';

const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);



    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
    }

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    if (gUser || user) {
        console.log(gUser, user);
    }

    let loginError;
    if (error || gError) {
        loginError = <p className='bg-red-500 text-white text-center py-3 px-2 rounded-lg'>
            {error?.message}{gError?.message}
        </p>
    }

    if (true || loading || gLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='flex justify-center items-center h-[80vh]'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-2xl font-semibold text-center">Login</h2>


                    <form className='grid grid-cols-1 gap-3' onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Your Email" className="input input-bordered w-full max-w-xs"
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


                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Your Password" className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Minimum 6 character or longer'
                                    }
                                })}
                            />
                            {errors.password?.type === 'required' &&
                                <p className='text-red-500 mt-1 rounded-lg'>
                                    {errors.password.message}
                                </p>}
                            {errors.password?.type === 'minLength' &&
                                <p className='text-red-500 mt-1 rounded-lg'>
                                    {errors.password.message}
                                </p>}

                        </div>
                        {loginError}
                        <input className='btn w-full' type="submit" />
                    </form>


                    <div className="divider">OR</div>
                    <button onClick={() => signInWithGoogle()} className="btn btn-outline w-full">Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;