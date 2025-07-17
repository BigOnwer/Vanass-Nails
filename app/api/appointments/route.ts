// app/api/appointments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db as prisma } from '@/lib/prisma'

// GET - Buscar todos os agendamentos
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    const status = searchParams.get('status')

    try {
        // Construir filtros dinamicamente
        const dateFilter = date ? { date: { startsWith: date } } : {}
        const statusFilter = status ? { status } : {}
        
        const whereClause = {
            ...dateFilter,
            ...statusFilter
        }

        const appointments = await prisma.clientes.findMany({
            where: whereClause,
            orderBy: {
                date: 'asc'
            }
        })

        // Transformar os dados para melhor apresentação
        const formattedAppointments = appointments.map(appointment => {
            const [dateOnly, timeOnly] = appointment.date.split(' ')
            return {
                ...appointment,
                dateOnly,
                timeOnly,
                formattedDate: new Date(dateOnly).toLocaleDateString('pt-BR'),
                formattedTime: timeOnly
            }
        })

        return NextResponse.json({
            appointments: formattedAppointments,
            total: appointments.length
        })

    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// DELETE - Cancelar agendamento
export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
        return NextResponse.json(
            { error: "ID é obrigatório" }, 
            { status: 400 }
        )
    }

    try {
        const deletedAppointment = await prisma.clientes.delete({
            where: {
                id: id
            }
        })

        return NextResponse.json({ 
            message: "Agendamento cancelado com sucesso",
            appointment: deletedAppointment 
        })

    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// PUT - Atualizar agendamento
export async function PUT(request: NextRequest) {
    const data = await request.json()
    const { id, service, date, name, phone, email, observation } = data

    if (!id) {
        return NextResponse.json(
            { error: "ID é obrigatório" }, 
            { status: 400 }
        )
    }

    try {
        // Se a data foi alterada, verificar se o novo horário está disponível
        if (date) {
            const [dateOnly, timeOnly] = date.split(' ')
            
            const existingAppointment = await prisma.clientes.findFirst({
                where: {
                    date: {
                        startsWith: dateOnly
                    },
                    AND: {
                        date: {
                            contains: timeOnly
                        }
                    },
                    NOT: {
                        id: id
                    }
                }
            })

            if (existingAppointment) {
                return NextResponse.json(
                    { error: "Horário já ocupado" }, 
                    { status: 409 }
                )
            }
        }

        const updatedAppointment = await prisma.clientes.update({
            where: {
                id: id
            },
            data: {
                service,
                date,
                name,
                phone,
                email,
                observation,
            }
        })

        return NextResponse.json(updatedAppointment)

    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}