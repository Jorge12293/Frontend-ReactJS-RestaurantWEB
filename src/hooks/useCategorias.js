import {useState,useEffect} from "react";
import fireDb from "../firebase";


export const useCategorias =() =>{

    const [dataCategorias,setCategoriasData] = useState({});

    useEffect(()=>{
        console.log("USE EFECT categoria consultando");
        fireDb.child("categorias").on("value",(snapshot)=>{
            if(snapshot.val() !== null){
              setCategoriasData({...snapshot.val()});
            }else{
                setCategoriasData({});
            }
        });

        return ()=>{
            console.log("USE EFECT categoria limpiando");
            setCategoriasData({});
        }
        
    }, [])

    console.log("USANDO useCategorias");
    console.log(dataCategorias);

    return{
        dataCategorias  
    }

}