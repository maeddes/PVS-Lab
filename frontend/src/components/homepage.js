import './homepage.css';
import React, { useState } from "react";

function HomePage() {
  const [taskId, setTaskId] = useState([123]);
  const [name, setName] = useState(['Person1']);
  const [date, setDate] = useState(['2023-29-11']);
  //const [timeslot, setTimeslot] = useState([]);
  const [desc, setDesc] = useState(['very gud task.']);

  const Task = () => {
    return <div className='task'>
      <p>{taskId}</p>
      <p>{name}</p>
      <p>{desc}</p>
    </div>
  }

  return (
    <div id='container'>
      <h1>Task Manager</h1>
      <input id='calendar' type="date"></input>
      <div id='taskHolder'>
        <Task />
        <Task />
        <Task />
      </div>
    </div>

  );
}

export default HomePage;