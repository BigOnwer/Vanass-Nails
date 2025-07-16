import { NextRequest, NextResponse } from "next/server";
import { db as prisma } from '@/lib/prisma'

// Horários base disponíveis
const ALL_TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

// POST - Criar novo agendamento
export async function POST(request: NextRequest) {
    const data = await request.json()
    let { service, date, name, phone, email, observation } = data

    try {
        // Verificar se o horário ainda está disponível antes de criar
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
                }
            }
        })

        if (existingAppointment) {
            return NextResponse.json(
                { error: "Horário já ocupado" }, 
                { status: 409 }
            )
        }

        const post = await prisma.clientes.create({
            data: {
                service,
                date,
                name,
                phone,
                email,
                observation,
            }
        })
        
        return NextResponse.json(post)
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// GET - Buscar horários disponíveis para uma data
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    if (!date) {
        return NextResponse.json(
            { error: "Data é obrigatória" }, 
            { status: 400 }
        )
    }

    try {
        // Buscar todos os agendamentos para a data específica
        const existingAppointments = await prisma.clientes.findMany({
            where: {
                date: {
                    startsWith: date // busca por data no formato YYYY-MM-DD
                }
            },
            select: {
                date: true
            }
        })

        // Extrair apenas os horários ocupados
        const occupiedTimes = existingAppointments.map(appointment => {
            const [, time] = appointment.date.split(' ')
            return time
        })

        // Filtrar horários disponíveis
        const availableTimeSlots = ALL_TIME_SLOTS.filter(
            time => !occupiedTimes.includes(time)
        )

        return NextResponse.json({
            date,
            availableTimeSlots,
            occupiedTimes
        })

    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}