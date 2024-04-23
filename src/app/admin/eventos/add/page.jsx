'use client'

import { api } from "@/api"
import { EventosForm } from "@/components/EventosForm";
import EventosTable from "@/components/EventosTable";
import { LoadingText } from "@/components/LoadingText";
import { useEffect, useState } from "react";

export default function Eventos() {
    return (
        <div>
            <EventosForm  />
        </div>
    )
}