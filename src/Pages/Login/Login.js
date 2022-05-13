import React from 'react';
import auth from '../../firebase.init';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

const Login = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    if (user) {
        console.log(user);
    }
    return (
        <div className='flex justify-center items-center h-[80vh]'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-2xl  font-semibold text-center">Login</h2>
                    <div className="divider">OR</div>
                    <button onClick={() => signInWithGoogle()} className="btn btn-outline w-full">Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;