import React from "react";
import './Categorias.css';
import { useCategorias } from "../../../hooks/useCategorias";


const Categorias = () => {
    

    const {
        dataCategorias,
        dataCategoriaSelect,
        submitCategoria,
        inputChangeCategoria,
        onSelectCategoria,
        onDeleteCategoria,
        limpiarCategoriaSelect  
        } = useCategorias();
        
    const {idCategoria,nombre} = dataCategoriaSelect;

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h5> Categorias </h5>
                </div>
                <div className="col-4">
                    <form
                        onSubmit={submitCategoria}
                    >
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Categoria</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="nombre"
                                name="nombre"
                                autoComplete="off" 
                                value={nombre || ""}
                                onChange={inputChangeCategoria} 
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary">
                                {idCategoria?'Actualizar':'Guardar'}
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-success"
                            onClick={()=> limpiarCategoriaSelect()}>
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
                                <th scope="col">CATEGORIA</th>

                                <th scope="col" className="tdAccion">ACCIÓN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(dataCategorias).map((id,index)=>{
                                return (
                                    <tr key={id}>
                                        <th scope="row"> {index+1} </th>
                                        <td> {dataCategorias[id].nombre} </td>
                                        <td className="tdAccion">
                                            {/*Modificar Categoria*/}
                                            <button 
                                                className="btn btn-secondary" 
                                                onClick={()=> onSelectCategoria(id)}>
                                                    <span className="fas fa-edit"></span>
                                            </button>

                                            {/*Eliminar Categoria*/}
                                            <button 
                                                className="btn btn-danger" 
                                                onClick={()=> onDeleteCategoria(id)}>
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

export default Categorias;