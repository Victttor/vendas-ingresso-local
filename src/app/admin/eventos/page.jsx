'use client'

import { api } from "@/api"
import EventosTable from "@/components/EventosTable";
import { LoadingText } from "@/components/LoadingText";
import { useEffect, useState } from "react";

export default function Eventos() {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        api.get('/eventos')
            .then(response => {
                setEventos(response?.data || []);
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
            <EventosTable eventos={eventos} />}
        </div>
    )
}