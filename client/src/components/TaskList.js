import React, { useContext, useEffect } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import TaskItem from './TaskItem';
import styles from '../styles/TaskList.module.css';

function TaskList() {
  const { tasks, loading } = useContext(TaskContext);

    if (loading) {
        return <div className={styles.loading}>Loading tasks...</div>;
    }

  return (
    <div className={styles.taskListContainer}>
      <h1 className={styles.taskListTitle}>Tasks</h1>
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
