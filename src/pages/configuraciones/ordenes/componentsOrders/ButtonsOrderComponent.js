import React from "react";

const ButtonsOrderComponent = ({
    buscarPorEstadoOrden
}) => {

    return (
        <>
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={()=> buscarPorEstadoOrden('')}>
                <strong>TODAS</strong>       
            </button>
            <button 
                type="button" 
                className="btn btn-secondary"
                onClick={()=> buscarPorEstadoOrden('PROCESO')}>
                <strong>PROCESO</strong>       
            </button>
            <button 
                type="button" 
                className="btn btn-warning"
                onClick={()=> buscarPorEstadoOrden('LISTA')}>
                 <strong>LISTAS</strong>   
            </button>
            <button 
                type="button" 
                className="btn btn-info"
                onClick={()=> buscarPorEstadoOrden('SERVIDA')}>
                <strong>SERVIDAS</strong>    
            </button>
            <button 
                type="button" 
                className="btn btn-success"
                onClick={()=> buscarPorEstadoOrden('FACTURADA')}>
                <strong>FACTURADAS</strong>  
            </button>
            <button 
                type="button" 
                className="btn btn-danger"
                onClick={()=> buscarPorEstadoOrden('ANULADA')}>
                <strong>ANULADAS</strong>       
            </button>
        </>
    )
}

export default ButtonsOrderComponent;