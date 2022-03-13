import {useState,useEffect} from "react";
import fireDb from "../firebase";
import {toast} from "react-toastify";

const initialStateMesa ={
    idArea:"",
    nombre:0,
    estado:"libre",
    idOrden:""
}

export const useMesas =() =>{

    const [dataMesas,setMesas] = useState([]);
    const [dataMesaSelect,setMesaSelect] = useState(initialStateMesa);
    const [dataMesaBusq,setMesaBusqData] = useState('');

    useEffect(()=>{  
        console.log("USE EFECT mesas consultando");
        fireDb.child("mesas").on("value",(snapshot)=>{
            if(snapshot.val() !== null){
                setMesas({...snapshot.val()});
            }else{
                setMesas({});
            }
        });
        
        return ()=>{
            console.log("USE EFECT mesas limpiando");
            setMesas({});
        }
        
    }, [])

    const inputChangeMesa =(e)=>{
        const {name,value} = e.target;
        setMesaSelect({...dataMesaSelect,[name]:value})
    };

    const submitMesa =(e)=>{
        e.preventDefault();
        if(!dataMesaSelect.nombre){
            toast.error("Proporcione un valor en cada campo de entrada");
        }else{

            if(dataMesaSelect.idMesa==undefined){
                //GUARDAR MESA
                fireDb.child('mesas').push(dataMesaSelect,(error)=>{
                    if(error){
                        toast.error(error);
                    }else{
                        toast.success("MESA GUARDADA");
                    }
                });
            }else{
                //ACTUALIZAR MESA
                fireDb.child(`mesas/${dataMesaSelect.idMesa}`).set({
                    nombre:dataMesaSelect.nombre,
                    idArea:dataMesaSelect.idArea,
                    estado:dataMesaSelect.estado,
                    idOrden:dataMesaSelect.idOrden
                },(error)=>{
                    if(error){
                        toast.error(error);
                    }else{
                        toast.success("MESA ACTUALIZADA");
                    }
                })    
            }
            limpiarMesaSelect();
        }
    };

    const onDeleteMesa=(id)=>{
        if(window.confirm("Seguro de Eliminar Mesa?")){
            fireDb.child(`mesas/${id}`).remove((err)=>{
                if(err){
                    toast.error(err);
                }else{
                    toast.error("MESA ELIMINADA")
                }
            });
        }
    }

    const onSelectMesa=(id)=>{
        const mesaEncontrada=buscarMesa(id);
        setMesaSelect(mesaEncontrada);
        return mesaEncontrada;
    }

    const limpiarMesaSelect=()=>{
        setMesaSelect({
            idArea:"",
            nombre:0,
            estado:"libre",
            idOrden:""
        });
    }


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
        dataMesaSelect,
        inputChangeMesa,
        submitMesa,
        onDeleteMesa,
        onSelectMesa,
        limpiarMesaSelect,
        filtrarMesasPorArea,
        anularMesa,
        abrirMesa,
        buscarMesa 
    }

}