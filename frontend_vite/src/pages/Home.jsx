import { useEffect, useState } from "react";
import Card from "../components/Card.jsx";
import "./home.css";
import { Link } from "react-router-dom";

function Home() {
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
        <>
            <div className="title-area">
                <h1 className="team-title">GABİM ÇALIŞMA ARKADAŞLARIMIZ</h1>

                <Link to="/employee/add" className="add-button">
                    Çalışan Ekle
                </Link>
            </div>

            {loading ? (
                <p>Yükleniyor...</p>
            ) : (
                <div className="cards">
                    {employees.map((emp) => (
                        <Card
                            key={emp.id}
                            id={emp.id}
                            img={emp.profilePhoto || "/img/default.jpg"}
                            title={`${emp.firstName} ${emp.lastName}`}
                            departmentName={emp.department?.name}
                            phone={emp.communication?.phone}
                            email={emp.communication?.email}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

export default Home;
