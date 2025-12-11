'use client';

import { useEffect, useState } from "react";
import Card from "../components/Card"; // Next.js’de .js yazmak yeterli
import Link from "next/link"; // React Router yerine Next.js Link
import './home.css'; // CSS importu aynı

export default function HomePage() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/rest/api/employee/list")
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a, b) => a.id - b.id);

                setEmployees(sorted);
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

                <Link href="/employee/add" className="add-button">
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
                            img={emp.profilePhoto || "/img/resim1.jpg"}
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
