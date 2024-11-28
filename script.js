const savedRevenues = JSON.parse(localStorage.getItem('revenues')) || [];
revenues = savedRevenues;
updateUI(); // Mostrar los datos guardados


const form = document.getElementById('revenueForm');
const revenueList = document.getElementById('revenueList');
const totalRevenueDisplay = document.getElementById('totalRevenue');

const HOURLY_RATE = 3125; // Valor por hora
let revenues = []; // Array para guardar la recaudación

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
  const date = new Date().toLocaleString(); // Fecha y hora del registro

  // Agregar al array
  revenues.push({ date, hours, hourlyEarnings, deliveries, deliveryValues, total });

  // Actualizar el DOM
  updateUI();

  // Limpiar formulario
  form.reset();
});

function updateUI() {
  revenueList.innerHTML = '';
  let grandTotal = 0;

  revenues.forEach((revenue, index) => {
    grandTotal += revenue.total;

    const listItem = document.createElement('li');
    listItem.textContent = `Registro ${index + 1}: ${revenue.date}, ${revenue.hours} hrs, $${revenue.hourlyEarnings} por horas, ${revenue.deliveries} repartos, Total: $${revenue.total}`;
    revenueList.appendChild(listItem);
  });
  localStorage.setItem('revenues', JSON.stringify(revenues));


  totalRevenueDisplay.textContent = `Total: $${grandTotal}`;
}
