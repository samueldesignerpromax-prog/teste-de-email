import AdminPanel from '@/components/AdminPanel';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Painel Administrativo</h1>
                <p className="mt-1 opacity-90">Gerencie os agendamentos</p>
              </div>
              <Link href="/" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition">
                ← Voltar
              </Link>
            </div>
          </div>
          
          <div className="p-8">
            <AdminPanel />
          </div>
        </div>
      </div>
    </main>
  );
}
