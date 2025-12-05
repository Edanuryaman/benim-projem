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
            <h1>Employee List 💼</h1>

            {loading ? (
                <p>Yükleniyor...</p>
            ) : (
                <div className="employee-cards">
                    {employees.map((emp) => (
                        <div className="employee-card" key={emp.id}>
                            <h2>{emp.firstName} {emp.lastName}</h2>
                            <p><strong>Departman:</strong> {emp.department?.name}</p>
                        </div>
                    ))}
                </div>
            )}

            <hr />
        </div>
    );
};

export default ComingSoon;
