import React from "react";
import './Productos.css';
import { useCategorias } from "../../../hooks/useCategorias";
import { useProductos } from "../../../hooks/useProductos";


const Productos = () => {
    
    const {         
        dataProductos,
        dataProductoSelect,
        inputChangeProducto,
        submitProducto,
        onDeleteProducto,
        onSelectProducto,
        limpiarProductoSelect} = useProductos();
    const {idProducto,idCategoria,nombre,precio} = dataProductoSelect;

    const { dataCategorias } = useCategorias();

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h5> PRODUCTOS </h5>
                </div>
                <div className="col-4">
                    <form
                        onSubmit={submitProducto}
                    >  
                        <div className="form-row">
                            <div className="form-group col-12">
                                <label>CATEGORIAS :</label>
                                 <select 
                                    className="form-control"
                                    id="idCategoria" 
                                    name="idCategoria"
                                    value={idCategoria || ""}
                                    onChange={inputChangeProducto}
                                    >
                                    <option key={0}>Seleccione una Opción</option>  
                                    {Object.keys(dataCategorias).map((id,index)=>{
                                        return (
                                           <option  key={id} value={`${id}`} >{dataCategorias[id].nombre}</option>
                                        )
                                    })}
                                 </select>
                              </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">PRODUCTO</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="nombre"
                                name="nombre"
                                autoComplete="off"
                                value={nombre || ""}
                                onChange={inputChangeProducto} 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="precio" className="form-label">PRECIO</label>
                            <input 
                                type='number'
                                step="0.1"
                                min='0'
                                max='20' 
                                className="form-control" 
                                id="precio"
                                name="precio"
                                value={precio || ""}
                                onChange={inputChangeProducto} 
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary">
                               {idProducto?'Actualizar':'Guardar'}
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-success"
                            onClick={()=> limpiarProductoSelect()}>
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
                                <th scope="col">PRODUCTO</th>
                                <th scope="col">PRECIO</th>
                                <th scope="col">CATEGORIA</th>
                                <th scope="col" className="tdAccion">ACCIÓN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(dataProductos).map((id,index)=>{
                                let idCategoria='';
                                idCategoria=dataProductos[id].idCategoria;
                                return (
                                    <tr key={id}>
                                        <th scope="row"> {index+1} </th>
                                        <td> {dataProductos[id].nombre} </td>
                                        <td> {dataProductos[id].precio} </td>
                                        <td> 
                                            {Object.keys(dataCategorias).map((id,index)=>{
                                                if(id===idCategoria){
                                                    return(<p key={id}>{dataCategorias[id].nombre} </p>);
                                                }else{
                                                    return(<p key={id}> </p>);
                                                }
                                            })}
                                        </td>
                                        <td className="tdAccion">
                                            {/*Modificar Producto*/}
                                            <button 
                                                type="button" 
                                                className="btn btn-secondary"
                                                onClick={()=> onSelectProducto(id)}>
                                                    <span className="fas fa-edit"></span>
                                            </button>
                                            {/*Eliminar Producto*/}
                                            <button 
                                                className="btn btn-danger" 
                                                onClick={()=>  onDeleteProducto(id)}>
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

export default Productos;