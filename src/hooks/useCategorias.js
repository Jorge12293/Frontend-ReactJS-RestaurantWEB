import {useState,useEffect} from "react";
import fireDb from "../firebase";
import {toast} from "react-toastify";

const initialStateCategoria ={
    nombre:""
}

export const useCategorias =() =>{

    const [dataCategoriaSelect,setCategoriaSelect] = useState(initialStateCategoria);
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



    
    const inputChangeCategoria =(e)=>{
        const {name,value} = e.target;
        setCategoriaSelect({...dataCategoriaSelect,[name]:value})
    };

    const submitCategoria =(e)=>{
        e.preventDefault();
        if(!dataCategoriaSelect.nombre ){
            toast.error("Proporcione un valor en cada campo de entrada");
        }else{

            if(dataCategoriaSelect.idCategoria==undefined){
                //CREAR CATEGORIA
                fireDb.child('categorias').push(dataCategoriaSelect,(error)=>{
                    if(error){
                        toast.error(error);
                    }else{
                        toast.success("CATEGORIA GUARDADA");
                    }
                })
            }else{
                //ACTUALIZAR CATEGORIA
                fireDb.child(`categorias/${dataCategoriaSelect.idCategoria}`).set({
                    nombre:dataCategoriaSelect.nombre,
                },(error)=>{
                    if(error){
                        toast.error(error);
                    }else{
                        toast.success("CATEGORIA ACTUALIZADA");
                    }
                })   
            }
            limpiarCategoriaSelect();
        }
    };

    const onSelectCategoria=(id)=>{
        const categoriaEncontrada=buscarCategoriaId(id);
        setCategoriaSelect(categoriaEncontrada);
        return categoriaEncontrada;
    }

    const onDeleteCategoria=(id)=>{
        if(window.confirm("Seguro de Eliminar Categoria?")){
            fireDb.child(`categorias/${id}`).remove((err)=>{
                if(err){
                    toast.error(err);
                }else{
                    toast.error("CATEGORIA ELIMINADA")
                }
            });
        }
    }

    const limpiarCategoriaSelect=()=>{
        setCategoriaSelect({
            nombre:'',
        });
    }

    const buscarCategoriaId = (idCategoriaBusq)=>{
        let categoria=null;
        let listaCategoria = Object.keys(dataCategorias).map((id,index)=>{
            return {
                idCategoria:id,
                nombre:dataCategorias[id].nombre
            };    
        })
        categoria = listaCategoria.find(categoria => categoria.idCategoria == idCategoriaBusq);
        return categoria;
    }

    console.log("USANDO useCategorias");
    console.log(dataCategorias);

    return{
        dataCategorias,
        dataCategoriaSelect,
        submitCategoria,
        inputChangeCategoria,
        onSelectCategoria,
        onDeleteCategoria,
        limpiarCategoriaSelect  
    }

}