import {useState,useEffect} from "react";
import fireDb from "../firebase";


export const useOrdenDetalle = () =>{
    
    const [dataOrdenDetalle,setOrdenDetalle] = useState([]);

    useEffect(()=>{  
        console.log("USE EFECT ordenDetalle consultado");      
        fireDb.child("ordenesDetalle").on("value",(snapshot)=>{
            if(snapshot.val() !== null){
                setOrdenDetalle({...snapshot.val()});
                console.log(dataOrdenDetalle);
            }else{
                setOrdenDetalle({});
            }
        });
        return ()=>{
            console.log("USE EFECT ordenDetalle limpiando");
            setOrdenDetalle({});
        }
        
    }, [])
/*
    const buscarOrdenDetalle = (idDetalleOrden=>{
        console.log(idDetalleOrden);
           
        console.log("TEST 1 ordenDetalleEncontrada");
        console.log(dataOrdenDetalle);
        if(idDetalleOrden!=''){
            let listaOrdenDetalle = Object.keys(dataOrdenDetalle).map((id1,index)=>{
                return dataOrdenDetalle[id1].map((id2,index)=>{
                    return{
                        ...id2,
                        idDetalleOrden:id1
                    }
                })
            })
            console.log(listaOrdenDetalle);
            const ordenDetalleEncontrada = listaOrdenDetalle.find((ordenDetalle,index)=>ordenDetalle[index]?.idDetalleOrden === idDetalleOrden);
            console.log("TEST 2 ordenDetalleEncontrada");
            console.log(ordenDetalleEncontrada );
            return ordenDetalleEncontrada;
        }else{
            return [];
        }
    });
*/

    const buscarOrdenDetalleR = (idDetalleOrden=>{
        if(idDetalleOrden!=''){
            let ordenDetalleEncontrada =[];
            Object.keys(dataOrdenDetalle).map((id1,index)=>{
                return dataOrdenDetalle[id1].map((id2,index)=>{
                    if(id1==idDetalleOrden){
                        ordenDetalleEncontrada.push(id2);   
                    }

                })
            })
            if(!ordenDetalleEncontrada.length==0){
                return ordenDetalleEncontrada;
            }else{
                return [];
            }

        }else{
            return [];
        }
    });


    console.log("USANDO useOrdenDetalle");
    console.log(dataOrdenDetalle);

    return{
        buscarOrdenDetalleR
    }

}