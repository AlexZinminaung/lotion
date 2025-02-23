import { Link, useNavigate } from 'react-router-dom'
import { useReducer } from 'react'
import { createUser } from '../configs/userApi'

function reducer(state, action) {
    switch (action.type)
    {
        case 'name':
            return {...state, name: action.nextValue}

        case 'email':
            return {...state, email: action.nextValue}
        case 'password':
            return {...state, password: action.nextValue}
        
        default:
            return state
    }
  }



function Register() {
    
    const [state, dispatch] = useReducer(reducer, { name: '', email: '', password: '' });
    const navigate = useNavigate()

    const handleName = (event) => {
        dispatch({type: 'name', nextValue: event.target.value})
    }

    const handleEmail = (event) => {
        dispatch({type: 'email', nextValue: event.target.value})
    }

    const handlePassword = (event) => {
        dispatch({type: 'password', nextValue: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        try {
            const response = await createUser(state.name, state.email, state.password)
            console.log(response)
            if (response.status === 200 || response.status === 201)
            {
                navigate('/redirect_sucess')
            }

            else {
                navigate('/redirect_fail')
            }
        }

        catch (error)
        {
            console.error(error)
        }
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Register your account</h1>
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
                <input type="text" required placeholder="Name" value={state.name} onChange={handleName} 
                       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>  
                <input type="email" required placeholder="Email" value={state.email} onChange={handleEmail}
                       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                <input type="password" required placeholder="Password"  value={state.password} onChange={handlePassword}
                       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>  
                <input type="submit" required value="Register" 
                       className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"/>  
            </form>
            <Link to='/Login' className="m-2 animate-bounce">Login</Link>
        </div>
    )
}


export default Register
