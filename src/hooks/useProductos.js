import {useState,useEffect} from "react";
import fireDb from "../firebase";

export const useProductos = () =>{

    const [dataProductos,setProductosData] = useState({});
    const [dataCategoriaBusq,setCategoriaBusqData] = useState('');

    
    useEffect(()=>{
        console.log("USE EFECT PRODUCTO consultando");
        fireDb.child("productos").on("value",(snapshot)=>{
            if(snapshot.val() !== null){
                setProductosData({...snapshot.val()});
            }else{
                setProductosData({});
            }
        });
        return ()=>{
            console.log("USE EFECT PRODUCTO limpiando");
            setProductosData({});
        }
        
    }, [])

    const buscarPorCategoria = (idCategoria)=>{
        setCategoriaBusqData(idCategoria);
    }


    const buscarProducto = (idProducto=>{
        let listaProductos = Object.keys(dataProductos).map((id,index)=>{
            return {
                idProducto:id,
                estado:dataProductos[id].estado,
                idCategoria:dataProductos[id].idCategoria,
                nombre:dataProductos[id].nombre,
                precio:dataProductos[id].precio,
            };    
        })
        const producto = listaProductos.find((producto)=> producto.idProducto === idProducto );
        return producto;
       
    });
    
    console.log("USANDO useProductos");
    console.log(dataProductos);

    return {
        dataProductos,
        buscarPorCategoria,
        dataCategoriaBusq,
        buscarProducto  
    }

}