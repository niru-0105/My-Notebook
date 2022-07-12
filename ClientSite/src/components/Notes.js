import React, { useContext, useEffect, useRef ,useState} from 'react'
import NoteContext from '../context/notes/NoteContext'
import NotesItem from './NotesItem'


const Notes = () => {
    const context = useContext(NoteContext)
    const { notes, getAllNotes, editNote } = context
    const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:""})
    useEffect(() => {
        getAllNotes()
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const ref1 = useRef(null)
    const updateNote = (currentNote) => {
        ref.current.click()
        setnote({
            id : currentNote._id,
            etitle:currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag

        })
    }
    const onChange=(e)=>{
        setnote({
            ...note,[e.target.name]:e.target.value
        })
    }
    const handleClick=(e)=>{

        console.log('updating the note',note);
        editNote(note.id,note.etitle, note.edescription, note.etag)
        ref1.current.click()
        // addNote(note.title,note.description,note.tags)
    }

    

    

    let i = 0;
    return (
        <>

            <button type="button" ref={ref} className="btn btn-primary d-none " data-bs-toggle="modal" data-bs-target="#eexampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="eexampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="eexampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" onChange={onChange} value={note.etitle} minLength={5}  id="etitle" name="etitle"  />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edesc" className="form-label">Description</label>
                                    <input type="text" className="form-control" onChange={onChange} value={note.edescription} minLength={5}  id="edesc"  name="edescription" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etags" className="form-label">Tags</label>
                                    <input type="text" className="form-control" onChange={onChange} value={note.etag}  id="etags"  name="etag" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref = {ref1} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button  type="button" disabled={note.etitle<5 || note.edescription<5} onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>



            <h1>Your notes</h1>
            <div className="row my-3">
                {notes.map(note => {
                    return <NotesItem key={++i} updateNote={updateNote} note={note} />
                })}
            </div>

        </>
    )
}

export default Notes