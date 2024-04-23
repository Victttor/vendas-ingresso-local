'use client'

import { api } from "@/api"
import Lote_IngressosTable from "@/components/Lote_IngressosTable";
import { LoadingText } from "@/components/LoadingText";
import { useEffect, useState } from "react";

export default function Lote_Ingressos() {
    const [lote_ingressos, setLote_Ingressos] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        api.get('/lote_ingressos')
            .then(response => {
                setLote_Ingressos(response?.data || []);
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
            <Lote_IngressosTable lote_ingressos={lote_ingressos} />}
        </div>
    )
}