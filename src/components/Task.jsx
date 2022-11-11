import React from 'react'
import {FaEdit, FaCheckCircle, FaRegTrashAlt} from "react-icons/fa"

const Task = ({task, index, deleteTask, getSingleTask, setToComplete}) => {
  return (
    <div className={task.completed === true ? "task completed": "task"}>
      <p>
        <b>{index + 1}. </b>
        {task.name}
      </p>
      <div className='task-icons'>
      <FaCheckCircle color="purple" onClick={() => setToComplete(task)} />
       <FaEdit onClick={() => getSingleTask(task)} color="green" />
       <FaRegTrashAlt color="red" onClick={() => deleteTask(task._id)} />
      </div>
    </div>
  )
}

export default Task