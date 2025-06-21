import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface FormData {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  genero: string;
  terminos: boolean;
}

const initialState: FormData = {
  nombre: '',
  apellido: '',
  email: '',
  password: '',
  genero: '',
  terminos: false,
};

const FormularioRegistro: React.FC = () => {
  const [form, setForm] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showResumen, setShowResumen] = useState(false);
  const [showExito, setShowExito] = useState(false);

  // Validaciones
  const validar = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/.test(form.nombre))
      newErrors.nombre = 'El nombre debe tener al menos dos letras y solo puede contener letras y espacios.';

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/.test(form.apellido))
      newErrors.apellido = 'El apellido debe tener al menos dos letras y solo puede contener letras y espacios.';

    if (!form.email)
      newErrors.email = 'Por favor, ingrese su email.';
    else if (!/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(form.email))
      newErrors.email = 'Por favor, ingrese un email válido (ejemplo: usuario@dominio.com).';

    if (!form.password)
      newErrors.password = 'Por favor, ingrese su contraseña.';
    else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(form.password))
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres, incluir una letra y un número.';

    if (!form.genero)
      newErrors.genero = 'Por favor, seleccione su género.';

    if (!form.terminos)
      newErrors.terminos = 'Debe aceptar los términos y condiciones.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo de cambios
    const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type, checked } = e.target;
    setForm({
        ...form,
        [name]: type === 'checkbox' ? checked : value,
    });
    setErrors({
        ...errors,
        [name]: '',
    });
    };

  // Enviar formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validar()) {
      setShowResumen(true);
    }
  };

  // Confirmar y enviar
  const handleConfirmar = () => {
    setShowResumen(false);
    setShowExito(true);
    setForm(initialState);
  };

  // Cerrar modal de éxito
  const handleCerrarExito = () => setShowExito(false);

  return (
    <div className="container mt-5">
      <h1 style={{ color: '#222425', fontWeight: 'bold' }}>Formulario de registro de usuarios</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="form-horizontal mt-4" onSubmit={handleSubmit} noValidate>
            <div className="form-group mb-3">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                id="nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
              {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="apellido">Apellido:</label>
              <input
                type="text"
                className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
                id="apellido"
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                required
              />
              {errors.apellido && <div className="invalid-feedback">{errors.apellido}</div>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">
                Contraseña: (Debe contener al menos 8 caracteres, una letra y un número)
              </label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="genero">Género:</label>
              <select
                className={`form-control ${errors.genero ? 'is-invalid' : ''}`}
                id="genero"
                name="genero"
                value={form.genero}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="no-binario">No binario</option>
                <option value="otro">Otro</option>
              </select>
              {errors.genero && <div className="invalid-feedback">{errors.genero}</div>}
            </div>
            <div className="form-group mb-3 form-check">
              <input
                type="checkbox"
                className={`form-check-input ${errors.terminos ? 'is-invalid' : ''}`}
                id="terminos"
                name="terminos"
                checked={form.terminos}
                onChange={handleChange}
                required
              />
              <label className="form-check-label" htmlFor="terminos">
                Acepto los términos y condiciones.
              </label>
              {errors.terminos && <div className="invalid-feedback d-block">{errors.terminos}</div>}
            </div>
            <button
              type="submit"
              style={{ backgroundColor: '#bc80c4', borderColor: '#bc80c4', fontWeight: 'bold' }}
              className="btn btn-primary w-100"
            >
              Registrar
            </button>
          </form>
        </div>
      </div>

      {/* Modal de resumen */}
      {showResumen && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Resumen de datos</h5>
                <button type="button" className="close" onClick={() => setShowResumen(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p><strong>Nombre:</strong> {form.nombre}</p>
                <p><strong>Apellido:</strong> {form.apellido}</p>
                <p><strong>Email:</strong> {form.email}</p>
                <p><strong>Género:</strong> {form.genero}</p>
                <p><strong>Acepta términos:</strong> {form.terminos ? 'Sí' : 'No'}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowResumen(false)}>
                  Editar
                </button>
                <button type="button" className="btn btn-primary" onClick={handleConfirmar}>
                  Confirmar y Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      {showExito && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Éxito</h5>
                <button type="button" className="close" onClick={handleCerrarExito}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                ¡Registro exitoso! Su información se registró correctamente.
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCerrarExito}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormularioRegistro;