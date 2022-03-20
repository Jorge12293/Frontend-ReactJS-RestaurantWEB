import React from "react";
import { useOrden } from "../../../hooks/useOrden";
import { useAreas } from "../../../hooks/useAreas";

import ButtonsOrderComponent from "./componentsOrders/ButtonsOrderComponent";
import CardOrdersComponent from "./componentsOrders/CardOrdersComponent";
import './Ordenes.css';
import { usePersonas } from "../../../hooks/usePersonas";
const Ordenes = () => {

    const {nombrePersona} = usePersonas();
    const { dataOrdenes,dataOrdenEstadoBusq,dataOrdenEcontrada,dataOrdenDetalleEnc,buscarPorEstadoOrden,buscarOrdenR,updateEstadoOrden} = useOrden();
    const {buscarArea} = useAreas();
    
    if(dataOrdenDetalleEnc==undefined){
        return(
            <>
                <h1>No hay data</h1>
            </>
        )
    }else{
        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 areas">
                        <ButtonsOrderComponent 
                             buscarPorEstadoOrden={ buscarPorEstadoOrden}
                        />
                        </div>
                        <div className="mesas">
                            <h1 style={{color: 'white'}}>Lista de Ordenes</h1>
    
                            {Object.keys(dataOrdenes).map((id,index)=>{
                                if(!dataOrdenEstadoBusq==''){
                                    if(dataOrdenEstadoBusq==dataOrdenes[id].estado){
                                        return (
                                            <CardOrdersComponent
                                                key={id}
                                                id={id}
                                                dataOrdenes={dataOrdenes}
                                                buscarOrdenR={buscarOrdenR}
                                                buscarArea={buscarArea}
                                            /> 
                                        ) 
                                    }
                                }else{
                                    return (
                                        <CardOrdersComponent
                                            key={id}
                                            id={id}
                                            dataOrdenes={dataOrdenes}
                                            buscarOrdenR={buscarOrdenR}
                                            buscarArea={buscarArea}
                                        /> 
                                    )
                                }
                                
                            })}
                        </div>   
                    </div>        
                </div>
    
    
                <div className="modal fade" id="modalDetalleOrden" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title" id="staticBackdropLabel"><strong>DETALLLE ORDEN: </strong>  {dataOrdenEcontrada.fecha} - {dataOrdenEcontrada.hora}</p>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Cliente: {nombrePersona(dataOrdenEcontrada.idCliente)}</p>
                            <p>Estado: {dataOrdenEcontrada.estado}</p>
                            <p>Total: {dataOrdenEcontrada.total}</p>
                            <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(dataOrdenDetalleEnc).map((id,index)=>{
                                    return (
                                        <tr key={id}>
                                            <th scope="row">{index+1}</th>
                                            <td>{dataOrdenDetalleEnc[id].nombre}</td>
                                            <td>{dataOrdenDetalleEnc[id].precio}</td>
                                            <td>{dataOrdenDetalleEnc[id].cantidad}</td>
                                            <td>{dataOrdenDetalleEnc[id].cantidad*dataOrdenDetalleEnc[id].precio}</td>
                                        </tr>
                                    )
                                    
                                })}
    
                            </tbody>
                            </table>
                            
                        </div>
                        <div className="modal-footer">
                        <button 
                            type="button" 
                            className={ dataOrdenEcontrada.estado == 'PROCESO' ? "btn btn-warning":"d-none"} 
                            data-dismiss="modal"
                            onClick={()=> updateEstadoOrden(dataOrdenEcontrada?.idOrden,'LISTA')}>    
                                LISTA
                        </button>

                        <button 
                            type="button" 
                            className={ dataOrdenEcontrada.estado == 'LISTA' ? "btn btn-info":"d-none"} 
                            data-dismiss="modal"
                            onClick={()=> updateEstadoOrden(dataOrdenEcontrada?.idOrden,'SERVIDA')}>    
                                SERVIDA
                        </button>
                        
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Ordenes;