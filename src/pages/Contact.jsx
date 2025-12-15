import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);
  const [errors, setErrors] = useState({});

  const navigateTo = (path) => {
    window.location.href = path;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.asunto.trim()) {
      newErrors.asunto = 'El asunto es requerido';
    }
    
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
    } else if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }
    
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    console.log('Formulario enviado:', formData);
    setEnviado(true);
    
    setTimeout(() => {
      setFormData({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
      });
      setEnviado(false);
    }, 3000);
  };

  return (
    <div className="contact-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .contact-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: Arial, sans-serif;
          background: #f5f7fa;
        }

        /* Navegación superior */
        .top-nav {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 15px 0;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          color: white;
          font-size: 1.5em;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .nav-logo:hover {
          transform: scale(1.05);
        }

        .nav-menu {
          display: flex;
          gap: 30px;
          list-style: none;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1em;
          padding: 8px 20px;
          border-radius: 5px;
          transition: background 0.3s ease;
          cursor: pointer;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .banner {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 60px 20px;
          text-align: center;
        }

        .banner h1 {
          font-size: 2.5em;
          margin: 0;
        }

        .contact-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          flex: 1;
          width: 100%;
        }

        .contact-intro {
          text-align: center;
          margin-bottom: 50px;
          animation: fadeIn 0.8s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .contact-intro h2 {
          color: #2c3e50;
          font-size: 2.2em;
          margin-bottom: 15px;
        }

        .contact-intro p {
          color: #666;
          font-size: 1.1em;
          line-height: 1.6;
        }

        .contact-wrapper {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }

        .contact-form-section {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }

        .contact-form .form-group {
          margin-bottom: 25px;
        }

        .contact-form label {
          display: block;
          margin-bottom: 8px;
          color: #2c3e50;
          font-weight: 600;
          font-size: 1em;
        }

        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1em;
          font-family: inherit;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
        }

        .contact-form input.error,
        .contact-form textarea.error {
          border-color: #e74c3c;
        }

        .error-message {
          color: #e74c3c;
          font-size: 0.9em;
          margin-top: 5px;
        }

        .contact-form textarea {
          resize: vertical;
          min-height: 120px;
        }

        .btn-submit {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 1.1em;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .btn-submit:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .btn-submit:active {
          transform: translateY(-1px);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .mensaje-exito {
          text-align: center;
          padding: 60px 20px;
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
          color: white;
          border-radius: 15px;
          animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .mensaje-exito h3 {
          font-size: 2em;
          margin-bottom: 15px;
        }

        .mensaje-exito p {
          font-size: 1.2em;
        }

        .contact-info {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          padding: 40px 30px;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        }

        .contact-info h3 {
          font-size: 1.8em;
          margin-bottom: 30px;
          text-align: center;
        }

        .info-item {
          background: rgba(255, 255, 255, 0.15);
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
          backdrop-filter: blur(10px);
          transition: transform 0.3s ease;
        }

        .info-item:hover {
          transform: translateX(5px);
          background: rgba(255, 255, 255, 0.25);
        }

        .info-item h4 {
          font-size: 1.3em;
          margin-bottom: 10px;
        }

        .info-item p {
          font-size: 1em;
          line-height: 1.6;
          opacity: 0.95;
        }

        .back-button-container {
          text-align: center;
          margin-top: 40px;
        }

        .btn-back {
          display: inline-block;
          padding: 12px 30px;
          background: #2c3e50;
          color: white;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1em;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-back:hover {
          background: #3498db;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
        }

        footer {
          background: #2c3e50;
          color: white;
          padding: 20px;
          text-align: center;
          margin-top: auto;
        }

        @media (max-width: 968px) {
          .contact-wrapper {
            grid-template-columns: 1fr;
          }

          .contact-form-section,
          .contact-info {
            padding: 30px 20px;
          }
        }

        @media (max-width: 768px) {
          .nav-container {
            flex-direction: column;
            gap: 15px;
          }

          .nav-menu {
            gap: 15px;
          }

          .banner h1 {
            font-size: 1.8em;
          }

          .contact-intro h2 {
            font-size: 1.8em;
          }
        }

        @media (max-width: 480px) {
          .contact-intro h2 {
            font-size: 1.5em;
          }

          .contact-form-section {
            padding: 25px 15px;
          }

          .contact-info {
            padding: 25px 15px;
          }

          .btn-submit {
            font-size: 1em;
            padding: 12px;
          }
        }
      `}</style>

      {/* Barra de navegación */}
      <nav className="top-nav">
        <div className="nav-container">
          <div className="nav-logo" onClick={() => navigateTo('/')}>
            🎮 Casual Games
          </div>
          <ul className="nav-menu">
            <li>
              <span className="nav-link" onClick={() => navigateTo('/')}>
                Inicio
              </span>
            </li>
            <li>
              <span className="nav-link" onClick={() => navigateTo('/about')}>
                Sobre Nosotros
              </span>
            </li>
            <li>
              <span className="nav-link" onClick={() => navigateTo('/contact')}>
                Contacto
              </span>
            </li>
          </ul>
        </div>
      </nav>

      <header>
        <div className="banner">
          <h1>Contáctanos</h1>
        </div>
      </header>
      
      <main className="contact-content">
        <section className="contact-intro">
          <h2>¡Nos encantaría saber de ti!</h2>
          <p>
            ¿Tienes alguna pregunta, sugerencia o comentario? Completa el formulario 
            a continuación y nos pondremos en contacto contigo lo antes posible.
          </p>
        </section>

        <div className="contact-wrapper">
          <section className="contact-form-section">
            {enviado ? (
              <div className="mensaje-exito">
                <h3>✅ ¡Mensaje Enviado!</h3>
                <p>Gracias por contactarnos. Te responderemos pronto.</p>
              </div>
            ) : (
              <div className="contact-form">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre *</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    className={errors.nombre ? 'error' : ''}
                  />
                  {errors.nombre && <div className="error-message">{errors.nombre}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="asunto">Asunto *</label>
                  <input
                    type="text"
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    placeholder="¿Sobre qué quieres escribir?"
                    className={errors.asunto ? 'error' : ''}
                  />
                  {errors.asunto && <div className="error-message">{errors.asunto}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="mensaje">Mensaje *</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Escribe tu mensaje aquí..."
                    className={errors.mensaje ? 'error' : ''}
                  ></textarea>
                  {errors.mensaje && <div className="error-message">{errors.mensaje}</div>}
                </div>

                <button onClick={handleSubmit} className="btn-submit">
                  Enviar Mensaje
                </button>
              </div>
            )}
          </section>

          <section className="contact-info">
            <h3>Otras formas de contacto</h3>
            
            <div className="info-item">
              <h4>📧 Email</h4>
              <p>contacto@casualgames.com</p>
            </div>

            <div className="info-item">
              <h4>🕐 Horario de atención</h4>
              <p>Lunes a Viernes: 9:00 - 18:00 (GMT-3)</p>
            </div>

            <div className="info-item">
              <h4>🌐 Redes Sociales</h4>
              <p>Síguenos en nuestras redes para estar al día con nuevos juegos</p>
            </div>

            <div className="info-item">
              <h4>💡 Sugerencias</h4>
              <p>¿Tienes ideas para nuevos juegos? ¡Queremos escucharlas!</p>
            </div>
          </section>
        </div>

        <div className="back-button-container">
          <button className="btn-back" onClick={() => navigateTo('/')}>
            ← Volver al Inicio
          </button>
        </div>
      </main>
      
      <footer>Derechos Reservados&copy; 2024 Casual Games</footer>
    </div>
  );
};

export default Contact;