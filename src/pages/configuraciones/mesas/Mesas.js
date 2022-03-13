import React from "react";
import './Mesas.css';
import { useAreas } from "../../../hooks/useAreas";
import { useMesas } from "../../../hooks/useMesas";


const Mesas = () => {

    const {dataAreas} = useAreas();
    const {
        dataMesas,
        dataMesaSelect,        
        inputChangeMesa,
        submitMesa,
        onDeleteMesa,
        onSelectMesa,
        limpiarMesaSelect} = useMesas();
    const {idMesa,nombre,idArea} = dataMesaSelect;

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h5> Mesas </h5>
                </div>
                <div className="col-4">
                    <form
                        onSubmit={submitMesa}
                    >  
                        <div className="form-row">
                            <div className="form-group col-12">
                                <label>Areas :</label>
                                 <select 
                                    className="form-control"
                                    id="idArea" 
                                    name="idArea"
                                    value={idArea || ""}
                                    onChange={inputChangeMesa}
                                    >
                                    <option key={0} value={'0'}>Seleccione una Opción</option>

                                    {Object.keys(dataAreas).map((id,index)=>{
                                        return (
                                           <option  key={id} value={`${id}`} >{dataAreas[id].nombre}</option>
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
                                autoComplete="off" 
                                value={nombre || ""}
                                onChange={inputChangeMesa}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary">
                                {idMesa?'Actualizar':'Guardar'}
                        </button>

                        <button 
                            type="button" 
                            className="btn btn-success"
                            onClick={()=> limpiarMesaSelect()}>
                                Limpiar
                        </button>
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
                            {Object.keys(dataMesas).map((id,index)=>{
                                let idArea='';
                                idArea=dataMesas[id].idArea;
                                return (
                                    <tr key={id}>
                                        <th scope="row"> {index+1} </th>
                                        <td> {dataMesas[id].nombre} </td>
                                        <td> 
                                            {Object.keys(dataAreas).map((id,index)=>{
                                                if(id===idArea){
                                                    return(<p key={id}>{dataAreas[id].nombre} </p>);
                                                }else{
                                                    return(<p key={id}> </p>);
                                                }
                                            })}
                                        </td>
                                         
                                        <td className="tdAccion">
                                            {/*Modificar Mesa onSelectMesa*/}
                                            <button 
                                                type="button" 
                                                className="btn btn-secondary"
                                                onClick={()=> onSelectMesa(id)}>
                                                    <span className="fas fa-edit"></span>
                                            </button>
                                            {/*Eliminar Mesa*/}
                                            <button
                                                type="button"  
                                                className="btn btn-danger" 
                                                onClick={()=> onDeleteMesa(id)}>
                                                    <span className="fas fa-trash"></span>
                                            </button>
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