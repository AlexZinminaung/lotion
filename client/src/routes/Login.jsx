import { useReducer } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { loginUser } from '../configs/userApi'


function reducer(state, action) {
    switch (action.type)
    {
        case 'email':
            return {...state, email: action.nextValue}
        case 'password':
            return {...state, password: action.nextValue}
        case 'reset':
            return {...state, email: '', password: ''}
        default:
            return state
    }

}


function Login() {
    const [state, dispatch] = useReducer(reducer, {email: '', password: ''})
    const navigate = useNavigate()

    const handleEmail = (event) => {
        dispatch({type: 'email', nextValue: event.target.value})
    }

    const handlePassword = (event) => {
        dispatch({type: 'password', nextValue: event.target.value})
    }

    const handleReset = () => {
        dispatch({type: 'reset'})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await loginUser(state.email, state.password)
            if (response.status === 200)
            {
                 const { token } = response.data
                 localStorage.setItem('authToken', token)
                 navigate('/profile')
            }
        }

        catch (error)
        {
            alert('Wrong Email or password')
            handleReset()
        }
    }
    return (
        <div onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Login your account</h1>
            <form className="space-y-4 flex flex-col items-center">
                <input type="email" placeholder="Email" value={state.email} onChange={handleEmail}
                       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                <input type="password" placeholder="Password" value={state.password} onChange={handlePassword}
                       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                <input type="submit" value="Login" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition "/>
            </form>
            <Link to='/register' className="m-2 animate-bounce">Register New Account</Link>
        </div>
    )
}

export default Login