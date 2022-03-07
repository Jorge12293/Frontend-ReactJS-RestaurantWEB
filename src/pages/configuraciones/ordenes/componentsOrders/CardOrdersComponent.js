import React from "react";

const CardOrdersComponent = ({
    id,
    dataOrdenes,
    buscarOrdenR,
    buscarArea,
}) => {


    return (
        <>
            <div 
                className={
                    dataOrdenes[id].estado==="PROCESO"
                    ?"card d-inline-block bg-secondary"
                    :dataOrdenes[id].estado==="LISTA"
                    ?"card d-inline-block bg-warning"
                    :dataOrdenes[id].estado==="SERVIDA"
                    ?"card d-inline-block bg-info"
                    :dataOrdenes[id].estado==="FACTURADA"
                    ?"card d-inline-block bg-success"
                    :dataOrdenes[id].estado==="ANULADA"
                    ?"card d-inline-block bg-danger"
                    :"card d-inline-block bg-primary"
                }
                style={{width: '8rem',color:"white"}}>
        
                <p>{dataOrdenes[id].fecha} </p>
                <p>{dataOrdenes[id].hora} </p>
                <p>{buscarArea(dataOrdenes[id]?.idArea)?.nombre}</p>
                <p>Mesa: {dataOrdenes[id].nombreMesa}</p>
                <p>TOTAL: {dataOrdenes[id].total}</p>
                <p>{dataOrdenes[id].estado}</p>
                                
                <button 
                    type="button" 
                    className="btn btn-light"
                    style={{color:"black"}}
                    data-toggle='modal' 
                    data-target="#modalDetalleOrden"
                    onClick={()=> buscarOrdenR(id)}>    
                    VER ORDEN 
                </button>
        
            </div>
        </>
    )
}

export default CardOrdersComponent;