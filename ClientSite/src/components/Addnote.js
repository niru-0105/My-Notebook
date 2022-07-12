import React, { useState } from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
const Addnote = () => {
    const context = useContext(NoteContext)
    const { addNote } = context


    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tags)
        setnote({ title: "", description: "", tags: "" })
    }

    const [note, setnote] = useState({ title: "", description: "", tags: "" })

    const onChange = (e) => {
        setnote({
            ...note, [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <h1>Add a note</h1>
            <div className="container my-3">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" onChange={onChange} value={note.title} id="title" minLength={5} name="title" required />
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">Description</label>
                        <input type="text" className="form-control" id="desc" onChange={onChange} value={note.description} name="description" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tags" className="form-label">Tags</label>
                        <input type="text" className="form-control" id="tags" value={note.tags} onChange={onChange} name="tags" />
                    </div>
                    <button disabled={note.title<5 || note.description<5} type="submit" onClick={handleClick} className="btn btn-primary">Add Note</button>
                </form>
            </div>
        </>
    )
}

export default Addnote