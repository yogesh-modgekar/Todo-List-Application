
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit} from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function Todo() {

    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])

    useEffect(()=>{
        let todoString = localStorage.getItem("todos")
        if(todoString){
            let todos = JSON.parse(localStorage.getItem("todos"))
            setTodos(todos)
        }
    },[])

    const saveData = (params) =>{
        localStorage.setItem("todos", JSON.stringify(todos))
    }

    const handleAdd = () => {
        setTodos([...todos, {id:uuidv4(), todo, isCompleted: false }])
        setTodo("")
        saveData()
    }

    const handleDelete = (e, id) => {
        let newTodos = todos.filter(item => {
            return item.id !== id
        });
        setTodos(newTodos)
        saveData()
    }

    const handleUpdate = (e, id) => {
        let t = todos.filter(i=>i.id === id)
        setTodo(t[0].todo)
        let newTodos = todos.filter(item => {
            return item.id !== id
        });
        setTodos(newTodos)
        saveData()
    }

    const handleChange = (e) => {
        setTodo(e.target.value)
    }

    const handleCheckbox = (e) => {
        let id = e.target.name
        let index = todos.findIndex(item => {
            return item.id === id;
        })
        let newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos)
        saveData()
    }

    return (
        <>
            <div className='md:container mx-auto my-5 bg-blue-400 p-5 rounded-xl min-h-[80vh] md:w-1/2'>

            <h1 className='font-bold text-center'>iTask - Manage your todos at one place</h1>

                <div className="addTodo my-5 flex flex-col gap-4">
                    <input type="text" onChange={handleChange} value={todo} placeholder='Enter your Todos' className='w-full p-1 rounded-lg' />
                    <button onClick={handleAdd} className='bg-green-600 text-white px-3 font-bold py-1 rounded-lg hover:bg-green-700 '>save</button>
                </div>

                <h1 className='text-xl font-bold'>Your Todos :</h1>

                <div className="todos">
                    {todos.length === 0 && <div className='m-5 text-red-600'>No Todos to Display..!</div>}
                    {
                        todos.map(item => {

                            return <div key={item.id} className="todo flex w-1/2 my-3 justify-between">

                                <div className='flex gap-5'>
                                    <input onChange={handleCheckbox} type="checkbox" value={item.isCompleted} name={item.id} id='' />
                                    <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                                </div>

                                <div className="buttons flex h-full">
                                    <button onClick={(e) => handleUpdate(e, item.id)} className='bg-yellow-300 hover:bg-yellow-400 text-white px-3 py-1 font-bold rounded-lg mx-1'><FaEdit /> </button>
                                    <button onClick={(e) => handleDelete(e, item.id)} className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 font-bold rounded-lg mx-1'><MdDelete /></button>
                                </div>
                        

                            </div>

                        })
                    }

                </div>


            </div>
        </>
    )
}

export default Todo