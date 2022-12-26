import React, {useState} from "react";


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [tarea, setTarea] = useState("")
    const [listaTareas, setListaTareas] = useState([])
    const [listaVacia, setListaVacia] = useState ("No hay tareas")

	function cargarTarea(e) {
        if (e.key === 'Enter') {
            e.preventDefault();

            setListaTareas([
                ...listaTareas,
                tarea
            ]); // suma la nueva sin borrar lo anterior
            console.log(listaTareas);
            setTarea("");
            setListaVacia("")
        } 

    }
	function eliminarTarea(id) {
        let sinEliminado = [];
        sinEliminado = listaTareas.filter((item,index) => {
            if (index !== id)  {
                return item
            } 
            if (listaVacia == "" && listaTareas.length == 1 ) {
                setListaVacia("No hay tareas")
            } 
        } ) 
        setListaTareas(sinEliminado);
    }
      

	return (
		<div className="container">
	

			<h1> TO-DO LIST </h1>
			<div className="container-fluid">
	    <input type="text" className="form-control" placeholder="Escribir Tarea" aria-label="Username" value={tarea}
                    onChange={(e) => setTarea(e.target.value)}
                    onKeyDown={cargarTarea}/>
     	<ul class="list-group list-group-flush">
		 {listaTareas.map((item, id) => 
                    <li className = "list-group-item hidden" key={id}>{item} 
                    <button type="button" className="btn btn-outline-primary float-end" 
                    onClick={()=> eliminarTarea(id)}>x
                    </button>
					</li> ) }
			  </ul>
			{listaVacia}
			</div>
			</div>
	



	);
};

export default Home;
