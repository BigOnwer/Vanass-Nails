"use client"

import type React from "react"
import { useContext, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, User, CalendarIcon, Sparkles } from "lucide-react"
import Link from "next/link"
import * as z from 'zod';
import { ClientContext } from "@/app/contexts/CreateClient"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation"

const NewClientFormSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    service: z.string().min(1, "Serviço é obrigatório"),
    date: z.string().min(1, "Data é obrigatória"),
    phone: z.string().min(1, "Telefone é obrigatório"),
    email: z.string().email("Email deve ser válido").min(1, "Email é obrigatório"),
    observation: z.string().optional()
})

type newClientFormInput = z.infer<typeof NewClientFormSchema>

export default function AgendamentoPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([])
  const [loadingTimeSlots, setLoadingTimeSlots] = useState(false)
  //

  const services = [
    { id: "manicure", name: "Manicure Clássica", price: "R$ 35", duration: "45 min" },
    { id: "gel", name: "Esmaltação em Gel", price: "R$ 55", duration: "60 min" },
    { id: "nailart", name: "Nail Art", price: "R$ 80", duration: "90 min" },
    { id: "alongamento", name: "Alongamento", price: "R$ 120", duration: "120 min" },
    { id: "pedicure", name: "Pedicure Spa", price: "R$ 65", duration: "75 min" },
    { id: "blindagem", name: "Blindagem das Unhas", price: "R$ 45", duration: "50 min" },
  ]

  const timeSlots = [
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
  ]

  const selectedServiceData = services.find((s) => s.id === selectedService)

  const { CreateClient } = useContext(ClientContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<newClientFormInput>({
    resolver: zodResolver(NewClientFormSchema),
  });

  useEffect(() => {
    setValue('service', selectedService);
  }, [selectedService, setValue]);

  useEffect(() => {
    if (selectedDate && selectedTime) {
      const formattedDate = `${selectedDate.toISOString().split('T')[0]} ${selectedTime}`;
      setValue('date', formattedDate);
    } else {
      setValue('date', '');
    }
  }, [selectedDate, selectedTime, setValue]);

  const router = useRouter();

  

  async function handleRegister(data: newClientFormInput) {
    setIsLoading(true);
  
    try {
      console.log('Dados do formulário:', data); // Debug
      
      await CreateClient(data);
      
      toast.success('Sucesso ao marcar horário');
      reset();
      
      // Limpar estados locais
      setSelectedService('');
      setSelectedDate(undefined);
      setSelectedTime('');
      
    } catch(error) {
      console.error('Erro:', error);
      toast.error('Erro ao tentar marcar um horário');
    } finally {
      setIsLoading(false);
    }
  }

  const fetchAvailableTimeSlots = async (date: Date) => {
    setLoadingTimeSlots(true)
    try {
      const dateString = date.toISOString().split('T')[0] // formato YYYY-MM-DD
      
      const response = await fetch(`/api/clients?date=${dateString}`)
      
      if (!response.ok) {
        throw new Error('Erro ao buscar horários disponíveis')
      }
      
      const data = await response.json()
      setAvailableTimeSlots(data.availableTimeSlots || [])
      
    } catch (error) {
      console.error('Erro ao buscar horários:', error)
      toast.error('Erro ao carregar horários disponíveis')
      setAvailableTimeSlots([])
    } finally {
      setLoadingTimeSlots(false)
    }
  }

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableTimeSlots(selectedDate)
      // Limpar horário selecionado quando muda a data
      setSelectedTime("")
    }
  }, [selectedDate])

  useEffect(() => {
    if (selectedTime && !availableTimeSlots.includes(selectedTime)) {
      setSelectedTime("")
      toast.warning('O horário selecionado não está mais disponível')
    }
  }, [availableTimeSlots, selectedTime])

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableTimeSlots(selectedDate)
      // Limpar horário selecionado quando muda a data
      setSelectedTime("")
    }
  }, [selectedDate])

  useEffect(() => {
    if (selectedTime && !availableTimeSlots.includes(selectedTime)) {
      setSelectedTime("")
      toast.warning('O horário selecionado não está mais disponível')
    }
  }, [availableTimeSlots, selectedTime])

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-pink-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-gray-700 hover:text-pink-500 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-pink-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Vanass Nails
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Agendar Horário
            </h1>
            <p className="text-xl text-gray-600">Escolha o serviço, data e horário que melhor se adequa à sua agenda</p>
          </div>

          <form onSubmit={handleSubmit(handleRegister)} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Seleção de Serviço */}
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-pink-500" />
                    Escolha o Serviço
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedService === service.id
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-200 hover:border-pink-300"
                      }`}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-800">{service.name}</h3>
                          <div className="flex items-center mt-1 text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            {service.duration}
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-pink-100 text-pink-700">
                          {service.price}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Seleção de Data e Horário */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-pink-500" />
                    Data e Horário
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Selecione a Data</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      className="rounded-md border border-pink-200"
                    />
                  </div>

                  {selectedDate && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Horários Disponíveis
                        {loadingTimeSlots && (
                          <span className="text-sm text-gray-500 ml-2">(Carregando...)</span>
                        )}
                      </Label>
                      
                      {loadingTimeSlots ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-2">
                          {availableTimeSlots.length > 0 ? (
                            availableTimeSlots.map((time) => (
                              <Button
                                key={time}
                                type="button"
                                variant={selectedTime === time ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedTime(time)}
                                className={
                                  selectedTime === time
                                    ? "bg-pink-500 hover:bg-pink-600"
                                    : "border-pink-200 text-pink-600 hover:bg-pink-50"
                                }
                              >
                                {time}
                              </Button>
                            ))
                          ) : (
                            <div className="col-span-3 text-center py-4 text-gray-500">
                              Nenhum horário disponível para esta data
                            </div>
                          )}
                        </div>
                      )}
                      
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Dados Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-pink-500" />
                  Seus Dados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Nome Completo *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      {...register('name')}
                      className="mt-1 border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Telefone *
                    </Label>
                    <Input
                      id="phone"
                      type="string"
                      {...register('phone')}
                      className="mt-1 border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="mt-1 border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="observations" className="text-sm font-medium text-gray-700">
                      Observações (opcional)
                    </Label>
                    <Textarea
                      id="observations"
                      {...register('observation')}
                      className="mt-1 border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                      placeholder="Alguma preferência ou observação especial..."
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resumo do Agendamento */}
            {/*selectedService && selectedDate && selectedTime && (
              <Card className="border-pink-200 bg-pink-50">
                <CardHeader>
                  <CardTitle className="text-pink-700">Resumo do Agendamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>
                      <strong>Serviço:</strong> {selectedServiceData?.name}
                    </p>
                    <p>
                      <strong>Preço:</strong> {selectedServiceData?.price}
                    </p>
                    <p>
                      <strong>Duração:</strong> {selectedServiceData?.duration}
                    </p>
                    <p>
                      <strong>Data:</strong> {selectedDate.toLocaleDateString("pt-BR")}
                    </p>
                    <p>
                      <strong>Horário:</strong> {selectedTime}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )*/}

            {/* Botão de Confirmação */}
            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-12 py-3 text-lg"
                disabled={
                    isLoading || 
                    !selectedService || 
                    !selectedDate || 
                    !selectedTime
                }
              >
                {isLoading ? 'Processando...' : 'Confirmar Agendamento'}
              </Button>
              <p className="text-sm text-gray-500 mt-2">Entraremos em contato para confirmar seu agendamento</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}