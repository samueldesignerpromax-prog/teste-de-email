import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { enviarEmailCancelamento } from '@/lib/email';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('agendamento');
    const agendamentos = await db.collection('agendamentos')
      .find({ status: 'confirmado' })
      .sort({ data: 1, horario: 1 })
      .toArray();
    
    return NextResponse.json(agendamentos);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID não informado' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('agendamento');
    
    // Buscar agendamento antes de cancelar
    const agendamento = await db.collection('agendamentos').findOne({ 
      _id: new ObjectId(id) 
    });
    
    if (!agendamento) {
      return NextResponse.json({ error: 'Agendamento não encontrado' }, { status: 404 });
    }
    
    // ENVIAR EMAIL DE CANCELAMENTO
    await enviarEmailCancelamento(
      agendamento.email,
      agendamento.nome,
      agendamento.data,
      agendamento.horario
    );
    
    // Deletar ou atualizar status
    await db.collection('agendamentos').deleteOne({ _id: new ObjectId(id) });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Agendamento cancelado e email enviado ao cliente' 
    });
    
  } catch (error) {
    console.error('Erro:', error);
    return NextResponse.json({ error: 'Erro ao cancelar' }, { status: 500 });
  }
}
