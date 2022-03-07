import React,{memo} from "react";
import {useNavigate} from "react-router-dom";
import MesaCardComponent from "./MesaCardComponent";
import ModalDetalleOrdenComponent from "./ModalDetalleOrdenComponent";
import ModalOpcionesComponent from "./ModalOpcionesComponent";

const MesaComponent = ({
    dataMesas,
    dataMesaBusq,
    anularMesaOrden,
    buscarArea,
    buscarOrdenR,
    dataOrdenEcontrada,
    dataOrdenDetalleEnc,
    nombrePersona}) => {


    const navigate = useNavigate();

    let mesaSelect ={
        idMesa:'',
        nombre:0,
        idArea:"",
        estado:"",
        idOrden:""
    }


    const opcionMesa=(id,mesa)=>{
        mesaSelect.idMesa=id;
        mesaSelect.nombre=mesa.nombre;
        mesaSelect.idArea=mesa.idArea;
        mesaSelect.estado=mesa.estado;
        mesaSelect.idOrden=mesa.idOrden;

        if(mesa.estado ==='libre'){
            navigate(`/factura/${id}`);
        }
    }

    const abrirFactura=(mesa)=>{
        navigate(`/factura/${mesa.idMesa}`);
    }

    return (
        <>
            {Object.keys(dataMesas).map((id,index)=>{

                if(!dataMesaBusq==''){
                    if(dataMesas[id].idArea==dataMesaBusq){
                        return (
                            <MesaCardComponent
                                key={id}
                                id={id}
                                dataMesas={dataMesas}
                                buscarArea={buscarArea}
                                opcionMesa={opcionMesa}
                            />
                        );
                    }
                }else{
                    return (

                        <MesaCardComponent
                            key={id}
                            id={id}
                            dataMesas={dataMesas}
                            buscarArea={buscarArea}
                            opcionMesa={opcionMesa}
                         />
                    );
                }
            })}

           <ModalOpcionesComponent 
                mesaSelect={mesaSelect}
                abrirFactura={abrirFactura}
                buscarOrdenR={buscarOrdenR}
                anularMesaOrden={anularMesaOrden} 
           />

            <ModalDetalleOrdenComponent 
                dataOrdenEcontrada={dataOrdenEcontrada}
                dataOrdenDetalleEnc={dataOrdenDetalleEnc}
                nombrePersona={nombrePersona}
            />
        </>
    )
}


export default MesaComponent;