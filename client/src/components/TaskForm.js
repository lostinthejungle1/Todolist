import React, { useState, useContext, useEffect } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/TaskForm.module.css';

function TaskForm() {
  const { addNewTask, updateExistingTask, tasks } = useContext(TaskContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    category: '',
    isCompleted: false
  });

  useEffect(() => {
    if (id) {
      const taskToEdit = tasks.find(t => t._id === id);
      if (taskToEdit) {
        setTask({...taskToEdit,
          dueDate:taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : ''
        });
      }
    }
  }, [id, tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateExistingTask(id, task);
    } else {
      addNewTask(task);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.taskForm}>
      <label>
        Title:
        <input
          type="text"
          value={task.title}
          onChange={e => setTask({ ...task, title: e.target.value })}
          required
          maxLength={100}
        />
      </label>
      <label>
        Description:
        <textarea
          value={task.description}
          onChange={e => setTask({ ...task, description: e.target.value })}
          maxLength={500}
        />
      </label>
      <label>
        Due Date:
        <input
          type="date"
          value={task.dueDate}
          onChange={e => setTask({ ...task, dueDate: e.target.value })}
        />
      </label>
      <label>
        Priority:
        <select
          value={task.priority}
          onChange={e => setTask({ ...task, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>
      <label>
        Category:
        <input
          type="text"
          value={task.category}
          onChange={e => setTask({ ...task, category: e.target.value })}
          maxLength={20}
        />
      </label>
      <label>
        Completed:
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={e => setTask({ ...task, isCompleted: e.target.checked })}
        />
      </label>
      <button type="submit">Save Task</button>
    </form>
  );
}

export default TaskForm;
