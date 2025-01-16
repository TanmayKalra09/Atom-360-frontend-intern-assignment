import React, { useEffect,useState } from "react";
import "./Tables.css"
import Sidebar from "./Sidebar";

const Author=()=>{
    const [author,setAuthor] =useState([]);
    const [newAuthor,setNewAuthor] =useState("");
    const [updateAuthorName,setUpdateAuthorName]=useState("");
    const [updateAuthorId,setUpdateAuthorId] = useState(null);

    const fetchAuthor=async()=>{
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await response.json()
        setAuthor(data);

    }

    const addAuthor=async()=>{
        const response = await fetch("https://jsonplaceholder.typicode.com/users",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({name: newAuthor})
        })
        const data = await response.json()
        setAuthor([...author,data])
        setNewAuthor("");
    }

    const deleteAuthor=async(id)=>{
        await fetch(`{https://jsonplaceholder.typicode.com/users/${id}}`,{method: "DELETE"});
            setAuthor(author.filter((author)=>author.id!=id))
    }

    const updateAuthor=async(id)=>{
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {method: "PUT" ,
             headers: {"Content-Type" : "application/json"},body: JSON.stringify({id, name: updateAuthorName}),})
             const data = await response.json()
             setAuthor(author.map((author)=>author.id===id ? data:author))
             setUpdateAuthorName("")
             setUpdateAuthorId(null)

    }

    useEffect(()=>{
        fetchAuthor()
    },[])

    return(
        <div>
                <Sidebar></Sidebar>
                
        <div className="table">

            <h1>Authors Table</h1>
            <input type="text" placeholder="New Author Name..." value={newAuthor} onChange={(e)=>setNewAuthor(e.target.value)}
            className="w-1/4 full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
            <button onClick={addAuthor} className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Add Author</button>
            {updateAuthorId && (
                <div>
                    
                    <input type="text" placeholder="Update Author Name..." value={updateAuthorName} onChange={(e)=>setUpdateAuthorName(e.target.value)}
                    className="w-1/2 full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                    <button onClick={()=>updateAuthor(updateAuthorId)} className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Update Name</button>
                </div>
            )}
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {author.map((person)=>(
                        <tr key={person.id}>
                            <td>{person.id}</td>
                            <td>{person.name}</td>
                            <td>
                                <button onClick={()=>deleteAuthor(person.id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                                <button onClick={()=>{setUpdateAuthorId(person.id) ; setUpdateAuthorName(person.name)}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit Author Name</button>
                                </td>
                        </tr> 
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default Author;