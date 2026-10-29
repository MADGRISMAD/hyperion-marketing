import nodemailer from "nodemailer";

// El formulario sale por Gmail (SMTP_USER = la cuenta, SMTP_PASS = una contraseña de aplicación de Google).
// Ambas viven en las variables de entorno de Vercel, nunca en el código.
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export async function POST(request) {
  const { name, email, message } = await request.json();
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return new Response(JSON.stringify({ error: "Correo no configurado" }), { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  try {
    // Se envía desde la cuenta propia (si no, el correo del visitante falla SPF y cae en spam) y «Responder» va al visitante.
    await transporter.sendMail({
      from: `"${String(name ?? "").replace(/["\r\n]/g, "").slice(0, 80)} (sitio web)" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.SMTP_USER,
      subject: `Nuevo mensaje desde el sitio web`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
    <h2 style="color: #2ecc71; text-align: center;">📬 Nuevo mensaje desde el sitio web</h2>
    <p style="margin-bottom: 10px;"><strong>👤 Nombre:</strong> ${esc(name)}</p>
    <p style="margin-bottom: 10px;"><strong>📧 Email:</strong> <a href="mailto:${esc(email)}" style="color: #3498db;">${esc(email)}</a></p>
    <div style="margin-top: 20px;">
      <p style="margin-bottom: 5px;"><strong>📝 Mensaje:</strong></p>
      <div style="padding: 15px; background-color: #ffffff; border: 1px solid #ddd; border-radius: 6px;">
        ${esc(message).replace(/\n/g, "<br>")}
      </div>
    </div>
    <p style="margin-top: 30px; font-size: 12px; color: #999;">Este mensaje fue enviado desde el formulario de contacto de <strong>hyperionmkt.com</strong></p>
  </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
