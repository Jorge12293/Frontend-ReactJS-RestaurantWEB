import React, { useMemo } from "react";
import './Pos.css';

import MesaComponent from "./componentsPos/MesaComponent";
import { useAreas } from "../../hooks/useAreas";
import { useMesas } from "../../hooks/useMesas";
import { useOrden } from "../../hooks/useOrden";
import AreaComponent from "./componentsPos/AreaComponent";
import Loader from "../../components/Loader";
import { usePersonas } from "../../hooks/usePersonas";
const Pos = () => {

    const {dataAreas,buscarArea} = useAreas();
    const {dataMesas,dataMesaBusq,filtrarMesasPorArea,anularMesa} = useMesas();
    const {dataOrdenEcontrada,dataOrdenDetalleEnc,buscarOrdenR,updateEstadoOrden} = useOrden();
    const {nombrePersona} = usePersonas();

    const anularMesaOrden = (mesaSel)=>{
        anularMesa(mesaSel);
        console.log(mesaSel);
        updateEstadoOrden(mesaSel.idOrden,'ANULADA');
    };

    if(dataMesas.length==0){
        return (
            <Loader/>
        )
    }else{
        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 areas">
                            <AreaComponent
                                dataAreas={dataAreas}
                                filtrarMesasPorArea={filtrarMesasPorArea}
                            />    
                        </div>
                        <div className="mesas">
                            <MesaComponent 
                                dataMesas= {dataMesas}
                                dataMesaBusq={dataMesaBusq}
                                anularMesaOrden={anularMesaOrden}
                                buscarArea={buscarArea}
                                buscarOrdenR={buscarOrdenR}
                                dataOrdenEcontrada={dataOrdenEcontrada}
                                dataOrdenDetalleEnc={dataOrdenDetalleEnc}
                                nombrePersona={nombrePersona}
                            />
                        </div>  
                    </div>        
                </div>
            </>
        )
    }
    

}

export default Pos;