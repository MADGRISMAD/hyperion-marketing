import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Aquí puedes implementar la lógica para enviar el correo
    // Por ejemplo, usando un servicio de email como SendGrid, Mailgun, etc.
    // Por ahora, solo simulamos el envío exitoso

    return NextResponse.json(
      { message: 'Mensaje enviado exitosamente' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error al procesar el formulario:', error)
    return NextResponse.json(
      { error: 'Error al procesar el formulario' },
      { status: 500 }
    )
  }
} 