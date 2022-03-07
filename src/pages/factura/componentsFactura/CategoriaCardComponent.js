import React from "react";

const CategoriaCardComponent = ({
    dataCategorias,
    buscarPorCategoria
}) => {


    return (
        <>
            <button
                type="button" 
                className="btn btn-primary"
                onClick={()=>buscarPorCategoria('')}
            >TODOS</button>    
            {Object.keys(dataCategorias).map((id,index)=>{
                 return (
                     <button
                     key={id} 
                     type="button" 
                     className="btn btn-success"
                     onClick={()=> buscarPorCategoria(id)}>
                         {dataCategorias[id].nombre}
                     </button>
                 )
            })}

        </>
    )
}


export default CategoriaCardComponent;