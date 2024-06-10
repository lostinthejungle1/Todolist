import React, { useContext, useEffect } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import TaskItem from './TaskItem';

function TaskList() {
  const { tasks, loading } = useContext(TaskContext);

    if (loading) {
        return <div>Loading tasks...</div>;
    }

  return (
    <div>
      <h1>Tasks</h1>
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
