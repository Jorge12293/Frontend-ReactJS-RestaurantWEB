import {useState} from "react";
import { useProductos } from "./useProductos";


/*
const initialStateOrden ={
    fecha:'',
    hora:'',
    total:0.0,
    idCliente:'',
    idDetalleOrden:'',
    estado:''
}
*/

export const useFactura = () =>{
    // Busqueda de Elementos
    const { buscarProducto } = useProductos();

    const [dataOrdenDetalleF,setOrdenDetalleFData] = useState([]);
    //const [dataOrdenDetalleHist,setOrdenDetalleHist] = useState([]);
    const [dataTotalFact,setTotalFactData] = useState(0);


    // Metodos Factura
    const ordenDetallAddProducto=(idProducto,idMesa) =>{
        const productoEncontrado = buscarProducto(idProducto);
        const productoExisteFact = dataOrdenDetalleF.find(producto => producto.idProducto === idProducto);

        if(productoExisteFact){
            handleIncrementItemF(idProducto);
        }else{
            const newProducto={
                idProducto:productoEncontrado.idProducto,
                idCategoria:productoEncontrado.idCategoria,
                nombre:productoEncontrado.nombre,
                precio:productoEncontrado.precio,
                cantidad:1,
                idMesa:idMesa
            }
            handleAddProductoF(newProducto);
        } 
    }

    // Metodo Complementario
    const handleAddProductoF=(newProducto) =>{
        setOrdenDetalleFData([...dataOrdenDetalleF,newProducto]);
    }

    const handleRemoveProductoF = (idProducto) =>{
        const newOrdenDetall = dataOrdenDetalleF.filter((producto)=> producto.idProducto !== idProducto );
        setOrdenDetalleFData(newOrdenDetall);
    }

    const handleIncrementItemF = (idProducto) =>{
        const newOrdenDetall = dataOrdenDetalleF.map((producto)=>{
            if(producto.idProducto === idProducto){
                return{
                    ...producto,
                    cantidad: producto.cantidad+1
                }
            }
            return producto 
        });
        setOrdenDetalleFData(newOrdenDetall);
    }

    const handleDecrementItemF = (idProducto) =>{
        let newOrdenDetall = dataOrdenDetalleF.map((producto)=>{
            if(producto.idProducto === idProducto){
                return{
                    ...producto,
                    cantidad: producto.cantidad-1
                }
            }
            return producto 
        });
        newOrdenDetall = newOrdenDetall.filter((producto)=> producto.cantidad > 0 );
        setOrdenDetalleFData(newOrdenDetall);
    }
    
    console.log("USANDO useFactura");
    console.log(dataOrdenDetalleF);
    
    return{
        dataTotalFact,
        setTotalFactData,
        dataOrdenDetalleF,
        setOrdenDetalleFData,
        ordenDetallAddProducto,
        handleRemoveProductoF,
        handleIncrementItemF,
        handleDecrementItemF
    }

}