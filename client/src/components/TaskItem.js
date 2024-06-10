import React, { useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import { useNavigate } from 'react-router-dom';

function TaskItem({ task }) {
  const { toggleTaskCompletion, removeTask } = useContext(TaskContext);
  const navigate = useNavigate();

  return (
    <div className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => toggleTaskCompletion(task._id)}
      />
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Due: {task.dueDate}</p>
        <p>Priority: {task.priority}</p>
        <p>Category: {task.category}</p>
      </div>
      <button onClick={() => navigate(`/edit-task/${task._id}`)}>Edit</button>
      <button onClick={() => removeTask(task._id)}>Delete</button>
    </div>
  );
}

export default TaskItem;
