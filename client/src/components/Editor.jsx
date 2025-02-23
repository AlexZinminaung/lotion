import { useReducer } from "react"

function reducer(state, action) {
    switch (action.type)
    {
        case 'notEdit':
            return {...state, isEdit: false}
        
        case 'edit':
            return {...state, isEdit: true}
        default:
            return state
    }

}

function Editor ({note, changeTitle, changeText, onSave}) 
{

    const [state, dispatch] = useReducer(reducer, {isEdit: false})
    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch({type: 'notEdit'})
        onSave(note.id, note.title, note.text)
    }
   


    const handleClick = (id, title, text) => {
        dispatch({type: 'edit'})

    }

    const handleChangeTitle = (event) => {
        changeTitle(event.target.value)
    }

    const handleChangeText = (event) => {
        changeText(event.target.value)
    }


    if (!note.id)
    {
        return (
            <div className="w-full h-screen p-6 bg-gray-900 text-white flex flex-col">
                <div className="max-w-4xl mx-auto w-full bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <h1 className="text-2xl font-bold text-gray-100 mb-4">Welcome to Lotion</h1>
                    <p className="text-gray-300 text-lg leading-relaxed mb-2">Click the existed file of crate a new one</p>
                </div>
            </div>)
    }

    else if (!state.isEdit)
    {
        return (
            <div className="w-full h-screen p-6 bg-gray-900 text-white flex flex-col">
                <div className="max-w-4xl mx-auto w-full bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <h1 className="text-2xl font-bold text-gray-100 mb-4">{note.title || "Untitled Note"}</h1>
                    <p className="text-gray-300 text-lg leading-relaxed mb-2">{note.text || "No content available."}</p>
                    <button onClick={() => {handleClick(note.id, note.title, note.text)}}  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">Edit</button>
                </div>
            </div>

    )
    }

    else {
        return (
            <div className="w-full h-screen p-6 bg-gray-900 text-white flex flex-col">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto w-full bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <input value={note.title} onChange={handleChangeTitle} type="text" className="w-full p-2 text-2xl font-bold bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500 mb-1" />
                    <textarea value={note.text} onChange={handleChangeText} className="w-full h-60 p-2 text-lg bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"> </textarea>
                    <input type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"/>
                </form>
            </div>
        )
    }
}


export default Editor

