import { useEffect, useState } from "react";
const axios = require('axios');

const useToken = user => {
    const email = user?.user?.email;
    const [token, setToken] = useState('');
    useEffect(() => {
        if (email) {
            axios.put(`http://localhost:5000/user/${email}`,
                {
                    email
                })
                .then(data => {
                    setToken(data.data.token)
                    localStorage.setItem('accessToken', data.data.token)
                })
        }
    }, [user])
    return [token]
}

export default useToken;