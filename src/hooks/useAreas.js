import {useState,useEffect} from "react";
import fireDb from "../firebase";
import {toast} from "react-toastify";

const initialStateArea ={
    nombre:"",
}

export const useAreas =() =>{

    const [dataAreaSelect,setAreaSelect] = useState(initialStateArea);
    const [dataAreas,setAreas] = useState({});

    useEffect(()=>{
        console.log("USE EFECT area consultando");
        fireDb.child("areas").on("value",(snapshot)=>{
            if(snapshot.val() !== null){
              setAreas({...snapshot.val()});
            }else{
                setAreas({});
            }
        });
        return ()=>{
            console.log("USE EFECT areas limpiando");
            setAreas({});
        }
        
    }, [])


    const inputChangeArea =(e)=>{
        const {name,value} = e.target;
        setAreaSelect({...dataAreaSelect,[name]:value})
    };


    const submitArea =(e)=>{
        e.preventDefault();
        if(!dataAreaSelect.nombre){
            toast.error("Proporcione un valor en cada campo de entrada");
        }else{
            if(dataAreaSelect.idArea==undefined){
                //GUARDAR AREA
                fireDb.child('areas').push(dataAreaSelect,(error)=>{
                    if(error){
                        toast.error(error);
                    }else{
                        toast.success("AREA GUARDADA");
                    }
                });
            }else{
                //ACTUALIZAR AREA
                fireDb.child(`areas/${dataAreaSelect.idArea}`).set({
                    nombre:dataAreaSelect.nombre,
                },(error)=>{
                    if(error){
                        toast.error(error);
                    }else{
                        toast.success("AREA ACTUALIZADA");
                    }
                })    
            }
            limpiarAreaSelect();
        }
    };


    const onSelectArea=(id)=>{
        const areaEncontrada=buscarArea(id);
        setAreaSelect(areaEncontrada);
        return areaEncontrada;
    }

    const onDeleteArea=(id)=>{
        if(window.confirm("Seguro de Eliminar Area?")){
            fireDb.child(`areas/${id}`).remove((err)=>{
                if(err){
                    toast.error(err);
                }else{
                   // limpiarCamposArea();
                    toast.error("AREA ELIMINADA")
                }
            });
        }
    }

    const limpiarAreaSelect=()=>{
        setAreaSelect({
            nombre:'',
        });
    }
    
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
        dataAreaSelect,
        buscarArea,
        onSelectArea,
        limpiarAreaSelect,
        onDeleteArea,
        inputChangeArea,
        submitArea  
    }

}