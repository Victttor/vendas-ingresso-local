'use client'

import { api } from "@/api"
import Categ_IngressosTable from "@/components/Categ_IngressosTable";
import { LoadingText } from "@/components/LoadingText";
import { useEffect, useState } from "react";

export default function Categ_Ingressos() {
    const [categ_ingressos, setCateg_Ingressos] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        api.get('/categ_ingressos')
            .then(response => {
                setCateg_Ingressos(response?.data || []);
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
            <Categ_IngressosTable categ_ingressos={categ_ingressos} />}
        </div>
    )
}