import React from "react";
import './Personas.css';
import { usePersonas } from "../../../hooks/usePersonas";


const Personas = () => {
    

    const {
        dataPersonas,
        dataPersonaSelect,
        onSelectPersona,
        onDeletePersona,
        limpiarPersonaSelect,
        handleSubmitPersona,
        handleInputChangePersona} = usePersonas();

    const {nombre,apellido,telefono,correo} = dataPersonaSelect;
    

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h5> Personas </h5>
                </div>
                <div className="col-4">
                    <form
                        onSubmit={handleSubmitPersona}
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
                                onChange={handleInputChangePersona} 
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
                                onChange={handleInputChangePersona} 
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
                                onChange={handleInputChangePersona} 
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
                                onChange={handleInputChangePersona} 
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
                            onClick={()=> limpiarPersonaSelect()}>
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

                                            <button type="button" 
                                                    className="btn btn-secondary"
                                                    onClick={()=> onSelectPersona(id)}>
                                                        <span className="fas fa-edit"></span>
                                            </button>

                                            <button type="button" 
                                                    className="btn btn-danger" 
                                                    onClick={()=> onDeletePersona(id)}>
                                                        <span className="fas fa-trash"></span>
                                            </button>
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