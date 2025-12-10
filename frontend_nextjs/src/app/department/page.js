'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import './departmentPage.css';

export default function DepartmentPage() {
    const [departments, setDepartments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newDepartmentName, setNewDepartmentName] = useState("");

    const fetchDepartments = async () => {
        try {
            const res = await axios.get("http://localhost:8080/rest/api/department/list");
            const sorted = res.data.sort((a, b) => a.id - b.id);
            setDepartments(sorted);
        } catch (error) {
            console.error("Departmanlar alınamadı:", error);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const saveDepartment = async () => {
        if (!newDepartmentName.trim()) {
            alert("Departman adı boş olamaz!");
            return;
        }

        try {
            await axios.post("http://localhost:8080/rest/api/department/save", {
                name: newDepartmentName,
            });

            setShowModal(false);
            setNewDepartmentName("");
            fetchDepartments(); // listeyi yenile
        } catch (error) {
            console.error("Departman kaydedilemedi:", error);
        }
    };

    return (
        <div className="department-wrapper">
            <div className="department-header">
                <h2>Departman Listesi</h2>
                <button className="add-btn" onClick={() => setShowModal(true)}>
                    Yeni Departman
                </button>
            </div>

            <div className="department-table-container">
                <table className="department-table">
                    <thead>
                    <tr>
                        <th>Departman Adı</th>
                    </tr>
                    </thead>

                    <tbody>
                    {departments.map((dep) => (
                        <tr key={dep.id}>
                            <td>{dep.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* -------- MODAL -------- */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Yeni Departman Ekle</h3>

                        <input
                            type="text"
                            className="modal-input"
                            placeholder="Departman adı..."
                            value={newDepartmentName}
                            onChange={(e) => setNewDepartmentName(e.target.value)}
                        />

                        <div className="modal-buttons">
                            <button className="modal-btn modal-cancel" onClick={() => setShowModal(false)}>
                                İptal
                            </button>
                            <button className="modal-btn modal-save" onClick={saveDepartment}>
                                Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
