'use client'

import { api } from "@/api"
import { ClientesForm } from "@/components/ClientesForm";
import ClientesTable from "@/components/ClientesTable";
import { LoadingText } from "@/components/LoadingText";
import { useEffect, useState } from "react";

export default function Clientes() {
    return (
        <div>
            <ClientesForm  />
        </div>
    )
}