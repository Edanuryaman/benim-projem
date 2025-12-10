'use client';

import { useRouter } from 'next/navigation';
import './card.css';

export default function Card({ id, img, title, departmentName, phone, email }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/employee/${id}`); // Next.js route
    };

    return (
        <div className="card">
            <img className="card-img" src={img} alt={title} />
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
    );
}
