'use client'

import { API } from "@/lib/axios"
import { createContext, ReactNode, useEffect, useState } from "react"

interface Client {
    id: string
    name: string
    service: string
    date: string 
    phone: string
    email: string
    observation?: string
    createdAt: string
}

interface ClientProps {
    name: string
    service: string
    date: string 
    phone: string
    email: string
    observation?: string
}

interface ClientContextType {
    client: Client[]
    CreateClient: (data: ClientProps) => Promise<void>
}

interface ClientProviderProps {
    children: ReactNode;
}

export const ClientContext = createContext({} as ClientContextType)

export function ClientProvider({  children  }: ClientProviderProps ) {
    const [client, setClient] = useState<Client[]>([])

    async function CreateClient(data: ClientProps) {
        const { name, service, date, phone, email, observation } = data

        try {
            const response = await API.post('clients', {
                name,
                service,
                date,
                phone,
                email,
                observation,
                createdAt: new Date()
            })
            setClient((state) => [response.data, ...state])
        } catch(error) {
            console.log('erro em criar cliente:', error)
        }
    }

    return(
        <ClientContext.Provider
            value={{
                client,
                CreateClient
            }}
        >
            {children}
        </ClientContext.Provider>
    )
}