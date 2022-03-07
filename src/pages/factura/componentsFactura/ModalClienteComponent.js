import React from "react";


const ModalClienteComponent = ({
    dataPersonas,
    onSelectPersona
}) => {


    return (
        <>
            <div className="modal fade" id="modalListaClientes" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Lista de Clientes</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellido</th>
                                    <th scope="col">Telefono</th>
                                    <th scope="col">Correo</th>
                                    <th scope="col">ACCIÓN</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {Object.keys(dataPersonas).map((id,index)=>{
                                        return (
                                            <tr key={id}>
                                                <th scope="row">{index+1}</th>
                                                <td>{dataPersonas[id].nombre}</td>
                                                <td>{dataPersonas[id].apellido}</td>
                                                <td>{dataPersonas[id].telefono}</td>
                                                <td>{dataPersonas[id].correo}</td>
                                                <td className="tdAccion">
                                                    <button 
                                                        className="btn btn-success" 
                                                        data-dismiss="modal"
                                                        onClick={()=> onSelectPersona(id)}>
                                                            <span className="fas fa-user-check"></span>
                                                    </button>
                                                </td>
                                              
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


export default ModalClienteComponent;