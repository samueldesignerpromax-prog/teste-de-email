import nodemailer from 'nodemailer';

// Configuração com o email samueldesignerpromax@gmail.com
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'samueldesignerpromax@gmail.com',
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verificar configuração
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Erro ao configurar email:', error);
  } else {
    console.log('✅ Email configurado: samueldesignerpromax@gmail.com');
    console.log('✅ Sistema pronto para enviar emails automaticamente');
  }
});

// Template de email de CONFIRMAÇÃO
export async function enviarEmailConfirmacao(email: string, nome: string, data: string, horario: string) {
  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmação de Agendamento</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          line-height: 1.6;
          background-color: #f4f4f9;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
        }
        .header h1 {
          font-size: 28px;
          margin-bottom: 10px;
        }
        .header p {
          font-size: 16px;
          opacity: 0.9;
        }
        .content {
          padding: 40px 30px;
        }
        .content h2 {
          color: #333;
          margin-bottom: 20px;
        }
        .info-box {
          background: #f8f9fa;
          border-left: 4px solid #667eea;
          padding: 20px;
          margin: 25px 0;
          border-radius: 8px;
        }
        .info-item {
          margin: 15px 0;
          font-size: 16px;
        }
        .info-item strong {
          color: #667eea;
          display: inline-block;
          width: 80px;
        }
        .message {
          background: #e8f5e9;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
          color: #2e7d32;
        }
        .footer {
          background: #f8f9fa;
          padding: 30px;
          text-align: center;
          font-size: 12px;
          color: #666;
          border-top: 1px solid #e0e0e0;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background: #667eea;
          color: white;
          text-decoration: none;
          border-radius: 25px;
          margin-top: 20px;
        }
        @media (max-width: 480px) {
          .container {
            margin: 10px;
          }
          .content {
            padding: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Agendamento Confirmado!</h1>
          <p>Samuel Designer - Seu estilo, nossa paixão</p>
        </div>
        <div class="content">
          <h2>Olá ${nome}!</h2>
          <p>Seu horário foi reservado com sucesso. Confira os detalhes abaixo:</p>
          
          <div class="info-box">
            <div class="info-item">
              <strong>📅 Data:</strong> ${data}
            </div>
            <div class="info-item">
              <strong>⏰ Horário:</strong> ${horario}
            </div>
            <div class="info-item">
              <strong>✂️ Serviço:</strong> Corte e Estilo
            </div>
          </div>

          <div class="message">
            <strong>📌 IMPORTANTE:</strong><br>
            • Chegue 10 minutos antes do horário<br>
            • Traga seu comprovante de agendamento<br>
            • Cancelamentos com 24h de antecedência
          </div>

          <p>Em caso de imprevistos, entre em contato:<br>
          📞 (11) 99999-9999<br>
          📧 samueldesignerpromax@gmail.com</p>
          
          <center>
            <a href="#" class="button">Ver meus agendamentos</a>
          </center>
        </div>
        <div class="footer">
          <p>© 2024 Samuel Designer - Todos os direitos reservados</p>
          <p>Este é um email automático, por favor não responda.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: '"Samuel Designer" <samueldesignerpromax@gmail.com>',
      to: email,
      subject: '✅ Confirmação de Agendamento - Samuel Designer',
      html,
    });
    console.log(`✅ Email confirmado enviado para ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    return false;
  }
}

// Template de email de CANCELAMENTO
export async function enviarEmailCancelamento(email: string, nome: string, data: string, horario: string) {
  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Cancelamento de Agendamento</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f4f9; }
        .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 15px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 40px; text-align: center; }
        .content { padding: 40px; }
        .info-box { background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>❌ Agendamento Cancelado</h1>
        </div>
        <div class="content">
          <h2>Olá ${nome},</h2>
          <p>Seu agendamento foi cancelado conforme solicitado.</p>
          <div class="info-box">
            <p><strong>📅 Data:</strong> ${data}</p>
            <p><strong>⏰ Horário:</strong> ${horario}</p>
          </div>
          <p>Esperamos atendê-lo em outra oportunidade!</p>
          <p>Para remarcar, acesse nosso site novamente.</p>
        </div>
        <div class="footer">
          <p>Samuel Designer - samueldesignerpromax@gmail.com</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: '"Samuel Designer" <samueldesignerpromax@gmail.com>',
      to: email,
      subject: '❌ Cancelamento de Agendamento - Samuel Designer',
      html,
    });
    console.log(`✅ Email cancelamento enviado para ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    return false;
  }
}
