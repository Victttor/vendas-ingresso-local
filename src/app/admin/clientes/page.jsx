'use client'

import { api } from "@/api"
import ClientesTable from "@/components/ClientesTable";
import { LoadingText } from "@/components/LoadingText";
import { useEffect, useState } from "react";

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        api.get('/clientes')
            .then(response => {
                setClientes(response?.data || []);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [])
    
    return (
        <div>
            <div> 
                {loading && <LoadingText />} 
            </div>

            {(!loading) &&
            <ClientesTable clientes={clientes} />}
        </div>
    )
}