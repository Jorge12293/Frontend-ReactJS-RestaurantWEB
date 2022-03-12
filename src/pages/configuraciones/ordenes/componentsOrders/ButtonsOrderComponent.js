import React from "react";

const ButtonsOrderComponent = ({
    buscarPorEstadoOrden
}) => {

    return (
        <>
            <button 
                type="button" 
                className="btn btn-primary mt-1"
                onClick={()=> buscarPorEstadoOrden('')}>
                <strong>TODAS</strong>       
            </button>
            <button 
                type="button" 
                className="btn btn-secondary mt-1"
                onClick={()=> buscarPorEstadoOrden('PROCESO')}>
                <strong>PROCESO</strong>       
            </button>
            <button 
                type="button" 
                className="btn btn-warning mt-1"
                onClick={()=> buscarPorEstadoOrden('LISTA')}>
                 <strong>LISTAS</strong>   
            </button>
            <button 
                type="button" 
                className="btn btn-info mt-1"
                onClick={()=> buscarPorEstadoOrden('SERVIDA')}>
                <strong>SERVIDAS</strong>    
            </button>
            <button 
                type="button" 
                className="btn btn-success mt-1"
                onClick={()=> buscarPorEstadoOrden('FACTURADA')}>
                <strong>FACTURADAS</strong>  
            </button>
            <button 
                type="button" 
                className="btn btn-danger mt-1"
                onClick={()=> buscarPorEstadoOrden('ANULADA')}>
                <strong>ANULADAS</strong>       
            </button>
        </>
    )
}

export default ButtonsOrderComponent;