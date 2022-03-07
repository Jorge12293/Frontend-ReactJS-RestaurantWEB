import React from "react";
import {useNavigate} from "react-router-dom";
import MesaCardComponent from "./MesaCardComponent";

const ModalDetalleOrdenComponent = ({
    dataOrdenEcontrada,
    dataOrdenDetalleEnc,
    nombrePersona
}) => {


 
    return (
        <>
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
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ModalDetalleOrdenComponent;