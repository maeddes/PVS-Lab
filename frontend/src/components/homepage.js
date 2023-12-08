import './homepage.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';

function HomePage() {
  //not really used because popup is always active now.
  const [TaskPopupTrigger, setTaskPopupTrigger] = useState(false);


  const [currentDate, setcurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [visibleTasks, setVisibleTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState({ datum: currentDate, timeslot: 10 });
  const [currentMode, setCurrentMode] = useState('DAY');
  const priorityDefaultColor = 'rgb(255, 0, 0)';
  useEffect(() => {
    showTasks();
  }, [currentMode, currentDate]);


  async function createTask(task) {
    let json = JSON.stringify(task);
    await axios.put('/task/create', json, {
      headers: { 'Content-Type': 'application/json' }
    }).then(() => { showTasks(); });
  }
  async function deleteTask(id) {
    await axios.delete(`/task/del/${id}`).then(() => { showTasks(); });
  }
  async function getAllTasks() {
    return await axios.get('/task/getdailypriosorted', {
      headers: { 'Content-Type': 'application/json' }
    })
  }
  async function getAllTasksOrderByDate() {
    return await axios.get('/task/getTasksOrderByDate', {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  function getDaysOfWeek(date) {
    let days = [];
    let offset = new Date(date).getDay();
    let firstDayOfWeek = new Date(date);
    firstDayOfWeek.setDate(new Date(date).getDate() - offset);
    for (let i = 0; i < 7; i++) {
      let tmp = new Date(firstDayOfWeek);
      tmp.setDate(tmp.getDate() + i);
      days.push(tmp)
    }
    return days;
  }

  function datesEqual(date1, date2) {
    return (date1.toISOString().split('T')[0] === date2.toISOString().split('T')[0]) ? true : false;
  }

  function showTasks() {
    let data = undefined;
    if (currentMode == 'WEEK') {
      data = getAllTasksOrderByDate();
    } else if (currentMode == 'DAY') {
      data = getAllTasks();
    }

    data.then((result) => {
      setVisibleTasks([]);
      result.data.forEach(e => {
        let date = new Date(e.datum);
        let calendar = document.getElementById("calendar");
        let calendarDate = new Date(calendar.value);
        if (currentMode == 'WEEK') {
          let daysOfSelWeek = getDaysOfWeek(calendar.value);
          daysOfSelWeek.forEach((day) => {
            if (datesEqual(day, date)) {
              setVisibleTasks(old => [...old, e]);
            }
          })
        } else if (currentMode == 'DAY') {
          if (datesEqual(date, calendarDate)) {
            setVisibleTasks(old => [...old, e]);
          }
        }
      });
    });
  }

  function editTask(task) {
    setTaskToEdit(task);
    setTaskPopupTrigger(true);
  }

  const VisibleTasks = () => {
    return (
      <div id='taskHolder'>
        {visibleTasks.map((visibleTask) => (
          <div key={visibleTask.id} style={{ backgroundColor: currentMode == 'DAY' ? `rgb(${visibleTask.timeslot * 15},${(10 - visibleTask.timeslot) * 20},75)` : `rgb(25,25,25)` }} className="task">
            <div className='taskflex'>
              <p className='TaskFieldDescription'>Name: </p>
              <p className='TaskFieldDescription'>Description: </p>
              <p className='TaskFieldDescription'>Date: </p>
            </div>
            <div className='taskflex'>
              <p className='TaskFieldValue'>{visibleTask.name}</p>
              <p className='TaskFieldValue'>{visibleTask.description}</p>
              <p className='TaskFieldValue'>{visibleTask.datum}</p>
            </div>
            <div className='taskflex' id='editBar'>
              <button className='taskBarBtn' onClick={() => { editTask(visibleTask); }}>&#9998;</button>
              <button className='taskBarBtn' onClick={() => { deleteTask(visibleTask.id); }}>X</button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  //Creates Task form with values of taskToEdit.
  const CreateTaskPopup = () => {
    return (
      <div id='taskPopup'>
        <div id='formFlex'>
          <div className='formFlexItem'>
            <p className='createTaskP'>Name*:</p>
            <p className='createTaskP'>Date*:</p>
            <p className='createTaskP'>Priority*:</p>
            <p className='createTaskP'>Description*:</p>
          </div>
          <div className='formFlexItem'>
            <input className='createTaskInput' id='nameInput' defaultValue={taskToEdit.name}></input>
            <input className='createTaskInput' type='date' id='dateInput' defaultValue={taskToEdit.datum}></input>
            <input className='createTaskInput' type='range' min={0} max={9} id='timeSlotInput' defaultValue={taskToEdit.timeslot}></input>
            <input className='createTaskInput' id='descriptionInput' defaultValue={taskToEdit.description}></input>
          </div>
        </div>
        <div id='flexTaskPopupButtons'>
          <button id='closeForm' onClick={() => { setTaskToEdit({ datum: currentDate, timeslot: 10 }); setTaskPopupTrigger(false); }}>Clear</button>
          <button onClick={() => {
            let date = document.getElementById("dateInput");
            let name = document.getElementById("nameInput");
            let desc = document.getElementById("descriptionInput");
            //Condition for Creating a Task.
            if (date.value && name.value && desc.value) {
              let timeslot = document.getElementById("timeSlotInput");
              let description = document.getElementById("descriptionInput");
              //if there is a task we are editing. delete the task before creating the new one.
              if (taskToEdit.name) {
                deleteTask(taskToEdit.id);
              }
              createTask({ name: name.value, date: date.value, timeslot: timeslot.value, description: description.value });
              setTaskPopupTrigger(false);
              setTaskToEdit({ datum: currentDate, timeslot: 10 });
            }
          }}>Create / Update Task</button>
        </div>
      </div>
    )
  }

  function changeSelDate(change) {
    let cal = document.getElementById('calendar')
    let date = new Date(cal.value)
    date.setDate(date.getDate() + change);
    cal.value = date.toISOString().split('T')[0];
    setcurrentDate(cal.value);
    setTaskToEdit({ datum: cal.value, timeslot: 10 });
    showTasks();
  }

  return (
    <div>
      <h1 id='Title'>Task Manager</h1>
      <div id='container'>
        <div id='TaskForm'>
          <CreateTaskPopup />
        </div>
        <div id='TaskView'>
          <div className='defaultFlex'>
            <button onClick={() => { changeSelDate(-1) }}>&#8592;</button>
            <input id='calendar' type="date" defaultValue={currentDate}
              onChange={() => {
                showTasks();
                let cal = document.getElementById('calendar');
                setcurrentDate(cal.value);
                setTaskToEdit({ datum: cal.value, timeslot: 10 });
              }}></input>
            <button onClick={() => { changeSelDate(+1) }}>&#8594;</button>
            <button onClick={() => {
              if (currentMode == 'DAY') {
                setCurrentMode('WEEK')
              }
              else {
                setCurrentMode('DAY')
              }
            }}>{currentMode}</button>
          </div>
          <VisibleTasks />
        </div>
      </div>
    </div>
  );
}
export default HomePage;