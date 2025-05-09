const form = document.getElementById('formulario');
const pages = document.querySelectorAll('.page');
const steps = document.querySelectorAll('.step');
let currentPage = 0;

// Función para actualizar qué página y paso están activos
const updateForm = () => {
  pages.forEach((page, index) => {
    page.classList.toggle('active', index === currentPage);
    steps[index].classList.toggle('active', index <= currentPage);
  });
};

// Función para mostrar mensaje de error debajo del campo
const mostrarError = (input, mensaje) => {
  // Verificamos si ya existe un error debajo del input
  let error = input.parentElement.querySelector('.error');
  if (!error) {
    error = document.createElement('div');
    error.className = 'error';
    input.parentElement.appendChild(error);
  }
  error.textContent = mensaje;
};

// Función para limpiar los errores antes de validar
const limpiarErrores = (page) => {
  page.querySelectorAll('.error').forEach(error => error.remove());
  page.querySelectorAll('.error-input').forEach(input => input.classList.remove('error-input'));
};

// Función para validar todos los campos de la página
const validarCampos = (inputs) => {
  let todoValido = true;

  inputs.forEach(input => {
    const valor = input.value.trim();
    const id = input.id;
    let mensaje = "";

    // Validaciones específicas
    switch (id) {
      case "nombre":
      case "apellido":
        if (!valor) mensaje = "Este campo es obligatorio.";
        else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) mensaje = "Solo letras permitidas.";
        break;

      case "cedula":
        if (!valor) {
          mensaje = "Este campo es obligatorio.";
        } else if (/[a-zA-Z]/.test(valor)) {  
          mensaje = "No se permiten letras en la cédula.";
        } else if (!/^\d{10,}$/.test(valor)) {  
          mensaje = "Debe contener al menos 10 dígitos numéricos.";
        }
        break;

      case "correo":
        if (!valor) {
          mensaje = "Este campo es obligatorio.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
          mensaje = "Formato de correo inválido.";
        } else if (/^[a-zA-Z]+$/.test(valor.split('@')[0])) {  
          mensaje = "No se permite solo letras en la parte local del correo.";
        } else if (/^\d+$/.test(valor.split('@')[0])) {  
          mensaje = "No se permite solo números en la parte local del correo.";
        }
        break;

      case "telefono":
        if (!valor) {
          mensaje = "Este campo es obligatorio.";
        } else if (/[a-zA-Z]/.test(valor)) {  
          mensaje = "No se permiten letras en este campo.";
        } else if (!/^\d{10,}$/.test(valor)) 
          mensaje = "Debe contener al menos 10 dígitos numéricos.";
        break;

      case "direccion":
        if (!valor) mensaje = "Este campo es obligatorio.";
        else if (valor.length < 5) mensaje = "Debe ingresar una dirección válida.";
        break;

      case "nacimiento":
        if (!valor) mensaje = "Este campo es obligatorio.";
        else {
          const fecha = new Date(valor);
          const hoy = new Date();
          if (fecha > hoy) mensaje = "La fecha no puede ser futura.";
        }
        break;

      case "genero":
      case "etnia":
      case "pais":
        if (!valor) mensaje = "Seleccione una opción.";
        break;

      case "ocupacion":
      case "nacionalidad":
        if (!valor) mensaje = "Este campo es obligatorio.";
        else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) mensaje = "Solo letras permitidas.";
        break;
    }

    if (mensaje) {
      mostrarError(input, mensaje);
      input.classList.add('error-input');
      todoValido = false;
    }
  });

  return todoValido;
};

// Botones "Siguiente"
document.querySelectorAll('.next').forEach(button => {
  button.addEventListener('click', () => {
    const inputs = pages[currentPage].querySelectorAll('input, select');
    limpiarErrores(pages[currentPage]);
    if (validarCampos(inputs)) {
      currentPage++;
      updateForm();
    }
  });
});

// Botones "Anterior"
document.querySelectorAll('.prev').forEach(button => {
  button.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      updateForm();
    }
  });
});

// Envío del formulario
form.addEventListener('submit', e => {
  e.preventDefault();
  limpiarErrores(pages[currentPage]);
  const inputs = pages[currentPage].querySelectorAll('input, select');
  if (validarCampos(inputs)) {
    document.getElementById('mensaje').textContent = "¡Registro exitoso!";
    form.reset();
    currentPage = 0;
    updateForm();
  }
});

updateForm();

