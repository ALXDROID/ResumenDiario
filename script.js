const form = document.getElementById('revenueForm');
const revenueList = document.getElementById('revenueList');
const totalRevenueDisplay = document.getElementById('totalRevenue');

let revenues = []; // Array para guardar la recaudación

form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Obtener datos del formulario
  const hours = parseFloat(document.getElementById('hours').value);
  const deliveries = parseInt(document.getElementById('deliveries').value);
  const deliveryValues = document.getElementById('deliveryValues').value
    .split(',')
    .map(value => parseFloat(value.trim()));

  // Calcular total
  const total = deliveryValues.reduce((sum, value) => sum + value, 0);

  // Agregar al array
  revenues.push({ hours, deliveries, deliveryValues, total });

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
    listItem.textContent = `Registro ${index + 1}: ${revenue.hours} hrs, ${revenue.deliveries} repartos, Total: $${revenue.total}`;
    revenueList.appendChild(listItem);
  });

  totalRevenueDisplay.textContent = `Total: $${grandTotal}`;
}
