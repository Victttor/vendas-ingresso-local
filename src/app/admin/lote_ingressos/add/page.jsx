'use client'
import { api } from "@/api"
import { Lote_IngressosForm } from "@/components/Lote_IngressosForm";
import Lote_IngressosTable from "@/components/Lote_IngressosTable";
import { LoadingText } from "@/components/LoadingText";
import { useEffect, useState } from "react";

export default function Lote() {
    return (
        <div>
            <Lote_IngressosForm  />
        </div>
    )
}