import React from 'react'

const TaskForm = ({createTask, handleInputChange, name, isEditing, updateTask}) => {
  return (
    <form className="task-form" onSubmit={isEditing ? updateTask : createTask}>
      <input placeholder='Add a task' 
      type="text" name="name" 
      value={name} 
      onChange={handleInputChange}  />
      <button type="submit">{isEditing ? "Edit" : "Add"}</button>
    </form>
  )
}

export default TaskForm