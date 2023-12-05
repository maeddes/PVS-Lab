import './homepage.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';

function HomePage() {
  useEffect(() => {
    showTasksOfDate();
  }, []);
  const currentDate = new Date().toISOString().split('T')[0];

  //not really used because popup is alway active now.
  const [TaskPopupTrigger, setTaskPopupTrigger] = useState(false);


  const [visibleTasks, setVisibleTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState({ datum: currentDate });


  async function createTask(task) {
    let json = JSON.stringify(task);
    await axios.put('/task/create', json, {
      headers: { 'Content-Type': 'application/json' }
    }).then(() => { showTasksOfDate(); });
  }
  async function deleteTask(id) {
    console.log('del')
    await axios.delete(`/task/del/${id}`).then(() => { showTasksOfDate(); });
  }
  async function getAllTasks() {
    return await axios.get('/task/getAll', {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  function showTasksOfDate() {
    const data = getAllTasks();
    data.then((result) => {
      setVisibleTasks([]);
      result.data.forEach(e => {
        let date = new Date(e.datum).getDate();
        let calendar = document.getElementById("calendar");
        let calendarDate = new Date(calendar.value).getDate();
        if (date == calendarDate) {
          setVisibleTasks(old => [...old, e]);
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
          <div className="task">
            <div className='taskflex'>
              <p className='TaskFieldDescription'>Name: </p>
              <p className='TaskFieldDescription'>Description: </p>

            </div>

            <div className='taskflex'>
              <p className='TaskFieldValue'>{visibleTask.name}</p>
              <p className='TaskFieldValue'>{visibleTask.description}</p>
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
            <p className='createTaskP'>Name:</p>
            <p className='createTaskP'>Date:</p>
            <p className='createTaskP'>Timeslot:</p>
            <p className='createTaskP'>description:</p>
          </div>

          <div className='formFlexItem'>
            <input className='createTaskInput' id='nameInput' defaultValue={taskToEdit.name}></input>
            <input className='createTaskInput' type='date' id='dateInput' defaultValue={taskToEdit.datum}></input>
            <input className='createTaskInput' id='timeSlotInput' defaultValue={taskToEdit.timeslot}></input>
            <input className='createTaskInput' id='descriptionInput' defaultValue={taskToEdit.description}></input>
          </div>
        </div>

        <div id='flexTaskPopupButtons'>
          <button id='closeForm' onClick={() => { setTaskToEdit({ datum: currentDate }); setTaskPopupTrigger(false); }}>Clear</button>
          <button onClick={() => {
            let date = document.getElementById("dateInput");
            let name = document.getElementById("nameInput");
            //Condition for Creating a Task.
            if (date.value && name.value) {
              let timeslot = document.getElementById("timeSlotInput");
              let description = document.getElementById("descriptionInput");
              //if there is a task we are editing. delete the task before creating the new one.
              if (taskToEdit.name) {
                deleteTask(taskToEdit.id);
              }
              createTask({ name: name.value, date: date.value, timeslot: timeslot.value, description: description.value });
              setTaskPopupTrigger(false);
              setTaskToEdit({ datum: currentDate });
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
    showTasksOfDate();
  }

  /* under taskform
  <button onClick={() => { setTaskPopupTrigger(true); setTaskToEdit({datum:currentDate}); }}>&#43;</button>
          {TaskPopupTrigger && <CreateTaskPopup />}*/

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
              onChange={showTasksOfDate}></input>
            <button onClick={() => { changeSelDate(+1) }}>&#8594;</button>
          </div>
          <VisibleTasks />
        </div>
      </div>


    </div>
  );
}
export default HomePage;