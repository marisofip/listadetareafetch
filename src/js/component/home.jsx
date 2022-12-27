import React, {useState, useEffect} from "react";


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
   
	const [tarea, setTarea] = useState([])
	console.log("newtarea:", tarea)
	const [tareaInput, setTareaInput] = useState({label:"",done:false});
	const [userActive, setUserActive] = useState(false);
	

   	const addTask = (e) => {
		e.preventDefault();
		if (tareaInput.label !== ""){
      newTodo();      
			setTarea([...tarea, tareaInput]);
			setTareaInput({label:"",done:false});
		}
	} 
	const deleteTask = (index) => {
		const newTask = [...tarea];
		newTask.splice(index, 1);
		setTarea(newTask);		
    console.log("delete:", tarea)
	}


	useEffect(() => {
		user();
		if(!userActive) {
		  newUser();           
		}
		else{
		  getTodo();
		}
		}, [!userActive]);
	
		const newUser = () => {
			fetch( "https://assets.breatheco.de/apis/fake/todos/user/marisofip", {
				method: "POST",
				body: JSON.stringify([]),
				headers: {
				  "Content-Type": "application/json"
				}
			  })
			  .then(resp => {
				console.log("Response newUser ok", resp.ok);
				console.log("Response newUser status", resp.status); 
			})
			.then(data => {
				console.log("newUser data", data); })}


				const user = () => {
					fetch('https://assets.breatheco.de/apis/fake/todos/user', {
					method: "GET",    
					})
					.then(resp => {
						console.log("Response User ok", resp.ok);
						console.log("Response User status", resp.status); // el código de estado = 200 o código = 400 etc.		
							return resp.json() })	
					.then(data => {		      
						console.log("user data", data); //esto imprimirá en la consola el objeto exacto recibido del servidor
						setUserActive(data.includes("marisofip"));
						console.log("setUserActive status", data.includes("marisofip") );               		
					})
				 }


				 const getTodo = () => {
					fetch('https://assets.breatheco.de/apis/fake/todos/user/marisofip', {
					method: "GET",      
				  })
				  .then(resp => {
					  console.log("Response getTodo ok", resp.ok); // Será true (verdad) si la respuesta es exitosa.
					  console.log("Response getTodo status", resp.status); 
					  return resp.json(); 
				  })
				  .then(data => {
					   console.log("getTodo data", data); //esto imprimirá en la consola el objeto exacto recibido del servidor
					 
					  setTarea(data);        
				  }, [])
				 
				}  
				
					const newTodo = () => {      
					fetch('https://assets.breatheco.de/apis/fake/todos/user/marisofip', {
					method: "PUT",
					body: JSON.stringify(tarea),
					headers: {
					  "Content-Type": "application/json"
					}
				  })
				  .then(resp => {
					  console.log("Response newTodo ok", resp.ok); // Será true (verdad) si la respuesta es exitosa.
					  console.log("Response newTodo status", resp.status); // el código de estado = 200 o código = 400 etc.
					  return resp.json(); 
				  })
				  .then(data => {
					  console.log("newTodo data", data); //esto imprimirá en la consola el objeto exacto recibido del servidor        
					  console.log("Tareas:", tarea);
					             
				  })}				
				
			  
				  const deleteAll = () => {fetch('https://assets.breatheco.de/apis/fake/todos/user/marisofip', {
					method: "DELETE",
					body: JSON.stringify([tarea]),
					headers: {
					  "Content-Type": "application/json"
					}
				  })
				  .then(resp => {
					  console.log("Response deleteAll ok", resp.ok); // Será true (verdad) si la respuesta es exitosa.
					  console.log("Response deleteAll status", resp.status); 
					  return resp.json(); 
				  })
				  .then(data => {
					  //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
					  console.log("deleteAll data", data); 
					  if (data.result == "ok"){
						setTarea([]);
						setUserActive(false);
					  }      
				  })}

	return (
		<div className="container">
				<h1> TO-DO LIST </h1>
			<div className="container-fluid">
				<form  className = "tareas" onClick={addTask}>
				<ul className="list-group list-group-flush">	
							
	    <input type="text" className="form-control"  value={tareaInput.label} placeholder="Escribir Tarea" aria-label="Username" 
                    onChange={e => setTareaInput({label: e.target.value, done: false})}/>
     	
		{tarea.map((tarea,index) => (
      <div className="task" key={index}> 
        <div className="newItem" key={index}> <li  className="list-group-item" >{tarea.label} 
        <button id="boton" className=" delete btn btn-outline-primary float-end"  onClick={() => deleteTask(index)}>x</button> 
		</li>
		</div>
		</div>
		))}
			<p>Pendientes: {tarea.length}</p>
			<button className="deleteall" onClick={deleteAll}>Borrar Todo</button>
			
			</ul>
		</form>
		</div>
		</div>
	



	);
};

export default Home;
