// src/components/ContactForm.jsx
'use client'

import { useRef } from 'react'
import emailjs from '@emailjs/browser'

export default function ContactForm() {
  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        form.current,
        'YOUR_PUBLIC_KEY'
      )
      .then(() => {
        alert('Mensaje enviado con éxito')
      })
      .catch((err) => {
        console.error(err)
        alert('Hubo un error al enviar el mensaje')
      })
  }

  return (
    <form ref={form} onSubmit={sendEmail} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="first-name" className="text-sm font-medium text-zinc-400">
            Nombre
          </label>
          <input
            type="text"
            name="user_name"
            placeholder="Tu nombre"
            required
            className="w-full px-4 py-2 bg-white text-black rounded"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="last-name" className="text-sm font-medium text-zinc-400">
            Apellido
          </label>
          <input
            type="text"
            name="user_lastname"
            placeholder="Tu apellido"
            required
            className="w-full px-4 py-2 bg-white text-black rounded"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-zinc-400">
          Email
        </label>
        <input
          type="email"
          name="user_email"
          placeholder="tu@email.com"
          required
          className="w-full px-4 py-2 bg-white text-black rounded"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-zinc-400">
          Mensaje
        </label>
        <textarea
          name="message"
          placeholder="¿Cómo podemos ayudarte?"
          required
          className="w-full px-4 py-2 bg-white text-black rounded min-h-[120px]"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
      >
        Enviar Mensaje
      </button>
    </form>
  )
}

// src/app/page.jsx
import ContactForm from '@/components/ContactForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Aquí va el layout de tu página */}
      <section id="contacto" className="w-full py-24 md:py-32 bg-gradient-to-b from-black to-zinc-950">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm text-green-400 mb-2">
                <span>Contacto</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">¿Listo para impulsar tu negocio?</h2>
              <p className="text-zinc-400 text-lg max-w-lg">
                Contáctanos hoy mismo para discutir cómo podemos ayudarte a alcanzar tus objetivos digitales. Nuestro equipo de expertos está listo para crear soluciones personalizadas que impulsen tu crecimiento.
              </p>
            </div>
            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-green-900 transition-all hover:shadow-lg hover:shadow-green-900/10">
              <h3 className="text-2xl font-bold mb-6">Envíanos un mensaje</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
