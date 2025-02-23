import { useEffect, useReducer } from "react";
import { createNote, getAllNotes, getNote, deleteNote } from "../configs/noteApi";

function reducer(state, action) {
    // ...
    switch (action.type)
    {
        case 'toggle':
            return {...state, isOpen: !action.nextValue}
        
        case 'get_notes':
            return {...state, notes: action.nextValue}  
        case 'add_new':
            return {...state, isNew: true}
        case 'cancel_new':
            return {...state, isNew: false, newTitle: ''}
        case 'change_new_title':
            return {...state, newTitle: action.newValue}
        case 'clear_text':
            return {...state, newTitle: '', isNew: false}
        default:
            return state
    }
  }

function Sidebar({handleSwitchNote}) {
    const [state, dispatch] = useReducer(reducer, { isOpen: false, notes: [], isNew : false, newTitle: '' });

    const handleTogle = (value) => {
        dispatch({type: 'toggle', nextValue: value})
    }

    const HandleFetch = (value) => {
        dispatch({type: 'get_notes', nextValue: value})
    }

    const addNew = () => {
        dispatch({type: 'add_new'})   
    }

    const cancelNew = () => {
        dispatch({type: 'cancel_new'})
    }

    const handleChangeNewTitle = (event) => {
        dispatch({type: 'change_new_title', newValue: event.target.value})
    }

    const switchNote = (title, text, id) => {
        handleSwitchNote({title: title, text: text, id: id})
    }

    const onCreate = async (title) => {
        try {
            const response = await createNote(title)
            const data = response.data
            dispatch({type: 'clear_text'})
            switchNote(data.note.title, data.note.text, data.note._id)
        }

        catch (error)
        {   
            alert('DO not use the Same title')
            dispatch({type: 'clear_text'})
            console.log(error.message)
        }

    }

    const getNotes = async() => {
        try {
            const response = await getAllNotes()
            HandleFetch(response.data)
            return response.data
        }

        catch (error)
        {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getNotes()

    }, [state.isOpen, state.notes])


    const fetchNote = async (id) => {
        try {
            const response = await getNote(id)
            switchNote(response.data.title, response.data.text, id)
        }
        catch (error)
        {
            console.log('Error fetching Note')
        }
    }
    
    const handleDeleteNote = async (id) => {
        try {
            await deleteNote(id)
            const notes = await getNotes()
            const {title, text, _id} = notes[0] 
            switchNote(title, text, _id)

        }

        catch (error)
        {
            console.log(error.message)
        }
    } 

    return (
        <div className={`overfloor-hide h-screen bg-gray-800 text-white flex flex-col justify-between transition-all duration-300 shadow-lg ${state.isOpen ? "w-60" : "w-20"}`}>
            <div className="w-full flex-grow overflow-hidden flex flex-col">
                <div className="flex justify-between items-center p-3">
                <button onClick={() => {handleTogle(state.isOpen)}} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition flex items-center justify-center">
                
                <div className="w-10 h-10 flex items-center justify-center bg-gray-900 rounded-full shadow-md">
                    <img src="/folder.png" className="w-6 h-6 filter invert" />
                </div>

                </button>
                    <h1 className={`text-lg font-semibold transition-all duration-300 ${state.isOpen ? "opacity-100" : "opacity-0 hidden"}`}>Zin Min Aung</h1>
                </div>

                {!state.isNew ? <button onClick={addNew}
                                        className={`flex justify-around w-full text-left py-2 px-3 hover:bg-gray-700 transition ${state.isOpen ? "opacity-100" : "opacity-0 hidden"}`}> 
                    <img src='./plus.png' className="w-6 h-6 filter invert"/> Add New Note 
                </button> : 
                <div className="flex flex-col p-2">
                    <input type="text" placeholder="Enter title" value={state.newTitle} onChange={handleChangeNewTitle} required
                           className={`bg-gray-700 flex justify-around w-full text-left py-2 px-3 hover:bg-gray-700 transition ${state.isOpen ? "opacity-100" : "opacity-0 hidden"}`}/>
                    <button onClick={() => {onCreate(state.newTitle)}}
                           className={`w-full mt-2 text-left py-2 px-3 rounded-lg hover:bg-gray-700 transition ${state.isOpen ? "opacity-100" : "opacity-0 hidden"}`}>Create</button>
                    <button onClick={cancelNew}
                           className={`w-full mt-2 text-left py-2 px-3 rounded-lg hover:bg-gray-700 transition ${state.isOpen ? "opacity-100" : "opacity-0 hidden"}`}>Cancel</button>
                </div>
                
                }

                <ul className="flex flex-col mt-4 space-y-2 px-4 overflow-auto flex-grow">
                    {state.notes.map(note => {
                        return (
                            <li key={note._id} className="flex items-center justify-between">
                            <button onClick={() => {fetchNote(note._id)}} className={`flex-1 text-left min-w-0 overflow-hidden py-2 px-3 rounded-lg hover:bg-gray-700 transition ${state.isOpen ? "opacity-100" : "opacity-0 hidden"}`}>{note.title}</button>
                            <button onClick={() => {handleDeleteNote(note._id)}}
                                    className={`rounded-lg hover:bg-gray-700 min-w-10 p-2  transition ${state.isOpen ? "opacity-100" : "opacity-0 hidden"}`}><img src="./bin.png" className="w-5 h-5"/></button>
                            </li>
                        )
                    })}

                </ul>

            </div>

            <button className={` w-full text-left py-2 px-3 hover:bg-gray-700 transition ${state.isOpen ? "opacity-100" : "opacity-0 hidden"}`}>Log out</button>
        </div>
    );
}

export default Sidebar;
