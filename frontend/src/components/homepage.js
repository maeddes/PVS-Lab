import './homepage.css';
import React, { useState, useContext } from "react";
import axios from 'axios';

function HomePage() {
  const [taskId, setTaskId] = useState([123]);
  const [name, setName] = useState(['Person1']);
  const [date, setDate] = useState(['2023-29-11']);
  //const [timeslot, setTimeslot] = useState([]);
  const [desc, setDesc] = useState(['very gud task.']);
  const [TaskPopupTrigger, setTaskPopupTrigger] = useState(false);
  const [visibleTasks, setVisibleTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState({ name: '', datum: undefined, timeslot: undefined, description: '' });

  const testTask = {
    name: "idk",
    date: "2023-10-10",
    timeslot: 1,
    description: "test task"
  }

  //API CALLS TO BACKEND
  async function createTask(task) {
    let json = JSON.stringify(task);
    await axios.put('/task/create', json, {
      headers: { 'Content-Type': 'application/json' }
    }).then((result) => { });
  }
  async function updateTask() {
    let json = JSON.stringify(testTask);
    await axios.put('/task/update', json, {
      headers: { 'Content-Type': 'application/json' }
    }).then((result) => { });
  }
  async function getAllTasks() {
    return await axios.get('/task/getAll', {
      headers: { 'Content-Type': 'application/json' }
    })
  }
  async function deleteTask() {
    let json = JSON.stringify(testTask);
    await axios.delete('/task/del', json, {
      headers: { 'Content-Type': 'application/json' }
    }).then((result) => { });
  }

  function showTasksOfDate() {
    const data = getAllTasks();
    setVisibleTasks([]);
    let l = [];
    data.then((result) => {
      let tasks = result.data;
      tasks.forEach(e => {
        let date = new Date(e.datum).getDate();
        let calendar = document.getElementById("calendar");
        let calendarDate = new Date(calendar.value).getDate();
        if (date == calendarDate) {
          setVisibleTasks(old => [...old, e]);
          l.push(e);
        }
      });
    });
  }

  function removeById(id) {
    console.log(id);
  }

  function editTask(task) {
    removeById(task.id);
    setTaskToEdit(task);
    setTaskPopupTrigger(current => !current);
  }

  const VisibleTasks = () => {
    return (
      <div>
        {visibleTasks.map((visibleTask) => (
          <div className="task">
            <button onClick={() => { removeById(visibleTask.id) }}>X</button>
            <button onClick={() => { editTask(visibleTask); }}>edit</button>
            <p>{visibleTask.id}</p>
            <p>{visibleTask.name}</p>
            <p>{visibleTask.description}</p>
          </div>
        ))}
      </div>
    );
  }

  const Task = (task) => {
    return <div className='task'>
      <p>{task.taskId}</p>
      <p>{task.name}</p>
      <p>{task.description}</p>
    </div>
  }

  const CreateTaskPopup = () => {
    return (
      <div>
        <div>
          <p className='createTaskP'>Name:</p>
          <input className='createTaskInput' id='nameInput' defaultValue={taskToEdit.name}></input>

          <p className='createTaskP'>Date:</p>
          <input className='createTaskInput' type='date' id='dateInput' defaultValue={taskToEdit.datum}></input>

          <p className='createTaskP'>Timeslot:</p>
          <input className='createTaskInput' id='timeSlotInput' defaultValue={taskToEdit.timeslot}></input>

          <p className='createTaskP'>description:</p>
          <input className='createTaskInput' id='descriptionInput' defaultValue={taskToEdit.description}></input>
        </div>

        <button onClick={() => {
          let name = document.getElementById("nameInput");
          let date = document.getElementById("dateInput");
          let timeslot = document.getElementById("timeSlotInput");
          let description = document.getElementById("descriptionInput");
          createTask({ name: name.value, date: date.value, timeslot: timeslot.value, description: description.value });
          setTaskPopupTrigger(current => !current);
          setTaskToEdit({ name: '', datum: undefined, timeslot: undefined, description: '' });
        }}>create Task</button>
      </div>
    )
  }

  return (
    <div id='container'>
      <h1>Task Manager</h1>
      <button onClick={() => { setTaskPopupTrigger(current => !current); }}>addTask</button>
      {TaskPopupTrigger && <CreateTaskPopup />}

      <button onClick={getAllTasks}>getAllFromBackend</button>
      <button onClick={createTask}>createTask</button>
      <button onClick={updateTask}>updateTask</button>
      <button onClick={deleteTask}>deleteTask</button>
      <input id='calendar' type="date"
        onChange={showTasksOfDate}></input>
      <div id='taskHolder'>
        <VisibleTasks />
      </div>
    </div>

  );
}
export default HomePage;