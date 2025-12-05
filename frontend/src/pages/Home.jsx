import { useEffect, useState } from "react";
import Card from "../components/Card.jsx";// Card komponentini doğru import ettiğinden emin ol
import "./home.css";

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
            <h1 className="team-title">GABİM ÇALIŞMA ARKADAŞLARIMIZ</h1>

            {loading ? (
                <p>Yükleniyor...</p>
            ) : (
                <div className="cards">
                    {employees.map((emp) => (
                        <Card
                            key={emp.id}
                            img={emp.profilePhoto || "/img/default.jpg"}
                            title={`${emp.firstName} ${emp.lastName}`}
                            departmentName={emp.department?.name}
                            phone={emp.communication?.phone}
                            email={emp.communication?.email}
                            color="#980077FF"
                        />
                    ))}
                </div>
            )}
        </>
    );
}

export default Home;
