'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Next.js 13+ App Router
import './employeeDetail.css';

export default function EmployeeDetail() {
    const params = useParams(); // { id: '...' }
    const id = params.id;

    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8080/rest/api/employee/list/${id}`)
            .then(res => res.json())
            .then(data => {
                setEmployee(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Detay API Hatası:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p className="loading">Yükleniyor...</p>;
    if (!employee) return <p className="not-found">Kayıt bulunamadı</p>;

    return (
        <div className="detail-container">
            <div className="detail-card">

                {employee.profilePhoto && (
                    <img
                        src={employee.profilePhoto}
                        alt="Profil"
                        className="detail-photo"
                    />
                )}

                <h1 className="detail-name">
                    {employee.firstName} {employee.lastName}
                </h1>

                {employee.username && (
                    <p className="detail-username" style={{ fontSize: "14px", color: "#555" }}>
                        @{employee.username}
                    </p>
                )}

                {employee.department && (
                    <p className="detail-department">
                        📌 {employee.department.name}
                    </p>
                )}

                {employee.cv_resume && (
                    <div className="detail-section">
                        <h2>Özgeçmiş</h2>
                        <p className="detail-cv">{employee.cv_resume}</p>
                    </div>
                )}

                {employee.communication && (
                    <div className="detail-section">
                        <h2>İletişim Bilgileri</h2>
                        <div className="contact-info-detail">
                            <p><strong>📞 Telefon:</strong> {employee.communication.phone}</p>
                            <p><strong>📧 Email:</strong> {employee.communication.email}</p>
                            <p><strong>📍 Adres:</strong> {employee.communication.address}</p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
