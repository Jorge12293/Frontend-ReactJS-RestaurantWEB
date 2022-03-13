import React from "react";
import './Areas.css';
import { useAreas } from "../../../hooks/useAreas";

const Areas = () => {
    
    const {
        dataAreas,
        dataAreaSelect,
        onSelectArea,
        limpiarAreaSelect,
        onDeleteArea,
        inputChangeArea,
        submitArea} = useAreas();

    const {idArea,nombre} = dataAreaSelect;

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h5> AREAS  </h5>
                </div>
                <div className="col-4">
                    <form
                        onSubmit={submitArea}
                    >
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">AREA</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="nombre"
                                name="nombre"
                                autoComplete="off" 
                                value={nombre || ""}
                                onChange={inputChangeArea}
                            
                            />
                        </div>

                        <button type="submit" 
                                className="btn btn-primary">
                                {idArea?'Actualizar':'Guardar'}
                        </button>
                        
                        <button 
                            type="button" 
                            className="btn btn-success"
                            onClick={()=> limpiarAreaSelect()}>
                                Limpiar
                        </button>
                    </form>
                </div>
                <div className="col-8">
                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">AREA</th>
                                <th scope="col" className="tdAccion">ACCIÓN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(dataAreas).map((id,index)=>{
                                return (
                                    <tr key={id}>
                                        <th scope="row"> {index+1} </th>
                                        <td> {dataAreas[id].nombre} </td>        
                                        <td className="tdAccion">
                                            {/*Modificar Area*/}
                                            <button className="btn btn-secondary" onClick={()=> onSelectArea(id)}><span className="fas fa-edit"></span></button>
                                            {/*Eliminar Area*/}
                                            <button className="btn btn-danger" onClick={()=> onDeleteArea(id)}><span className="fas fa-trash"></span></button>
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

export default Areas;