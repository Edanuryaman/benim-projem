import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./employeeDetail.css";

const EmployeeDetail = () => {
    const { id } = useParams();
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

                {/* PROFIL FOTO */}
                <img
                    src={employee.profilePhoto}
                    alt="Profil"
                    className="detail-photo"
                />

                {/* İSİM */}
                <h1 className="detail-name">
                    {employee.firstName} {employee.lastName}
                </h1>

                {/* DEPARTMAN */}
                <p className="detail-department">
                    📌 {employee.department?.name}
                </p>

                {/* ÖZGEÇMİŞ */}
                <div className="detail-section">
                    <h2>Özgeçmiş</h2>
                    <p className="detail-cv">{employee.cv_resume}</p>
                </div>

                {/* İLETİŞİM BİLGİLERİ */}
                <div className="detail-section">
                    <h2>İletişim Bilgileri</h2>
                    <div className="contact-info-detail">
                        <p><strong>📞 Telefon:</strong> {employee.communication?.phone}</p>
                        <p><strong>📧 Email:</strong> {employee.communication?.email}</p>
                        <p><strong>📍 Adres:</strong> {employee.communication?.address}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EmployeeDetail;
