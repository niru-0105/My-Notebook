import React, { useState } from 'react'
import NoteContext from './NoteContext'


const host = "http://localhost:5000"




const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "62ac6a9f8c0b0912q0baee7c6",
      "user": "62a2e9d053bf4bb02a203816",
      "title": "Study",
      "description": "watch daily harry 5 tutorials",
      "tag": "study",
      "date": "2022-06-17T11:50:55.707Z",
      "__v": 0
    },
    {
      "_id": "62ad674d9fb7e881f23s910b9",
      "user": "62a2e9d053bf4bb02a203816",
      "title": "Chemistry",
      "description": "watch daily harry Chem",
      "tag": "study",
      "date": "2022-06-18T05:49:01.517Z",
      "__v": 0
    },
    {
      "_id": "62ad674d9fb7e881f239w10b9",
      "user": "62a2e9d053bf4bb02a203816",
      "title": "Chemistry",
      "description": "watch daily harry Chem",
      "tag": "study",
      "date": "2022-06-18T05:49:01.517Z",
      "__v": 0
    },
    {
      "_id": "62ad674d9fb7e881f2w3910b9",
      "user": "62a2e9d053bf4bb02a203816",
      "title": "Chemistry",
      "description": "watch daily harry Chem",
      "tag": "study",
      "date": "2022-06-18T05:49:01.517Z",
      "__v": 0
    },
    {
      "_id": "62ad674d9fb7es881f23910b9",
      "user": "62a2e9d053bf4bb02a203816",
      "title": "Chemistry",
      "description": "watch daily harry Chem",
      "tag": "study",
      "date": "2022-06-18T05:49:01.517Z",
      "__v": 0
    },
    {
      "_id": "62ad674d9fb7e8s81f23910b9",
      "user": "62a2e9d053bf4bb02a203816",
      "title": "Chemistry",
      "description": "watch daily harry Chem",
      "tag": "study",
      "date": "2022-06-18T05:49:01.517Z",
      "__v": 0
    },

    {
      "_id": "62ad674d9fb7e88xs1f23910b9",
      "user": "62a2e9d053bf4bb02a203816",
      "title": "Chemistry 3333333333333333",
      "description": "watch daily harry Chem",
      "tag": "study",
      "date": "2022-06-18T05:49:01.517Z",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(notesInitial)

  const getAllNotes=async()=>{
    const url = `${host}/api/notes/fetchAllNotes`
    const response = await fetch(url, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMmU5ZDA1M2JmNGJiMDJhMjAzODE2In0sImlhdCI6MTY1NDg0Mzg1Nn0.v-eV5Nw3YW9w82ryk8pnj6-ihWsukKWtj8PTASeMQEI'

      }
    });
    const json = await response.json()
    setNotes(json)
  }

  const addNote = async(title, description, tag) => {
    
    const url = `${host}/api/notes/addNote`
    const response = await fetch(url, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMmU5ZDA1M2JmNGJiMDJhMjAzODE2In0sImlhdCI6MTY1NDg0Mzg1Nn0.v-eV5Nw3YW9w82ryk8pnj6-ihWsukKWtj8PTASeMQEI'

      },
      body:JSON.stringify({title,description,tag})
    });
    const note = await response.json();
    setNotes(notes.concat(note))

  }

  const editNote = async (id, title, description, tag) => {

    const url = `${host}/api/notes/updateNote/${id}`
    await fetch(url, {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMmU5ZDA1M2JmNGJiMDJhMjAzODE2In0sImlhdCI6MTY1NDg0Mzg1Nn0.v-eV5Nw3YW9w82ryk8pnj6-ihWsukKWtj8PTASeMQEI'

      },
      body:JSON.stringify({title,description,tag})
    });

    

    let newNote = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNote.length; index++) {
      if (newNote[index]._id === id) {
        newNote[index].title = title
        newNote[index].description = description
        newNote[index].tag = tag
        break;
      }

    }
    setNotes(newNote)

  }
  const deleteNote = async id => {
    const url = `${host}/api/notes/deleteNote/${id}`
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMmU5ZDA1M2JmNGJiMDJhMjAzODE2In0sImlhdCI6MTY1NDg0Mzg1Nn0.v-eV5Nw3YW9w82ryk8pnj6-ihWsukKWtj8PTASeMQEI'

      }
    });
  
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }


  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote,getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState