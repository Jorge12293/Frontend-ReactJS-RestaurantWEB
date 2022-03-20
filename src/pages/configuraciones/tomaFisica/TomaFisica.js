import React from "react";
import './TomaFisica.css';
import { useCategorias } from "../../../hooks/useCategorias";
import { useProductos } from "../../../hooks/useProductos";


const TomaFisica = () => {
    
    const {         
        dataProductos,
        dataProductoSelect,
        inputChangeProducto,
        submitProducto,
        onDeleteProducto,
        onSelectProducto,
        onUpdateCantidadProducto,
        limpiarProductoSelect} = useProductos();
    const {idProducto,idCategoria,nombre,precio} = dataProductoSelect;

    const { dataCategorias } = useCategorias();

    const updateProductoCantidad = (id)=>{
        if(window.confirm("Seguro de Modificar Producto?")){
            let newCant = document.getElementById(id).value;
            onUpdateCantidadProducto(id,newCant,'cambiar'); 
            document.getElementById(id).value=0;
         }
    }

    


    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h5> Toma Fisica </h5>
                </div>

                <div className="col-12">
                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">PRODUCTO</th>
                                <th scope="col">PRECIO</th>
                                <th scope="col">CATEGORIA</th>
                                <th scope="col">CANT ACTUAL</th>
                                <th scope="col">CANT NUEVA</th>
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
                                        <td>{dataProductos[id].cantidad}</td>
                                        <td>
                                            <input type="number" id={id} min="0" placeholder="0" />
                                        </td>
                                        <td className="tdAccion">
                                            {/*Modificar Producto*/}
                                            <button 
                                                type="button" 
                                                className="btn btn-success"
                                                onClick={()=> updateProductoCantidad(id)}>
                                                    <span className="fas fa-edit"></span>
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

export default TomaFisica;