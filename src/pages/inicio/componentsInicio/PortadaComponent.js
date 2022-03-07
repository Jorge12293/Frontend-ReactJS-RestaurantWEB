import React from "react";
import PropTypes from "prop-types";

const PortadaComponent = ({titulo}) => {

    return (
        <div className="inicio">
            <h2 className="titulo" style={{top:'30px'}}>{titulo}</h2>
            <div className="content-all" style={{top:'30px'}}>
                <div className="content-carrousel">
                    <figure><img src={'assets/img_inicio/img1.jpg'}/></figure>
                    <figure><img src={'assets/img_inicio/img2.jpg'}/></figure>
                    <figure><img src={'assets/img_inicio/img3.jpg'}/></figure>
                    <figure><img src={'assets/img_inicio/img4.jpg'}/></figure>
                    <figure><img src={'assets/img_inicio/img5.jpg'}/></figure>
                    <figure><img src={'assets/img_inicio/img6.jpg'}/></figure>
                    <figure><img src={'assets/img_inicio/img7.jpg'}/></figure>
                    <figure><img src={'assets/img_inicio/img8.jpg'}/></figure>
                    <figure><img src={'assets/img_inicio/img9.jpg'}/></figure>
                    <figure><img src={'assets/img_inicio/img10.jpg'}/></figure>
                </div>
            </div>       
        </div>
    )
}

PortadaComponent.propTypes={
    titulo:PropTypes.string.isRequired
}


export default PortadaComponent;