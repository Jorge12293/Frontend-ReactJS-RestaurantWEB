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