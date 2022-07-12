import React,{useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'

const NotesItem = (props) => {
    const {note,updateNote}=props
    const context = useContext(NoteContext)
    const {deleteNote}=context

    const handleclick=()=>{
        deleteNote(note._id)
    }
    return (
        
        <>
        <div className="col-md-3">
            <div className="card my-3" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                </div>
                <div className=" my-2 d-flex justify-content-evenly">
                <i className="fa-solid fa-trash-can" onClick={handleclick}></i>
                <i className="fa-solid fa-pen-to-square" style={{cursor:"pointer"}} onClick={()=>updateNote(note)} ></i>
                </div>
            </div>
            </div>
        </>
    )
}

export default NotesItem