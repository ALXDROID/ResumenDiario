const form = document.getElementById('revenueForm');
const revenueList = document.getElementById('revenueList');
const totalRevenueDisplay = document.getElementById('totalRevenue');
const deleteButton = document.getElementById('deleteButton');
const deleteDateInput = document.getElementById('deleteDate');

const HOURLY_RATE = 3125; // Valor por hora
let revenues = []; // Array para guardar la recaudación

// Cargar los datos desde localStorage al inicio
window.onload = () => {
  const savedRevenues = JSON.parse(localStorage.getItem('revenues')) || [];
  revenues = savedRevenues;
  updateUI(); // Mostrar los datos guardados
};

// Escuchar el formulario para agregar registros
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Obtener datos del formulario
  const hours = parseFloat(document.getElementById('hours').value);
  const deliveries = parseInt(document.getElementById('deliveries').value);
  const deliveryValues = document.getElementById('deliveryValues').value
    .split(',')
    .map(value => parseFloat(value.trim()));

  // Calcular total y valor por hora
  const total = deliveryValues.reduce((sum, value) => sum + value, 0);
  const hourlyEarnings = hours * HOURLY_RATE;
  const date = new Date().toISOString().split('T')[0]; // Fecha en formato AAAA-MM-DD

  // Agregar al array
  revenues.push({ date, hours, hourlyEarnings, deliveries, deliveryValues, total });

  // Guardar en localStorage
  saveToLocalStorage();

  // Actualizar el DOM
  updateUI();

  // Limpiar formulario
  form.reset();
});

// Función para guardar los datos en localStorage
function saveToLocalStorage() {
  localStorage.setItem('revenues', JSON.stringify(revenues));
}

// Actualizar el DOM
function updateUI() {
  revenueList.innerHTML = '';
  let grandTotal = 0;

  revenues.forEach((revenue, index) => {
    grandTotal += revenue.total;

    const listItem = document.createElement('li');
    listItem.textContent = `Registro ${index + 1}: ${revenue.date}, ${revenue.hours} hrs, $${revenue.hourlyEarnings} por horas, ${revenue.deliveries} repartos, Total: $${revenue.total}`;
    revenueList.appendChild(listItem);
  });

  totalRevenueDisplay.textContent = `Total: $${grandTotal}`;
}

// Eliminar registros por fecha
deleteButton.addEventListener('click', () => {
  const deleteDate = deleteDateInput.value;
  if (!deleteDate) {
    alert('Por favor, selecciona una fecha.');
    return;
  }

  // Filtrar registros que no coincidan con la fecha
  const initialCount = revenues.length;
  revenues = revenues.filter(revenue => revenue.date !== deleteDate);

  if (revenues.length < initialCount) {
    alert(`Se eliminaron registros de la fecha ${deleteDate}.`);
  } else {
    alert(`No se encontraron registros para la fecha ${deleteDate}.`);
  }

  // Guardar en localStorage y actualizar el DOM
  saveToLocalStorage();
  updateUI();
});
