import { useState } from "react";
import { v4 as uuidv4, v4 } from 'uuid';

export default function ToDo() {
    let [todos, setTodos] = useState([{task : "Your Tasks", id : v4(), isDone : false}]);
    let [newTask, setNewTask ] = useState("");

    let onChangeHandler = (event) =>{
        setNewTask(event.target.value);
    }
    let addHandler = (event) =>{
        setTodos(() =>{
            if(!newTask){
                return [...todos];
            }
            return [...todos, {task : newTask, id : v4(), isDone : false}]
        })
    }
    let deleteHandler = (id) =>{
        setTodos(()=>{
            return todos.filter((ele) => ele.id != id);
        })
    }
    let updateAllHandler = () =>{
        setTodos(() =>{
            return todos.map((ele) =>{
                return {
                    ...ele,
                    task : ele.task.toUpperCase()
                }
            })
        })
    }
    let updateOneHandler = (id) =>{
        setTodos( () =>{
            return todos.map((ele) =>{
                if(ele.id === id){
                    return {
                        id : ele.id,
                        task : ele.task.toUpperCase(),
                        isDone : true
                    }
                }
                else{
                    return ele;
                }
            })
        })
    }
    let doneHandler = (id) =>{
        setTodos(() =>{
            return todos.map((ele) =>{
                if(ele.id === id){
                    return{
                        ...ele,
                        isDone : true
                    }
                }
                else{
                    return{
                        ...ele
                    }
                }
            })
        })
    }
    let doneAllHandler = () =>{
        setTodos(()=>{
            return todos.map((ele)=>{
                return{
                    ...ele,
                    isDone : true
                }
            })
        })
    }
    let styles = {
        padding : "5px 5px",
        fontSize : "1rem",
        marginRight : "0.4rem"
    }
    return(
        <div>
            <input type="text" style={styles}value={newTask} onChange={onChangeHandler} placeholder="Enter anything?" />
           <button className="counter" onClick={addHandler}>Add</button>
             &nbsp;
            {todos.map((ele) =>{
                return <li key={ele.id}>
                    <span style={ele.isDone ? {textDecorationLine : "line-through"} : {}}>{ele.task}</span>
                    &nbsp;&nbsp;
                    <button className="counter" onClick={() => deleteHandler(ele.id)}>Delete</button>
                    &nbsp;&nbsp;
                    <button className="counter" onClick={() => updateOneHandler(ele.id)}>UpdateCase</button>
                    &nbsp;&nbsp;
                    <button className="counter" onClick={() => doneHandler(ele.id)}>Done</button>
                    </li>
            })}
            <button className="counter" onClick={updateAllHandler}>UpperCase All!</button>
            &nbsp;&nbsp;
            <button className="counter" onClick={doneAllHandler}>Done All!</button>
        </div>
    )
}