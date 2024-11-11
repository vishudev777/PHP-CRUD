// import React,{useState,useEffect} from "react"
// import TaskCreater from '../modals/TaskCreater'
// import TodoCard from "./TodoCards"

// const TodoList = ()=>{
//     const [modal, setModal] = useState(false);
//     const [taskList, setTaskList] = useState([]);

//     useEffect(()=>{
//         let arr = localStorage.getItem("taskList")
//         if(arr){
//             let obj = JSON.parse(arr)
//             setTaskList(obj)
//         }
//     },[])

//     const toggle = () =>{
//         setModal(!modal);
//     }

//     const saveTask = (taskObj) => {
//         let tempList = taskList
//         tempList.push(taskObj)
//         localStorage.setItem("taskList", JSON.stringify(tempList))
//         setTaskList(tempList)
//         setModal(false)
//     }

//     const deleteTodo = (index) => {
//         let tempList = taskList
//         tempList.splice(index,1)
//         localStorage.setItem("taskList", JSON.stringify(tempList))
//         setTaskList(tempList)
//         window.location.reload()
//     }

//     const updateListArray = (obj, index) => {
//         let editList = taskList
//         editList[index] = obj
//         localStorage.setItem("taskList", JSON.stringify(editList))
//         setTaskList(editList)
//         window.location.reload();

//     }

//    return(
//        <div className="wrapper">
//          <div className="top text-center">
//              <h3 className="title">Todo List</h3>
//              <button className="create-Btn" onClick={()=> setModal(true)}>Create a new Task</button>
//          </div>
//          <div className="card-wrapper">
//              {taskList && taskList.map((obj, index) => <TodoCard taskObj={obj} index={index} deleteTodo = {deleteTodo} updateListArray={updateListArray}/>)}

//          </div>
//          <TaskCreater toggle={toggle} modal={modal} save = {saveTask}/>
//        </div>
//    );
// };

// export default TodoList;

import React, { useState, useEffect } from "react";
import TaskCreater from "../modals/TaskCreater";
import TodoCard from "./TodoCards";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    let arr = localStorage.getItem("taskList");
    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
    }
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = (taskObj) => {
    let tempList = [...taskList]; // Create a copy of the list to avoid mutating the state directly
    tempList.push(taskObj);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    setModal(false);
  };

  const deleteTodo = (index) => {
    let tempList = [...taskList]; // Create a copy of the list
    tempList.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
  };

  const updateListArray = (obj, index) => {
    let editList = [...taskList]; // Create a copy of the list
    editList[index] = obj;
    localStorage.setItem("taskList", JSON.stringify(editList));
    setTaskList(editList);
  };

  return (
    <div className="wrapper">
      <div className="top text-center">
        <h3 className="title">Todo List</h3>
        <button className="create-Btn" onClick={() => setModal(true)}>
          Create a new Task
        </button>
      </div>
      <div className="card-wrapper">
        {taskList &&
          taskList.map((obj, index) => (
            <TodoCard
              key={obj.id || index} // Make sure to use a unique key (obj.id is preferred, if available)
              taskObj={obj}
              index={index}
              deleteTodo={deleteTodo}
              updateListArray={updateListArray}
            />
          ))}
      </div>
      <TaskCreater toggle={toggle} modal={modal} save={saveTask} />
    </div>
  );
};

export default TodoList;
