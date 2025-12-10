import React from 'react'
import './card.css'
import {useNavigate} from "react-router-dom";

const Card = ({id, img, title, departmentName, phone, email}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/employee/${id}`);
    };

    return (
        <div className="card">
            <img className="card-img" src={img}/>
            <div className="card-desc">
                <h2 className="employee-title">{title}</h2>

                <div className="department-badge">
                    {departmentName}
                </div>

                <div className="contact-info">
                    <p><strong>Telefon:</strong> {phone || "Belirtilmedi"}</p>
                    <p><strong>Email:</strong> {email || "Belirtilmedi"}</p>
                </div>

                <button onClick={handleClick}>
                    Daha Fazlası
                </button>
            </div>
        </div>
    )
}

export default Card
