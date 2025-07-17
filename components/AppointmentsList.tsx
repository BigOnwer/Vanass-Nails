'use client'
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, Trash2, Edit, Search, Filter } from 'lucide-react';

interface Appointment {
  id: number;
  service: string;
  date: string;
  name: string;
  phone: string;
  email: string;
  observation: string;
  dateOnly: string;
  timeOnly: string;
  formattedDate: string;
  formattedTime: string;
}

interface EditForm {
  id?: number;
  service?: string;
  date?: string;
  name?: string;
  phone?: string;
  email?: string;
  observation?: string;
}

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({});

  // Buscar agendamentos
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterDate) params.append('date', filterDate);
      
      const response = await fetch(`/api/appointments?${params}`);
      const data = await response.json();
      
      if (response.ok) {
        setAppointments(data.appointments);
      } else {
        setError(data.error || 'Erro ao buscar agendamentos');
      }
    } catch {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  // Cancelar agendamento
  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja cancelar este agendamento?')) return;
    
    try {
      const response = await fetch(`/api/appointments?id=${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setAppointments(appointments.filter(apt => apt.id !== id));
      } else {
        setError('Erro ao cancelar agendamento');
      }
    } catch {
      setError('Erro de conexão');
    }
  };

  // Iniciar edição
  const handleEdit = (appointment) => {
    setEditingId(appointment.id);
    setEditForm({
      id: appointment.id,
      service: appointment.service,
      date: appointment.date,
      name: appointment.name,
      phone: appointment.phone,
      email: appointment.email,
      observation: appointment.observation
    });
  };

  // Salvar edição
  const handleSave = async () => {
    try {
      const response = await fetch('/api/appointments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editForm)
      });
      
      if (response.ok) {
        fetchAppointments();
        setEditingId(null);
        setEditForm({});
      } else {
        const data = await response.json();
        setError(data.error || 'Erro ao atualizar agendamento');
      }
    } catch (err) {
      setError('Erro de conexão');
    }
  };

  // Filtrar agendamentos
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.phone.includes(searchTerm) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  useEffect(() => {
    fetchAppointments();
  }, [filterDate]);

  const getStatusColor = (date) => {
    const now = new Date();
    const appointmentDate = new Date(date);
    
    if (appointmentDate < now) {
      return 'bg-gray-100 border-gray-300';
    } else if (appointmentDate.toDateString() === now.toDateString()) {
      return 'bg-yellow-50 border-yellow-300';
    } else {
      return 'bg-green-50 border-green-300';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciar Agendamentos</h1>
        <p className="text-gray-600">Visualize e gerencie todos os agendamentos</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Filtros */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, telefone ou serviço..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <button
          onClick={() => {
            setFilterDate('');
            setSearchTerm('');
          }}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Limpar
        </button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900">Total de Agendamentos</h3>
          <p className="text-2xl font-bold text-blue-600">{appointments.length}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-900">Hoje</h3>
          <p className="text-2xl font-bold text-green-600">
            {appointments.filter(apt => new Date(apt.date).toDateString() === new Date().toDateString()).length}
          </p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-900">Próximos</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {appointments.filter(apt => new Date(apt.date) > new Date()).length}
          </p>
        </div>
      </div>

      {/* Lista de Agendamentos */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">Nenhum agendamento encontrado</p>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`border rounded-lg p-6 ${getStatusColor(appointment.date)}`}
            >
              {editingId === appointment.id ? (
                // Modo de edição
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                      placeholder="Nome"
                    />
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                      placeholder="Telefone"
                    />
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                      placeholder="Email"
                    />
                    <input
                      type="text"
                      value={editForm.service}
                      onChange={(e) => setEditForm({...editForm, service: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                      placeholder="Serviço"
                    />
                  </div>
                  <textarea
                    value={editForm.observation}
                    onChange={(e) => setEditForm({...editForm, observation: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Observações"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                // Modo de visualização
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-gray-500" />
                        <h3 className="text-lg font-semibold text-gray-900">{appointment.name}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{appointment.formattedDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{appointment.formattedTime}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{appointment.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{appointment.email}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600">
                        <strong>Serviço:</strong> {appointment.service}
                      </p>
                      {appointment.observation && (
                        <p className="text-sm text-gray-600 mt-2">
                          <strong>Observações:</strong> {appointment.observation}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(appointment)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentsList;