import nodemailer from "nodemailer";

export async function POST(request) {
  const { name, email, message } = await request.json();

  const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: "info@hyperionmkt.com",
      pass: "Original12.",
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "info@hyperionmkt.com",
      subject: `Nuevo mensaje desde el sitio web`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
    <h2 style="color: #2ecc71; text-align: center;">📬 Nuevo mensaje desde el sitio web</h2>
    <p style="margin-bottom: 10px;"><strong>👤 Nombre:</strong> ${name}</p>
    <p style="margin-bottom: 10px;"><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #3498db;">${email}</a></p>
    <div style="margin-top: 20px;">
      <p style="margin-bottom: 5px;"><strong>📝 Mensaje:</strong></p>
      <div style="padding: 15px; background-color: #ffffff; border: 1px solid #ddd; border-radius: 6px;">
        ${message.replace(/\n/g, "<br>")}
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
