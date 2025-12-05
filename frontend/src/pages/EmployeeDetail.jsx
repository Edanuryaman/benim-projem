import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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

    if (loading) return <p>Yükleniyor...</p>;
    if (!employee) return <p>Kayıt bulunamadı</p>;

    return (
        <div className="detail-page">
            <h1>{employee.firstName} {employee.lastName}</h1>

            <p><strong>Departman:</strong> {employee.department?.name}</p>
            <p><strong>Telefon:</strong> {employee.communication?.phone}</p>
            <p><strong>Email:</strong> {employee.communication?.email}</p>

            <img
                src={employee.profilePhoto}
                alt="profil"
                style={{ width: "150px", borderRadius: "10px", marginTop: "20px" }}
            />
        </div>
    );
};

export default EmployeeDetail;
