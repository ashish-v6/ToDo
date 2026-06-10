import { useState } from "react";
import { v4 as uuidv4, v4 } from 'uuid';

export default function ToDo() {
    let [todos, setTodos] = useState([{task : "Your Tasks", id : v4()}]);
    let [newTask, setNewTask ] = useState("");

    let onChangeHandler = (event) =>{
        setNewTask(event.target.value);
    }
    let addHandler = (event) =>{
        setTodos((prevTodos) =>{
            if(!newTask){
                return [...prevTodos];
            }
            return [...prevTodos, {task : newTask, id : v4()}]
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
                        task : ele.task.toUpperCase()
                    }
                }
                else{
                    return ele;
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
                    <span>{ele.task}</span>
                    &nbsp;&nbsp;
                    <button className="counter" onClick={() => deleteHandler(ele.id)}>Delete</button>
                    &nbsp;&nbsp;
                    <button className="counter" onClick={() => updateOneHandler(ele.id)}>UpdateCase</button>
                    </li>
            })}
            <button className="counter" onClick={updateAllHandler}>UpperCase All!</button>
        </div>
    )
}