import {useState,useEffect} from "react";
import fireDb from "../firebase";
import {toast} from "react-toastify";

const initialStatePersona ={
    idPersona:"",
    nombre:"",
    apellido:"",
    telefono:"",
    correo:"",
}


export const usePersonas = () =>{

    const [dataPersonaSelect,setPersonaSelect] = useState(initialStatePersona);
    const [dataPersonas,setPersonas] = useState({});
    
    useEffect(()=>{
        console.log("USE EFECT PERSONAS consultando");
        fireDb.child("personas").on("value",(snapshot)=>{
            if(snapshot.val() !== null){
                setPersonas({...snapshot.val()});
            }else{
                setPersonas({});
            }
        });
        return ()=>{
            console.log("USE EFECT PERSONAS limpiando");
            setPersonas({});
        }
        
    }, [])

    const onDeletePersona=(id)=>{
        if(window.confirm("Seguro de Eliminar Persona ?")){
            fireDb.child(`personas/${id}`).remove((err)=>{
                if(err){
                    toast.error(err);
                }else{
                    toast.error("PERSONA ELIMINADA")
                }
            });
        }
    }

    const onSelectPersona=(id)=>{
        const personaEncontrada=buscarPersona(id);
        setPersonaSelect(personaEncontrada);
        return personaEncontrada;
    }

    const nombrePersona=(id)=>{
        const personaEncontrada=buscarPersona(id);
        return personaEncontrada?.nombre+' '+personaEncontrada?.apellido;
    }



    const buscarPersona = (idPersona=>{
        let listaPersonas = Object.keys(dataPersonas).map((id,index)=>{
            return {
                idPersona:id,
                nombre:dataPersonas[id].nombre,
                apellido:dataPersonas[id].apellido,
                telefono:dataPersonas[id].telefono,
                correo:dataPersonas[id].correo,
            };    
        })
        const persona = listaPersonas.find((persona)=> persona.idPersona === idPersona );
        return persona;
       
    });
    
    console.log("USANDO usePersonas");
    console.log(dataPersonas);

    return {
        dataPersonas,
        dataPersonaSelect,
        setPersonaSelect,
        onSelectPersona,
        onDeletePersona,
        nombrePersona
    }

}