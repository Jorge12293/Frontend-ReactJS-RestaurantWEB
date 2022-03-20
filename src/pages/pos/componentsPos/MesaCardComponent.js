import React from "react";

const MesaCardComponent= ({
    id,
    dataMesas,
    buscarArea,
    opcionMesa
}) => {


    return (
        <>
            <div 
                className="card d-inline-block" 
                style={{width: '8rem'}}
                onClick={()=>opcionMesa(id,dataMesas[id])}
                data-toggle={dataMesas[id].estado === 'libre' ? '':'modal'} 
                data-target="#modalOpcionesMesa"
            >
                
                {dataMesas[id].estado === 'libre' 
                ?<img src={'assets/mesa_libre.png'} className="card-img-top" style={{background:'white'}} alt="..."/>
                :<img src={'assets/mesa_ocupada.png'} className="card-img-top" style={{background:'#40ca88'}} alt="..."/> }
    
                <p>{buscarArea(dataMesas[id]?.idArea)?.nombre}</p>
                <hr/>
                <p>Mesa: {dataMesas[id].nombre}</p>
            </div>
        </>
    )
}


export default MesaCardComponent;