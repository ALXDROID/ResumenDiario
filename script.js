const form = document.getElementById('revenueForm');
const revenueList = document.getElementById('revenueList');
const totalRevenueDisplay = document.getElementById('totalRevenue');
const deleteButton = document.getElementById('deleteButton');
const deleteDateInput = document.getElementById('deleteDate');

const HOURLY_RATE = 3125; // Valor por hora
let revenues = []; // Array para guardar la recaudación

// Función para obtener la fecha actual en formato DD-MM-AAAA en zona horaria de Santiago de Chile
function getLocalDate() {
  const options = { timeZone: 'America/Santiago', year: 'numeric', month: '2-digit', day: '2-digit' };
  const formatter = new Intl.DateTimeFormat('es-CL', options);
  const parts = formatter.formatToParts(new Date());
  
  const day = parts.find(part => part.type === 'day').value;
  const month = parts.find(part => part.type === 'month').value;
  const year = parts.find(part => part.type === 'year').value;
  
  return `${day}-${month}-${year}`;
}

// Convertir entre formatos de fecha
function formatDateToDisplay(date) {
  const [year, month, day] = date.split('-');
  return `${day}-${month}-${year}`;
}

function formatDateToISO(date) {
  const [day, month, year] = date.split('-');
  return `${year}-${month}-${day}`;
}

// Cargar los datos desde localStorage al inicio
window.onload = () => {
  const savedRevenues = JSON.parse(localStorage.getItem('revenues')) || [];
  revenues = savedRevenues.map(revenue => ({
    ...revenue,
    date: formatDateToDisplay(revenue.date), // Convertir fecha al formato DD-MM-AAAA
  }));
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
  const gTotal = total + hourlyEarnings;

  // Obtener la fecha actual en la zona horaria de Santiago
  const localDate = getLocalDate(); // Formato DD-MM-AAAA

  // Agregar al array
  revenues.push({ date: localDate, hours, hourlyEarnings, deliveries, deliveryValues, total, gTotal });

  // Guardar en localStorage
  saveToLocalStorage();

  // Actualizar el DOM
  updateUI();

  // Limpiar formulario
  form.reset();
});

// Función para guardar los datos en localStorage
function saveToLocalStorage() {
  // Convertir las fechas al formato ISO (AAAA-MM-DD) antes de guardar
  const revenuesToSave = revenues.map(revenue => ({
    ...revenue,
    date: formatDateToISO(revenue.date),
  }));
  localStorage.setItem('revenues', JSON.stringify(revenuesToSave));
}

// Actualizar el DOM
function updateUI() {
  revenueList.innerHTML = '';
  let grandTotal = 0;

  revenues.forEach((revenue, index) => {
    grandTotal += revenue.total;

    const listItem = document.createElement('li');
    listItem.textContent = `Registro ${index + 1}: ${revenue.date}, ${revenue.hours} hrs, $${revenue.hourlyEarnings} por horas, ${revenue.deliveries} repartos, Total: $${revenue.total}, Total General: $${revenue.gTotal}`;
    revenueList.appendChild(listItem);
  });

  const grandTotalSum = revenues.reduce((sum, revenue) => sum + revenue.gTotal, 0);
  totalRevenueDisplay.textContent = `Total General: $${grandTotalSum}`;
}

// Eliminar registros por fecha
deleteButton.addEventListener('click', () => {
  const deleteDateRaw = deleteDateInput.value; // Fecha en formato AAAA-MM-DD
  if (!deleteDateRaw) {
    alert('Por favor, selecciona una fecha.');
    return;
  }

  const deleteDate = formatDateToDisplay(deleteDateRaw); // Convertir a DD-MM-AAAA

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
//localStorage.clear();
