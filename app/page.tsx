import Formulario from '@/components/Formulario';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white text-center">
            <h1 className="text-3xl font-bold">Samuel Designer</h1>
            <p className="mt-2 opacity-90">Agende seu horário online</p>
          </div>
          
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <span className="text-3xl">✂️</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Agendamento</h2>
              <p className="text-gray-600 mt-2">Preencha os dados abaixo</p>
            </div>
            
            <Formulario />
            
            <div className="mt-6 text-center text-sm">
              <Link href="/admin" className="text-purple-600 hover:text-purple-700 font-medium">
                Área Administrativa →
              </Link>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-500 text-xs mt-8">
          <p>© 2024 Samuel Designer - Todos os direitos reservados</p>
          <p>samueldesignerpromax@gmail.com</p>
        </div>
      </div>
    </main>
  );
}
