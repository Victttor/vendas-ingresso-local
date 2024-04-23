'use client'

import { api } from "@/api"
import { IngressosForm } from "@/components/IngressosForm";
import IngressosTable from "@/components/IngressosTable";
import { LoadingText } from "@/components/LoadingText";
import { useEffect, useState } from "react";

export default function Ingressos() {
    return (
        <div>
            <IngressosForm  />
        </div>
    )
}