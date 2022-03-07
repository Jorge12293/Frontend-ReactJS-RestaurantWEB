import React from "react";

const ProductoCardComponent = ({
    id,
    idMesa,
    dataProductos,
    ordenDetallAddProducto
}) => {


    return (
        <>
            <div 
                className="card d-inline-block" 
                style={{width: '6rem'}}
                onClick={()=> ordenDetallAddProducto(id,idMesa)}>
                <img src={'../assets/producto2.png'} className="card-img-top" alt="..."/>
                <p>{dataProductos[id].nombre}</p>
                <p>$ {dataProductos[id].precio}</p>
            </div>
        </>
    )
}


export default ProductoCardComponent;