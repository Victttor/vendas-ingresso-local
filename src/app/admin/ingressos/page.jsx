'use client'

import { api } from "@/api"
import IngressosTable from "@/components/IngressosTable";
import { LoadingText } from "@/components/LoadingText";
import { useEffect, useState } from "react";

export default function Ingressos() {
    const [ingressos, setIngressos] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        api.get('/ingressos')
            .then(response => {
                setIngressos(response?.data || []);
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
            <IngressosTable ingressos={ingressos} />}
        </div>
    )
}