import axios from 'axios'
import qs from 'qs'

const url = import.meta.env.VITE_BASE_URL;

const createNote = async (title, text) => {
    const data = qs.stringify({
        title,
        text,
    })
    
    try {
        const token = localStorage.getItem('authToken')
        const response = await axios.post(`${url}/api/users/create_note`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : `Bearer ${token}`
            }
        })
        return response
    }

    catch (error) {
        console.error(error)
    }

}

const getAllNotes = async () => {
    
    try {
        const token = localStorage.getItem('authToken')
        const response = await axios.get(`${url}/api/users/get_all_notes`,
            {
                headers: { 'Authorization' : `Bearer ${token}`}
            }
        )
        return response
    }

    catch (error) {
        console.error(error.message)
    }

}

const getNote = async (id) => {

    try {
        const token = localStorage.getItem('authToken')
        const response = await axios.get(`${url}/api/users/get_note/${id}`,
            {
                headers: { 'Authorization' : `Bearer ${token}`}
            }
        )
        return response
    }

    catch (error) {
        console.error(error.message)
    }

}


const modifyNote = async (id, title, text) => {
    const data = qs.stringify({
        title,
        text,
    })
    try {
        const token = localStorage.getItem('authToken')
        const response = await axios.put(`${url}/api/users/modify_note/${id}`, data ,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : `Bearer ${token}`
            }
        })
        return response
    }

    catch (error) {
        throw error
    }

}


const deleteNote = async (id) => {

    try {
        const token = localStorage.getItem('authToken')
        const response = await axios.delete(`${url}/api/users/delete_note/${id}`,
            {
                headers: { 'Authorization' : `Bearer ${token}`}
            }
        )
        return response
    }

    catch (error) {
        console.error(error.message)
    }

}

export  {createNote, getAllNotes, getNote, modifyNote, deleteNote}