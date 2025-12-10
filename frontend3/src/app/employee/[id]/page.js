'use client';
import { useParams } from 'next/navigation';
import EmployeeDetail from '../../../components/EmployeeDetail';

export default function Page() {
    const params = useParams(); // params.id ile id’yi alırsın
    return <EmployeeDetail id={params.id} />;
}
