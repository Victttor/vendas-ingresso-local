'use client'
import { api } from "@/api"
import { Categ_IngressosForm } from "@/components/Categ_IngressosForm";
import Categ_IngressosTable from "@/components/Categ_IngressosTable";
import { LoadingText } from "@/components/LoadingText";
import { useEffect, useState } from "react";

export default function Categoria() {
    return (
        <div>
            <Categ_IngressosForm  />
        </div>
    )
}