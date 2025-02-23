import axios from 'axios'
import qs from 'qs'

const url = import.meta.env.VITE_BASE_URL;

const createUser = async (name, email, password) => {
    const data = qs.stringify({
        name: name,
        email: email,
        password: password
    })
    
    try {
        const response = await axios.post(`${url}/api/users/register`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        return response
    }

    catch (error) {
        console.error(error)
    }

}

const loginUser = async (email, password) => {
    const data = qs.stringify({
        email: email,
        password: password
    });

    try {
        const response = await axios.post(`${url}/api/users/login`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response
    }

    catch (error) {
        console.error(error)
    }
}

const getProfile = async () => {
    try {
        const token = localStorage.getItem('authToken')
        const response = await axios.get(`${url}/api/users/profile`, {
            headers: { 'Authorization' : `Bearer ${token}`}
        })
        
        return response
    }

    catch (error)
    {
        console.error(error)
    }
}

export {createUser, loginUser, getProfile} 