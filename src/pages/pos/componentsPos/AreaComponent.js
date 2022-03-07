import React from "react";

const AreaComponent = ({
    dataAreas,
    filtrarMesasPorArea
}) => {


    return (
        <>
            <button
                type="button" 
                className="btn btn-primary"
                onClick={()=>filtrarMesasPorArea('')}>
                    TODAS
            </button>    
            {Object.keys(dataAreas).map((id,index)=>{
                return (
                    <button
                        key={id} 
                        type="button" 
                        className="btn btn-success"
                        onClick={()=>filtrarMesasPorArea(id)}>
                            {dataAreas[id].nombre}
                    </button>
                )
            })}
        </>
    )
}


export default AreaComponent;