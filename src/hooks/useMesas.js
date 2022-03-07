import {useState,useEffect, useMemo} from "react";
import fireDb from "../firebase";
import {toast} from "react-toastify";

export const useMesas =() =>{

    const [dataMesas,setMesasData] = useState([]);
    const [dataMesaBusq,setMesaBusqData] = useState('');

    useEffect(()=>{  
        console.log("USE EFECT mesas consultando");
        fireDb.child("mesas").on("value",(snapshot)=>{
            if(snapshot.val() !== null){
                setMesasData({...snapshot.val()});
            }else{
                setMesasData({});
            }
        });
        
        return ()=>{
            console.log("USE EFECT mesas limpiando");
            setMesasData({});
        }
        
    }, [])

    const filtrarMesasPorArea = (idArea)=>{
        setMesaBusqData(idArea);
    }
    
    const anularMesa=(mesa)=>{
        fireDb.child(`mesas/${mesa.idMesa}`).set({
            nombre:mesa.nombre,
            idArea:mesa.idArea,
            estado:'libre',
            idOrden:''
        },(error)=>{
            if(error){
                toast.error(error);
            }else{
                toast.error("Mesa Anulada");
            }
        })
    }

    const abrirMesa=(idMesaBusq,idOrden)=>{
        const mesaFound = buscarMesa(idMesaBusq);
        fireDb.child(`mesas/${mesaFound.idMesa}`).set({
            nombre:mesaFound.nombre,
            idArea:mesaFound.idArea,
            estado:'ocupada',
            idOrden:idOrden
        },(error)=>{
            if(error){
                toast.error(error);
            }
        }) 
    }


    const buscarMesa = (idMesaBusq)=>{
        let listaMesa = Object.keys(dataMesas).map((id,index)=>{
            return {
                idMesa:id,
                nombre:dataMesas[id].nombre,
                idArea:dataMesas[id].idArea,
                estado:dataMesas[id].estado,
                idOrden:dataMesas[id].idOrden
            };    
        })
        const mesaEncontrada=listaMesa.find(mesa => mesa.idMesa === idMesaBusq);
        return mesaEncontrada;
    }

    console.log("USANDO useMesas");
    console.log(dataMesas);
    return{
        dataMesas,
        dataMesaBusq,
        filtrarMesasPorArea,
        anularMesa,
        abrirMesa,
        buscarMesa 
    }

}