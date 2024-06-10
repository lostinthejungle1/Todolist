import React, { useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/TaskItem.module.css';

function TaskItem({ task }) {
  const { toggleTaskCompletion, removeTask } = useContext(TaskContext);
  const navigate = useNavigate();

  return (
    <div className={`${styles.taskItem} ${task.isCompleted ?styles.completed:''}`}>
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
