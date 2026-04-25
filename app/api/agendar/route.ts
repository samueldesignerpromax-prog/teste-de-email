import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { enviarEmailConfirmacao } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { nome, email, telefone, data, horario } = await request.json();

    // Validações
    if (!nome || !email || !telefone || !data || !horario) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('agendamento');
    const agendamentos = db.collection('agendamentos');

    // Verificar se horário já está ocupado
    const existe = await agendamentos.findOne({ 
      data, 
      horario, 
      status: 'confirmado' 
    });

    if (existe) {
      return NextResponse.json(
        { error: 'Este horário já está ocupado. Escolha outro horário.' },
        { status: 409 }
      );
    }

    // Criar agendamento
    const agendamento = {
      nome,
      email,
      telefone,
      data,
      horario,
      status: 'confirmado',
      criadoEm: new Date(),
    };

    await agendamentos.insertOne(agendamento);

    // ENVIO DE EMAIL AUTOMÁTICO (FOCO PRINCIPAL)
    const emailEnviado = await enviarEmailConfirmacao(email, nome, data, horario);

    if (!emailEnviado) {
      console.warn('⚠️ Agendamento criado mas email não foi enviado');
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Agendamento realizado com sucesso! Enviamos um email de confirmação.',
      emailEnviado 
    });

  } catch (error) {
    console.error('Erro:', error);
    return NextResponse.json(
      { error: 'Erro ao processar agendamento' },
      { status: 500 }
    );
  }
}
