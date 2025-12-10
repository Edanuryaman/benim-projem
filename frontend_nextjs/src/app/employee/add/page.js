'use client';

import { useEffect, useState } from "react"
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";

import './employeeAdd.css';

export default function EmployeeAdd() {
    const [departments, setDepartments] = useState([]);
    const [loadingDeps, setLoadingDeps] = useState(true);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        profilePhoto: "",
        cv_resume: "",
        address: "",
        phone: "",
        email: "",
        departmentId: "",
    });

    useEffect(() => {
        fetch("http://localhost:8080/rest/api/department/list")
            .then(res => res.json())
            .then(data => {
                setDepartments(data);
                setLoadingDeps(false);
            })
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            // 1. Communication kaydı
            const communicationBody = {
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
            };

            const comRes = await fetch("http://localhost:8080/rest/api/communication/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(communicationBody),
            });

            const com = await comRes.json();

            const employeeBody = {
                ...formData,
                communicationId: com.id,
            };

            const empRes = await fetch("http://localhost:8080/rest/api/employee/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(employeeBody),
            });

            if (!empRes.ok) throw new Error("Sunucu hatası: " + empRes.status);

            const result = await empRes.json(); // Boolean bekleniyor

            if (result === true) {
                alert("Çalışan başarıyla kaydedildi!");
                window.location.href = "/"; // Anasayfaya yönlendir
            } else {
                alert("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
            }
        } catch (err) {
            console.error(err);
            alert("Kayıt sırasında bir hata oluştu. Konsolu kontrol edin.");
        }
    };

    return (
        <div className="form-container">
            <h1>Yeni Çalışan Ekle</h1>

            <form className="employee-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="field full">
                        <label>Departman</label>
                        <Dropdown
                            value={formData.departmentId}
                            options={departments.map(dep => ({
                                label: dep.name,
                                value: dep.id
                            }))}
                            onChange={(e) =>
                                setFormData({ ...formData, departmentId: e.value })
                            }
                            placeholder="-- Seçin --"
                            className="w-full"
                            disabled={loadingDeps}
                            required
                            showClear
                        />
                    </div>


                    <div className="field">
                        <label>Ad</label>
                        <input name="firstName" onChange={handleChange} required />
                    </div>

                    <div className="field">
                        <label>Soyad</label>
                        <input name="lastName" onChange={handleChange} required />
                    </div>

                    <div className="field">
                        <label>Doğum Tarihi</label>
                        <Calendar
                            value={formData.dateOfBirth ? new Date(formData.dateOfBirth) : null}
                            onChange={(e) =>
                                setFormData({ ...formData, dateOfBirth: e.value.toISOString().split("T")[0] })
                            }
                            dateFormat="yy-mm-dd"
                            showIcon
                            placeholder="Tarih seçin"
                            required
                        />
                    </div>


                    <div className="field">
                        <label>Profil Fotoğrafı URL</label>
                        <input name="profilePhoto" onChange={handleChange} />
                    </div>

                    <div className="field">
                        <label>Telefon</label>
                        <input name="phone" onChange={handleChange} required />
                    </div>

                    <div className="field">
                        <label>E-mail</label>
                        <input name="email" onChange={handleChange} required />
                    </div>

                    <div className="field full">
                        <label>Adres</label>
                        <input name="address" onChange={handleChange} required />
                    </div>

                    <div className="field full">
                        <label>CV / Özgeçmiş</label>
                        <textarea name="cv_resume" rows="4" onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-buttons">
                    <button type="button" className="cancel" onClick={() => window.history.back()}>
                        İptal
                    </button>
                    <button type="submit" className="save">Kaydet</button>
                </div>
            </form>
        </div>
    );
}
