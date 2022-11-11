import React, { useState, useEffect } from 'react'
import TaskForm from "./TaskForm"
import { toast } from 'react-toastify';
import { URL } from '../App';
import loader from '../assets/loader.gif'
import Task from "./Task"
import axios from "axios"

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [taskId, setTaskId] = useState()

  const [formData, setformData] = useState({
    name: "",
    completed: false
  })

 const { name } = formData

 const handleInputChange = (e) => {
    setformData((prev => {
        return {...prev, [e.target.name]: e.target.value}
    }))
 }

 const createTask = async (e) => {
    e.preventDefault()
    if(name === ""){
      return toast.error("Input field cannot be empty")
    }
    try {
      await axios.post(`${URL}/api/tasks`, formData)
      toast.success("Task has been added successfully")
      setformData({...formData, name: ""})
      getTasks()
    } catch (error) {
      toast.error(error.message)
    }
    
 }

 const getTasks = async () => {
    setLoading(true)
    try {
      const {data} = await axios.get(`${URL}/api/tasks`)
      setTasks(data)
      setLoading(false)
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
 }

 const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`)
      toast.success("Task has been delete")
      getTasks()
    } catch (error) {
      toast.error(error.message)
    }
 }

 const getSingleTask = async (task) => {
   setformData({name: task.name, completed: false})
   setTaskId(task._id)
   setIsEditing(true)
 }

 const updateTask = async (e) => {
  e.preventDefault()
  if(name === ""){
    return toast.error("Input field cannot be empty")
  }
  try {
    console.log(taskId)
    await axios.put(`${URL}/api/tasks/${taskId}`, formData)
    toast.success('Task has been updated')
    setformData({...formData, name: ""})
    setIsEditing(false)
    getTasks()
  } catch (error) {
    toast.error(error.message)
  }
 }

 const setToComplete = async (task) => {
    const newFormData= {
      name: task.name,
      completed: true
    }
    try {
      await axios.put(`${URL}/api/tasks/${task._id}`, newFormData)
      getTasks()
    } catch (error) {
      toast.error(error.message)
    }
 }

 useEffect(() => {
    const cTasks = tasks.filter((task) => task.completed === true)
    setCompletedTasks(cTasks)
 },[tasks])

 useEffect(() => {
    getTasks()
    console.log(completedTasks)
 }, [])


  return (
    <div>
      <h3>Task Manager</h3>
      <TaskForm name={name} handleInputChange={handleInputChange} createTask={createTask} isEditing={isEditing} updateTask={updateTask} />
      <div className='--flex-between --py'>
        {tasks.length > 0 && (
           <p>
           <b>Total tasks:</b> {tasks.length}
         </p>
        )}
        <p>
          <b>Completed tasks:</b> {completedTasks.length}
        </p>
      </div>
      <hr />
      {loading && (
        <div className='--flex-center'>
            <img src={loader} alt='loading image' />
        </div>
      )}
      {!loading && tasks.length === 0 ? (
        <p className='--py'>No task added. Please add a task</p>
      ) : (
          <>
            {tasks.map((task, index) => (
                <Task setToComplete={setToComplete} getSingleTask={getSingleTask} deleteTask={deleteTask} key={task._id} task={task} index={index} />
            ))}
          </>
      )}
    </div>
  )
}

export default TaskList