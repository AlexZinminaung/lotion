import { useState } from "react"
import Sidebar from '../components/Sidebar'
import Editor from "../components/Editor"
import { modifyNote } from "../configs/noteApi"

function Profile() {

    const [note, setNote] = useState({title: '', text: '', id: ''})
    const [prevNote, setPrevNote] = useState(null)

    const handleSwitchNote = (newNote) => {
        setPrevNote(newNote);
        setNote(newNote)

    }

    const changeTitle = (newTitle) => {
        setNote({...note, title: newTitle})
    }

    const changeText = (newText) => {
        setNote({...note, text: newText})
    }
 
    const onSave = async (id, title, text) =>
        {
            try {
                
                await modifyNote(id, title, text)
            }
    
            catch(error) {
                handleSwitchNote(prevNote)
                alert('Can not leave the title Blank')
            }
        }

    
    return (
        <div className="flex">
            <Sidebar handleSwitchNote={handleSwitchNote}/>
            <Editor note={note} changeTitle={changeTitle} changeText={changeText} onSave={onSave}/>
        </div>
    )
}

export default Profile