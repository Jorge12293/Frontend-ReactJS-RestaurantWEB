import {useState,useEffect} from "react";
import fireDb from "../firebase";
import {toast} from "react-toastify";


const initialStateProducto ={
    idCategoria:"",
    nombre:"",
    precio:0.0,
    estado:"disponible",
    cantidad:0
}

export const useProductos = () =>{

    const [dataProductos,setProductosData] = useState({});
    const [dataProductoSelect,setProductoSelect] = useState(initialStateProducto);

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


    const inputChangeProducto =(e)=>{
        const {name,value} = e.target;
        setProductoSelect({...dataProductoSelect,[name]:value})
    };


    const submitProducto =(e)=>{
        e.preventDefault();
        if(!dataProductoSelect.nombre ){
            toast.error("Proporcione un valor en cada campo de entrada");
        }else{
            if(dataProductoSelect.idProducto==undefined){
                //GUARDAR PRODUCTO
                fireDb.child('productos').push(dataProductoSelect,(error)=>{
                    if(error){
                        toast.error(error);
                    }else{
                        toast.success("PRODUCTO GUARDADO");
                    }
                });
            }else{
                //ACTUALIZAR PRODUCTO
                fireDb.child(`productos/${dataProductoSelect.idProducto}`).set({
                    idCategoria:dataProductoSelect.idCategoria,
                    nombre:dataProductoSelect.nombre,
                    precio:dataProductoSelect.precio,
                    estado:dataProductoSelect.estado,
                    cantidad:dataProductoSelect.cantidad
                },(error)=>{
                    if(error){
                        toast.error(error);
                    }else{
                        toast.success("PRODUCTO ACTUALIZADO");
                    }
                })    
            }
            limpiarProductoSelect();
        }
    };


        
    const onUpdateCantidadProducto=(id,newCant,opcion)=>{
        let nuevaCantidad = 0;
        const productoEncontrado=buscarProducto(id);

        if(opcion=='cambiar'){
            nuevaCantidad=newCant;
        }

        //ACTUALIZAR PRODUCTO
        fireDb.child(`productos/${productoEncontrado.idProducto}`).set({
            idCategoria:productoEncontrado.idCategoria,
            nombre:productoEncontrado.nombre,
            precio:productoEncontrado.precio,
            estado:productoEncontrado.estado,
            cantidad:nuevaCantidad
        },(error)=>{
             if(error){
                toast.error(error);
             }else{
                toast.success("PRODUCTO ACTUALIZADO");
             }
         })  
    }
    

    const onDeleteProducto=(id)=>{
        if(window.confirm("Seguro de Eliminar Producto?")){
            fireDb.child(`productos/${id}`).remove((err)=>{
                if(err){
                    toast.error(err);
                }else{
                    toast.error("PRODUCTO ELIMINADO")
                }
            });
        }
    }

    const onSelectProducto=(id)=>{
        const productoEncontrado=buscarProducto(id);
        setProductoSelect(productoEncontrado);
        return productoEncontrado;
    }

    const limpiarProductoSelect=()=>{
        setProductoSelect({
            idCategoria:"",
            nombre:"",
            precio:0.0,
            estado:"disponible",
            cantidad:0
        });
    }


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
                cantidad:dataProductos[id].cantidad
            };    
        })
        const producto = listaProductos.find((producto)=> producto.idProducto === idProducto );
        return producto;
       
    });
    
    console.log("USANDO useProductos");
    console.log(dataProductos);

    return {
        dataProductos,
        dataProductoSelect,
        buscarPorCategoria,
        dataCategoriaBusq,
        buscarProducto,
        inputChangeProducto,
        submitProducto,
        onDeleteProducto,
        onSelectProducto,
        onUpdateCantidadProducto,
        limpiarProductoSelect  
    }

}