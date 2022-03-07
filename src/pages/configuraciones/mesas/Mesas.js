import React,{useState,useEffect} from "react";
import {useNavigate,useParams,Link} from "react-router-dom";
import './Mesas.css';
import {toast} from "react-toastify";
import fireDb from "../../../firebase";

const initialState ={
    idArea:"",
    nombre:0,
    estado:"libre",
    idOrden:""
}

const Mesas = () => {
    
    const [state,setState] = useState(initialState);
    const [data,setData] = useState({});
    const [areasData,setAreasData] = useState({});
    const {nombre,idArea,estado} = state;

    useEffect(()=>{
        fireDb.child("mesas").on("value",(snapshot)=>{
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
        fireDb.child("areas").on("value",(snapshot)=>{
            if(snapshot.val() !== null){
                setAreasData({...snapshot.val()});
            }else{
                setAreasData({});
            }
        });
        return ()=>{
            setAreasData({});
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
            fireDb.child('mesas').push(state,(error)=>{
                if(error){
                    toast.error(error);
                }else{
                    toast.success("MESA GUARDADA");
                }
            })
        }
    };

    
    const onDelete=(id)=>{
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

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h5> Mesas </h5>
                </div>
                <div className="col-4">
                    <form
                        onSubmit={handleSubmit}
                    >  
                        <div className="form-row">
                            <div className="form-group col-12">
                                <label>Areas :</label>
                                 <select 
                                    className="form-control"
                                    id="idArea" 
                                    name="idArea"
                                    value={idArea || ""}
                                    onChange={handleInputChange}
                                    >
                                    <option key={0}>Seleccione una Opción</option>  
                                    {Object.keys(areasData).map((id,index)=>{
                                        return (
                                           <option  key={id} value={`${id}`} >{areasData[id].nombre}</option>
                                        )
                                    })}
                                 </select>
                              </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Numero de Mesa</label>
                            <input 
                                type='number'
                                min='1'
                                className="form-control" 
                                id="nombre"
                                name="nombre"
                                autocomplete="off" 
                                value={nombre || ""}
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
                                <th scope="col">MESA</th>
                                <th scope="col">AREA</th>
                                <th scope="col" className="tdAccion">ACCIÓN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(data).map((id,index)=>{
                                let idArea='';
                                idArea=data[id].idArea;
                                return (
                                    <tr key={id}>
                                        <th scope="row"> {index+1} </th>
                                        <td> {data[id].nombre} </td>
                                        <td> 
                                            {Object.keys(areasData).map((id,index)=>{
                                                if(id===idArea){
                                                    return(<p key={id}>{areasData[id].nombre} </p>);
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
                                            {/*Eliminar Mesa*/}
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

export default Mesas;