import React,{useState,useEffect} from "react";
import {useNavigate,useParams,Link} from "react-router-dom";
import './Personas.css';
import {toast} from "react-toastify";
import fireDb from "../../../firebase";
import { usePersonas } from "../../../hooks/usePersonas";

const initialState ={
    nombre:"",
    apellido:"",
    telefono:"",
    correo:"",
}

const Personas = () => {
    

    const {
        dataPersonas,
        onDeletePersona} = usePersonas();

    const [state,setState] = useState(initialState);
    const {nombre,apellido,telefono,correo} = state;
    
    
    const limpiarFormPersona=()=>{
        setState({
            nombre:'',
            apellido:'',
            telefono:'',
            correo:''
        });
    }

    const handleInputChange =(e)=>{
        const {name,value} = e.target;
        setState({...state,[name]:value})
    };


    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!nombre ){
            toast.error("Proporcione un valor en cada campo de entrada");
        }else{
            fireDb.child('personas').push(state,(error)=>{
                if(error){
                    toast.error(error);
                }else{
                    toast.success("PERSONA GUARDADA");
                }
            })
        }
    };

    
    const onDelete=(id)=>{
        if(window.confirm("Seguro de Eliminar Producto?")){
            fireDb.child(`productos/${id}`).remove((err)=>{
                if(err){
                    toast.error(err);
                }else{
                    toast.error("PRODUCTO ELIMINADO")
                }
            });
        }
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h5> Personas </h5>
                </div>
                <div className="col-4">
                    <form
                        onSubmit={handleSubmit}
                    >  
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">NOMBRE</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="nombre"
                                name="nombre"
                                autocomplete="off"
                                value={nombre || ""}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="apellido" className="form-label">APELLIDO</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="apellido"
                                name="apellido"
                                autocomplete="off"
                                value={apellido || ""}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telefono" className="form-label">TELEFONO</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="telefono"
                                name="telefono"
                                autocomplete="off"
                                value={telefono || ""}
                                autocomplete="off"
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="correo" className="form-label">CORREO</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="correo"
                                name="correo"
                                autocomplete="off"
                                value={correo || ""}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary">
                                Guardar
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-success"
                            onClick={()=> limpiarFormPersona()}>
                                Limpiar
                        </button>
                   </form>
                    <br/>
                </div>
                <div className="col-8">
                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">NOMBRE</th>
                                <th scope="col">APELLIDO</th>
                                <th scope="col">TELEFONO</th>
                                <th scope="col">CORREO</th>
                                <th scope="col" className="tdAccion">ACCIÓN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(dataPersonas).map((id,index)=>{
                                return (
                                    <tr key={id}>
                                        <th scope="row"> {index+1} </th>
                                        <td> {dataPersonas[id].nombre} </td>
                                        <td> {dataPersonas[id].apellido} </td>
                                        <td> {dataPersonas[id].telefono} </td>
                                        <td> {dataPersonas[id].correo} </td>
                                        <td className="tdAccion">
                                            <Link to={'/pos'}>
                                                <button type="button" className="btn btn-secondary">
                                                    <span className="fas fa-edit"></span>
                                                </button>
                                            </Link>
                                            {/*Eliminar Producto*/}
                                            <button className="btn btn-danger" onClick={()=> onDeletePersona(id)}><span className="fas fa-trash"></span></button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Personas;