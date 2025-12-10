'use client';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

export default function LoginPage() {
    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
            <h2>Login</h2>
            <div className="p-field" style={{ marginBottom: '1rem' }}>
                <label>Email</label>
                <InputText placeholder="Email" className="p-inputtext-sm p-d-block" />
            </div>
            <div className="p-field" style={{ marginBottom: '1rem' }}>
                <label>Password</label>
                <Password placeholder="Password" className="p-inputtext-sm p-d-block" />
            </div>
            <Button label="Giriş Yap" className="p-button-sm" />
        </div>
    );
}
