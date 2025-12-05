import { useEffect, useState } from "react";
import "./comingSoon.css";

const ComingSoon = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/rest/api/employee/list")
            .then(res => res.json())
            .then(data => {
                setEmployees(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("API Error:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="coming-soon">
            <h1>Employee List</h1>

            {loading ? (
                <p>Yükleniyor...</p>
            ) : (
                <table className="employee-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ad</th>
                        <th>Soyad</th>
                        <th>Departman</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.firstName}</td>
                            <td>{emp.lastName}</td>
                            <td>{emp.department?.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <hr />

            <h2>Sayfa Hazırlanıyor 💫</h2>
            <p>Bu bölüm henüz aktif değil, yakında burada olacak 💜</p>
        </div>
    );
};

export default ComingSoon;
