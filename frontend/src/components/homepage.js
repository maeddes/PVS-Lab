import './homepage.css';
import React, { useState } from "react";
import axios from 'axios';

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

  const testTask = {
    id: 1,
    name: "idk",
    date: "2023-10-10",
    timeslot: 1,
    description: "test task"
  }

  //API CALLS TO BACKEND
  async function createTask() {
    let json = JSON.stringify(testTask);
    await axios.put('/task/create', { json }).then((result) => {
      console.log(result)
    });
  }
  async function updateTask(){
    let json = JSON.stringify(testTask);
    await axios.put('/task/update',{json}).then((result) => {
        console.log(result)
    });
  }
  async function getAllTasks() {
    await axios.get('/task/getAll').then((result) => {
      console.log(result)
    });
  }
  async function deleteTask() {
    let json = JSON.stringify(testTask);
    await axios.delete('/task/del',{json}).then((result) => {
      console.log(result)
    });
  }


  function showTasksOfDate(){
    console.log(document.getElementById("calendar"));
  }


  return (
    <div id='container'>
      <h1>Task Manager</h1>
      <button onClick={getAllTasks}>getAllFromBackend</button>
      <button onClick={createTask}>createTask</button>
      <button onClick={updateTask}>updateTask</button>
      <button onClick={deleteTask}>deleteTask</button>
      <input id='calendar' type="date" onChange={showTasksOfDate}></input>
      <div id='taskHolder'>
        <Task />
        <Task />
        <Task />
      </div>
    </div>

  );
}

export default HomePage;