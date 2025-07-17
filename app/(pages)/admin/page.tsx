
import AppointmentsList from '@/components/AppointmentsList';

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppointmentsList />
    </div>
  );
}

// Metadata para SEO
export const metadata = {
  title: 'Gerenciar Agendamentos',
  description: 'Visualize e gerencie todos os agendamentos de clientes',
};