import React from 'react'
import './card.css'
import { useNavigate } from "react-router-dom";

const Card = ({img, title, desc, color}) => {
    const navigate = useNavigate(); // hook component içinde olmalı

    const handleClick = () => {
        navigate("/soon"); // ComingSoon sayfasına yönlendir
    };
    return (
        <div className="card">
            <img className="card-img" src={img}/>
            <div className="card-desc">
                <h2>{title}</h2>
                <p>{desc}</p>
                <button style={{ backgroundColor : color }} onClick={handleClick} >Daha Fazlası</button>
            </div>
        </div>
    )
}
export default Card
