import React from "react";

const ModalOpcionesComponent = ({
    mesaSelect,
    abrirFactura,
    buscarOrdenR,
    anularMesaOrden 
}) => {
 
    return (
        <>
            <div className="modal fade" id="modalOpcionesMesa" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Opciones de Mesa</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="btn-group-vertical btn-group-lg" role="group" aria-label="Button group with nested dropdown">
                            <button 
                                type="button" 
                                className="btn btn-success"
                                data-dismiss="modal"
                                onClick={()=> abrirFactura(mesaSelect)}
                            >ABRIR MESA</button>
                            <button 
                                type="button" 
                                className="btn btn-success"
                                data-dismiss="modal"
                                data-toggle='modal' 
                                data-target="#modalDetalleOrden"
                                onClick={()=> buscarOrdenR(mesaSelect.idOrden)}  
                            >VER ORDEN</button>
                            <button 
                                type="button" 
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={()=> anularMesaOrden(mesaSelect)}
                            >ANULAR MESA</button>
                        </div>
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


export default ModalOpcionesComponent;