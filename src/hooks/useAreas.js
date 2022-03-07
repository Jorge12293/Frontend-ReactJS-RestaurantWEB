import {useState,useEffect} from "react";
import fireDb from "../firebase";

export const useAreas =() =>{

    const [dataAreas,setAreasData] = useState({});

    useEffect(()=>{
        console.log("USE EFECT area consultando");
        fireDb.child("areas").on("value",(snapshot)=>{
            if(snapshot.val() !== null){
              setAreasData({...snapshot.val()});
            }else{
                setAreasData({});
            }
        });

        return ()=>{
            console.log("USE EFECT areas limpiando");
            setAreasData({});
        }
        
    }, [])

    const buscarArea = (idAreaBusq)=>{
        let area=null;
        let listaArea = Object.keys(dataAreas).map((id,index)=>{
            return {
                idArea:id,
                nombre:dataAreas[id].nombre
            };    
        })
        area = listaArea.find(area => area.idArea == idAreaBusq);
        return area;
    }

    console.log("USANDO useAreas");
    console.log(dataAreas);

    return{
        dataAreas,
        buscarArea  
    }

}