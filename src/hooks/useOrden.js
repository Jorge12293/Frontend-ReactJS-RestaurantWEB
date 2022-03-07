import {useState,useEffect} from "react";
import fireDb from "../firebase";
import {toast} from "react-toastify";
import { useOrdenDetalle } from "./useOrdenDetalle";


const initialStateOrden ={
    fecha:'',
    hora:'',
    idArea:'',
    nombreMesa:'',
    total:0.0,
    idCliente:'',
    idDetalleOrden:'',
    estado:''
}

export const useOrden = () =>{
    
    // Fecha de Hoy
    const hoy = new Date();
    const fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
    const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    
    
    const [dataOrdenes,setOrdenesData] = useState([]);
    const [dataOrdenEcontrada,setOrdenEncontradaData] = useState(initialStateOrden);
    const [dataOrdenDetalleEnc,setOrdenDetalleEnc] = useState([]);
    const [dataOrdenEstadoBusq,setOrdenEstadoBusqData] = useState('');
    const {buscarOrdenDetalleR } = useOrdenDetalle();

    const [dataOrden,setOrdenData] = useState([]); 

    useEffect(()=>{    
        console.log("USE EFECT orden consultando");    
        fireDb.child("ordenes").on("value",(snapshot)=>{
            if(snapshot.val() !== null){
                setOrdenesData({...snapshot.val()});
            }else{
                setOrdenesData({});
            }
        });
    
        return ()=>{
            console.log("USE EFECT orden limpiando");
            setOrdenesData({});
        }
        
    }, [])

    const grabarOrden = (mesaFound,dataTotalFact,dataOrdenDetalleF,idPersona) =>{
        const idDetalleOrden = grabarDetalleFact(dataOrdenDetalleF);        
        const idOrden = grabarOrdenFact(mesaFound,dataTotalFact,idDetalleOrden,idPersona);
        return idOrden;
    }

    const grabarOrdenFact = (mesaFound,dataTotalFact,idDetalleOrden,idPersona) =>{
        const newOrden={
            fecha:fecha,
            hora:hora,
            idArea:mesaFound.idArea,
            nombreMesa:mesaFound.nombre,
            total:dataTotalFact,
            idCliente:idPersona,
            idDetalleOrden:idDetalleOrden,
            estado:"PROCESO"
        } 
        const idOrden=fireDb.child('ordenes').push( newOrden,(error)=>{
            if(error){
                toast.error(error);
            }
        }).getKey(); 

        return idOrden;
    }

    const grabarDetalleFact = (dataOrden) =>{
        const idDetalleOrden = fireDb.child('ordenesDetalle').push(dataOrden,(error)=>{
            if(error){
                toast.error(error);
            }
        }).getKey();
        return idDetalleOrden;
    }




    const buscarPorEstadoOrden = (estado)=>{
        setOrdenEstadoBusqData(estado);
    }

    // REVISADA
    const updateEstadoOrden = (idOrden,newEstado)=>{
        const ordenEncontrada=buscarOrdenId(idOrden);

        fireDb.child(`ordenes/${idOrden}`).set({
            fecha:ordenEncontrada.fecha,
            hora:ordenEncontrada.hora,
            idArea:ordenEncontrada.idArea,
            nombreMesa:ordenEncontrada.nombreMesa,
            total:ordenEncontrada.total,
            idCliente:ordenEncontrada.idCliente,
            idDetalleOrden:ordenEncontrada.idDetalleOrden,
            estado:newEstado
        },(error)=>{
            if(error){
                toast.error(error);
            }else{
                console.log(error);
            }
        })
    }

    // REVISADA
    const buscarOrdenId = (idOrden)=>{  
        let listaOrdenes = Object.keys(dataOrdenes).map((id,index)=>{
            return {
                idOrden:id,
                fecha:dataOrdenes[id].fecha,
                idArea:dataOrdenes[id].idArea,
                nombreMesa:dataOrdenes[id].nombreMesa,
                hora:dataOrdenes[id].hora,
                total:dataOrdenes[id].total,
                idCliente:dataOrdenes[id].idCliente,
                idDetalleOrden:dataOrdenes[id].idDetalleOrden,
                estado:dataOrdenes[id].estado
            };    
        })
        const ordenEncontrada = listaOrdenes.find((orden)=> orden.idOrden === idOrden );
        return ordenEncontrada;
    }


     // REVISADA
    const buscarOrdenR = (idOrden=>{
        if(!idOrden==''){

            const ordenEncontrada = buscarOrdenId(idOrden);
            setOrdenEncontradaData(ordenEncontrada);
            
            const ordenDetalleEncontrado=buscarOrdenDetalleR(ordenEncontrada.idDetalleOrden);
            setOrdenDetalleEnc(ordenDetalleEncontrado);

            return ordenEncontrada;

        }else{
            return [];
        }
       
    });

    // REVISADA
    const cargarOrdenR = (idOrden)=>{  
        let newOrdenList=null;
        const ordenEncontrada= buscarOrdenId(idOrden);
        const detalleOrden=buscarOrdenDetalleR(ordenEncontrada?.idDetalleOrden);
        newOrdenList = detalleOrden?.map((orden)=>{
            return {
                idProducto:orden.idProducto,
                idCategoria:orden.idCategoria,
                nombre:orden.nombre,
                precio:orden.precio,
                cantidad:orden.cantidad,
                idMesa:orden.idMesa
            }
        });
        return newOrdenList;
    }

    console.log("USANDO useOrden");
    console.log(dataOrdenes);
    
    return{
        dataOrden,
        setOrdenData,
        grabarOrden,
        buscarPorEstadoOrden,
        buscarOrdenR,
        updateEstadoOrden,
        buscarOrdenId ,
        cargarOrdenR,
        dataOrdenes,
        dataOrdenEcontrada,
        dataOrdenDetalleEnc,
        dataOrdenEstadoBusq,
    }

}