import React,{useState,useEffect} from "react";
import {useNavigate,useParams,Link} from "react-router-dom";
import './Productos.css';
import {toast} from "react-toastify";
import fireDb from "../../../firebase";

const initialState ={
    idCategoria:"",
    nombre:"",
    precio:0.0,
    estado:"disponible"
}

const Productos = () => {
    
    const [state,setState] = useState(initialState);
    const [data,setData] = useState({});
    
    const [categoriasData,setCategoriasData] = useState({});
    const {idCategoria,nombre,precio,estado} = state;

    useEffect(()=>{
        fireDb.child("productos").on("value",(snapshot)=>{
            if(snapshot.val() !== null){
              setData({...snapshot.val()});
            }else{
                setData({});
            }
        });
        return ()=>{
            setData({});
        }
    }, [])

    useEffect(()=>{
        fireDb.child("categorias").on("value",(snapshot)=>{
            if(snapshot.val() !== null){
                setCategoriasData({...snapshot.val()});
            }else{
                setCategoriasData({});
            }
        });
        return ()=>{
            setCategoriasData({});
        }
    }, [])

    const handleInputChange =(e)=>{
        const {name,value} = e.target;
        setState({...state,[name]:value})
    };


    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!nombre ){
            toast.error("Proporcione un valor en cada campo de entrada");
        }else{
            fireDb.child('productos').push(state,(error)=>{
                if(error){
                    toast.error(error);
                }else{
                    toast.success("PRODUCTO GUARDADO");
                }
            })
        }
    };

    
    const onDelete=(id)=>{
        if(window.confirm("Seguro de Eliminar Producto?")){
            fireDb.child(`productos/${id}`).remove((err)=>{
                if(err){
                    toast.error(err);
                }else{
                    toast.error("PRODUCTO ELIMINADO")
                }
            });
        }
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h5> PRODUCTOS </h5>
                </div>
                <div className="col-4">
                    <form
                        onSubmit={handleSubmit}
                    >  
                        <div className="form-row">
                            <div className="form-group col-12">
                                <label>CATEGORIAS :</label>
                                 <select 
                                    className="form-control"
                                    id="idCategoria" 
                                    name="idCategoria"
                                    value={idCategoria || ""}
                                    onChange={handleInputChange}
                                    >
                                    <option key={0}>Seleccione una Opción</option>  
                                    {Object.keys(categoriasData).map((id,index)=>{
                                        return (
                                           <option  key={id} value={`${id}`} >{categoriasData[id].nombre}</option>
                                        )
                                    })}
                                 </select>
                              </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">PRODUCTO</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="nombre"
                                name="nombre"
                                autoComplete="off"
                                value={nombre || ""}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="precio" className="form-label">PRECIO</label>
                            <input 
                                type='number'
                                step="0.1"
                                min='0'
                                max='20' 
                                className="form-control" 
                                id="precio"
                                name="precio"
                                value={precio || ""}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </form>
                </div>
                <div className="col-8">
                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">PRODUCTO</th>
                                <th scope="col">PRECIO</th>
                                <th scope="col">CATEGORIA</th>
                                <th scope="col" className="tdAccion">ACCIÓN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(data).map((id,index)=>{
                                let idCategoria='';
                                idCategoria=data[id].idCategoria;
                                return (
                                    <tr key={id}>
                                        <th scope="row"> {index+1} </th>
                                        <td> {data[id].nombre} </td>
                                        <td> {data[id].precio} </td>
                                        <td> 
                                            {Object.keys(categoriasData).map((id,index)=>{
                                                if(id===idCategoria){
                                                    return(<p key={id}>{categoriasData[id].nombre} </p>);
                                                }else{
                                                    return(<p key={id}> </p>);
                                                }
                                            })}
                                        </td>
                                        <td className="tdAccion">
                                            <Link to={'/mesa'}>
                                                <button type="button" className="btn btn-secondary">
                                                    <span className="fas fa-edit"></span>
                                                </button>
                                            </Link>
                                            {/*Eliminar Producto*/}
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

export default Productos;