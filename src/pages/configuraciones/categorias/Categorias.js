import React,{useState,useEffect} from "react";
import {useNavigate,useParams,Link} from "react-router-dom";
import './Categorias.css';
import {toast} from "react-toastify";
import fireDb from "../../../firebase";

const initialState ={
    nombre:""
}

const Categorias = () => {
    
    const {id} = useParams();
    const navigate = useNavigate();

    const [state,setState] = useState(initialState);
    const [data,setData] = useState({});
    const {nombre} = state;

    useEffect(()=>{
        fireDb.child("categorias").on("value",(snapshot)=>{
            if(snapshot.val() !== null){
              setData({...snapshot.val()});
            }else{
                setData({});
            }
        });
        return ()=>{
            setData({});
        }
    }, [id])

    useEffect(()=>{
        if(id){
          setState({...data[id]});
        }else{
          setState({...initialState})
        }
        return()=>{
            setState({...initialState})
        }  
      },[id,data]);

    const handleInputChange =(e)=>{
        const {name,value} = e.target;
        setState({...state,[name]:value})
    };

    const onDelete=(id)=>{
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


    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!nombre ){
            toast.error("Proporcione un valor en cada campo de entrada");
        }else{
            if(!id){
                //CREAR CATEGORIA
                fireDb.child('categorias').push(state,(error)=>{
                    if(error){
                        toast.error(error);
                    }else{
                        limpiarCamposArea();
                        toast.success("CATEGORIA GUARDADA");
                    }
                })
            }else{
                //ACTUALIZAR CATEGORIA
                fireDb.child(`categorias/${id}`).set(state,(error)=>{
                    if(error){
                        toast.error(error);
                    }else{
                        limpiarCamposArea();
                        toast.success("CATEGORIA ACTUALIZADA");
                        setTimeout(()=>navigate('/categoria'),500);
                    }
                })   
            }

        }
    };
    
    const limpiarCamposArea =()=>{
        setState({...state,nombre:''});
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h5> Categorias </h5>
                </div>
                <div className="col-4">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Categoria</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="nombre"
                                name="nombre"
                                autocomplete="off" 
                                value={nombre || ""}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">{id?'Actualizar':'Guardar'}</button>
                    </form>
                </div>
                <div className="col-8">
                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">CATEGORIA</th>

                                <th scope="col" className="tdAccion">ACCIÓN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(data).map((id,index)=>{
                                return (
                                    <tr key={id}>
                                        <th scope="row"> {index+1} </th>
                                        <td> {data[id].nombre} </td>
                                        <td className="tdAccion">
                                            <Link to={`/categoria/${id}`}>
                                                <button type="button" className="btn btn-secondary">
                                                    <span className="fas fa-edit"></span>
                                                </button>
                                            </Link>
                                            {/*Eliminar Categoria*/}
                                            <button className="btn btn-danger" onClick={()=> onDelete(id)}><span className="fas fa-trash"></span></button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categorias;