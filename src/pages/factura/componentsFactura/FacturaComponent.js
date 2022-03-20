import React from "react";
import {Link} from "react-router-dom";


    const FacturaComponent = ({  
        idMesa,
        dataTotalFact,
        dataOrdenDetalleF,
        dataPersonaSelect,
        facturarOrden,
        guardarOrden,
        handleRemoveProductoF,
        handleIncrementItemF,
        handleDecrementItemF,
    }) => {

    return (
        <>
            <div className="col-6 containerTable ">

                {/* CABECERA DE FACTURA */}
                <div className="row p-1 bg-secondary text-light">
                    <div className="col-2 text-center ">
                         <span 
                            className="fas fa-user userCliente"
                            data-toggle='modal' 
                            data-target="#modalListaClientes">  
                        </span>
                    </div>
                    <div className="col-5 text-left">
                        <p>Nombre:   {dataPersonaSelect.nombre ? dataPersonaSelect.nombre:"Consumidor"}</p>
                        <p>Apellido: {dataPersonaSelect.apellido ? dataPersonaSelect.apellido:"Final"}</p>
                    </div>
                    <div className="col-5 text-left">
                        <p>Telefono: {dataPersonaSelect.telefono ? dataPersonaSelect.telefono:"999999"}</p>
                        <p>Correo: {dataPersonaSelect.correo ? dataPersonaSelect.correo:"client@gmail.com"}</p>
                    </div>
                </div>

                {/* CUERPO DE FACTURA */}
                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">PU</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Total</th>
                                <th scope="col" className="tdAccion">ACCIÓN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(dataOrdenDetalleF).map((id,index)=>{
                                return (
                                    <tr key={id}>
                                        <th scope="row"> {index+1} </th>
                                        <td> {dataOrdenDetalleF[id].nombre} </td>
                                        <td> {dataOrdenDetalleF[id].precio}  </td>
                                        <td> {dataOrdenDetalleF[id].cantidad}  </td>
                                        <td> {dataOrdenDetalleF[id].precio * dataOrdenDetalleF[id].cantidad}  </td>
                                        <td className="tdAccion"> 
                                            <button 
                                                className="btn btn-success"
                                                onClick={()=>  handleDecrementItemF(dataOrdenDetalleF[id].idProducto)}
                                            >
                                                <span className="fas fa-angle-left"></span>
                                            </button>
                                            <button 
                                                className="btn btn-success"
                                                onClick={()=> handleIncrementItemF(dataOrdenDetalleF[id].idProducto)}
                                            >
                                                <span className="fas fa-angle-right"></span>
                                            </button>
                                            <button 
                                                className="btn btn-danger"
                                                onClick={()=> handleRemoveProductoF(dataOrdenDetalleF[id].idProducto)}
                                            >
                                                <span className="fas fa-trash"></span>
                                            </button>
                                        </td>
                                    </tr>
                                );
                
                            })}
                        </tbody>
                    </table>
                </div>

                {/* PIE DE FACTURA */}
                <div className="row">
                    <div className="col-2 p-2 bg-secondary text-light">
                        <p>
                            Total: {dataTotalFact} $
                        </p>
                    </div>
                    <div className="col-10 ">
                        <div className="categorias p-1">
                            <button 
                                type="button"
                                className={ dataTotalFact >0 ? "btn btn-primary":"d-none"}
                                onClick={()=> guardarOrden(idMesa)}>
                                    Guardar Orden
                            </button>   
                        
                    
            
                            <button 
                                type="button"
                                className="btn btn-success"
                                onClick={()=> facturarOrden(idMesa)}>
                                Facturar Orden
                            </button>
                          
                            <Link to={`/pos`}>
                                <button type="button"className="btn btn-danger">
                                    Cancelar
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

             </div>

            
        </>
    )
}


export default FacturaComponent;