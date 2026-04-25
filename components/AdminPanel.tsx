'use client';

import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface Agendamento {
  _id: string;
  nome: string;
  email: string;
  telefone: string;
  data: string;
  horario: string;
  criadoEm: string;
}

export default function AdminPanel() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  const carregarAgendamentos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin');
      const data = await res.json();
      setAgendamentos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Erro ao carregar agendamentos');
    } finally {
      setLoading(false);
    }
  };

  const cancelarAgendamento = async (id: string, nome: string) => {
    if (confirm(`Cancelar agendamento de ${nome}? Um email será enviado automaticamente.`)) {
      try {
        const res = await fetch(`/api/admin?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          toast.success(`✅ Agendamento cancelado! Email enviado para o cliente.`);
          carregarAgendamentos();
        } else {
          toast.error('Erro ao cancelar');
        }
      } catch (error) {
        toast.error('Erro de conexão');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Carregando agendamentos...</div>;
  }

  return (
    <div>
      <Toaster position="top-center" />
      
      {agendamentos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum agendamento encontrado</p>
        </div>
      ) : (
        <div className="space-y-3">
          {agendamentos.map((ag) => (
            <div key={ag._id} className="border rounded-lg p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{ag.nome}</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <p className="text-gray-600">
                      📧 {ag.email}
                    </p>
                    <p className="text-gray-600">
                      📞 {ag.telefone}
                    </p>
                    <p className="text-purple-600 font-medium">
                      📅 {ag.data}
                    </p>
                    <p className="text-purple-600 font-medium">
                      ⏰ {ag.horario}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => cancelarAgendamento(ag._id, ag.nome)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition ml-4"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
