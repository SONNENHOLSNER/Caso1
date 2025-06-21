// Variables globales
let events = [];
let locations = [];
let contacts = [];
let map;
let marker;

// Clases para modelos
class Event {
    constructor(id, title, datetime, timezone, location, description, guests, recurrence, reminder, classification) {
        this.id = id;
        this.title = title;
        this.datetime = datetime;
        this.timezone = timezone;
        this.location = location;
        this.description = description;
        this.guests = guests;
        this.recurrence = recurrence;
        this.reminder = reminder;
        this.classification = classification;
    }
}

class Location {
    constructor(id, title, address, lat, lng) {
        this.id = id;
        this.title = title;
        this.address = address;
        this.lat = lat;
        this.lng = lng;
    }
}

class Contact {
    constructor(id, salutation, fullName, idNumber, email, phone, photo) {
        this.id = id;
        this.salutation = salutation;
        this.fullName = fullName;
        this.idNumber = idNumber;
        this.email = email;
        this.phone = phone;
        this.photo = photo;
    }
}

// Funciones de inicialización
function init() {
    loadData();
    setupEventListeners();
    initMap();
    showTab('events');
}

function loadData() {
    // Cargar datos desde localStorage o inicializar arrays vacíos
    events = JSON.parse(localStorage.getItem('events')) || [];
    locations = JSON.parse(localStorage.getItem('locations')) || [];
    contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    
    // Renderizar datos iniciales
    renderEvents();
    renderLocations();
    renderContacts();
    
    // Llenar selects dependientes
    updateLocationSelects();
    updateContactSelects();
}

function setupEventListeners() {
    // Formulario de eventos
    document.getElementById('eventForm').addEventListener('submit', handleEventSubmit);
    
    // Formulario de ubicaciones
    document.getElementById('locationForm').addEventListener('submit', handleLocationSubmit);
    
    // Formulario de contactos
    document.getElementById('contactForm').addEventListener('submit', handleContactSubmit);
    
    // Búsquedas
    document.getElementById('event-search').addEventListener('input', filterEvents);
    document.getElementById('location-search').addEventListener('input', filterLocations);
    document.getElementById('contact-search').addEventListener('input', filterContacts);
    
    // Filtros
    document.getElementById('event-filter-type').addEventListener('change', filterEvents);
    document.getElementById('event-filter-location').addEventListener('change', filterEvents);
    document.getElementById('event-filter-date').addEventListener('change', filterEvents);
}

function initMap() {
    // Inicializar mapa Leaflet
    map = L.map('map').setView([4.6097, -74.0817], 13); // Bogotá por defecto
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Manejar clics en el mapa
    map.on('click', function(e) {
        updateMarker(e.latlng);
    });
}

// Funciones de UI
function showTab(tabName) {
    // Ocultar todos los contenidos de pestañas
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // Mostrar la pestaña seleccionada
    document.getElementById(`${tabName}-section`).classList.remove('hidden');
    
    // Actualizar botones de pestañas
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active-tab');
        button.classList.add('text-gray-600');
    });
    
    document.getElementById(`${tabName}-tab`).classList.add('active-tab');
    document.getElementById(`${tabName}-tab`).classList.remove('text-gray-600');
}

function toggleEventForm(event = null) {
    const form = document.getElementById('event-form');
    const formTitle = document.getElementById('event-form-title');
    const formElement = document.getElementById('eventForm');
    
    if (event) {
        // Editar evento existente
        formTitle.textContent = 'Editar Evento';
        populateEventForm(event);
        formElement.dataset.mode = 'edit';
    } else {
        // Nuevo evento
        formTitle.textContent = 'Registrar Nuevo Evento';
        formElement.reset();
        formElement.dataset.mode = 'create';
    }
    
    form.classList.toggle('hidden');
}


document.addEventListener('DOMContentLoaded', init);

// Función para exportar eventos a CSV
function exportEventsToCSV() {
    if (events.length === 0) {
        showToast('No hay eventos para exportar', 'warning');
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Título,Fecha,Ubicación,Descripción,Tipo\n";
    
    events.forEach(event => {
        const row = [
            `"${event.title}"`,
            `"${new Date(event.datetime).toLocaleString()}"`,
            `"${getLocationName(event.location)}"`,
            `"${event.description || ''}"`,
            `"${getEventType(event.classification)}"`
        ].join(",");
        csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "eventos_educativos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('Eventos exportados a CSV', 'success');
}

// Función para mostrar todas las ubicaciones en el mapa
function showAllLocationsOnMap() {
    if (locations.length === 0) {
        showToast('No hay ubicaciones registradas', 'warning');
        return;
    }

    const bounds = new L.LatLngBounds();
    locations.forEach(location => {
        const marker = L.marker([location.lat, location.lng])
            .addTo(map)
            .bindPopup(`<b>${location.title}</b><br>${location.address}`);
        bounds.extend(marker.getLatLng());
    });

    map.fitBounds(bounds);
    showToast(`${locations.length} ubicaciones mostradas en el mapa`, 'success');
}

// Función para generar reporte de contactos
function generateContactReport() {
    if (contacts.length === 0) {
        showToast('No hay contactos para generar reporte', 'warning');
        return;
    }

    // Crear contenido HTML para el reporte
    let reportContent = `
        <html>
        <head>
            <title>Reporte de Contactos</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { color: #2c3e50; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <h1>Reporte de Contactos</h1>
            <p>Generado el: ${new Date().toLocaleDateString()}</p>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Identificación</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                    </tr>
                </thead>
                <tbody>
    `;

    contacts.forEach(contact => {
        reportContent += `
            <tr>
                <td>${contact.salutation} ${contact.fullName}</td>
                <td>${contact.idNumber}</td>
                <td>${contact.email}</td>
                <td>${contact.phone}</td>
            </tr>
        `;
    });

    reportContent += `
                </tbody>
            </table>
            <p>Total contactos: ${contacts.length}</p>
        </body>
        </html>
    `;

    // Abrir el reporte en una nueva ventana
    const reportWindow = window.open('', '_blank');
    reportWindow.document.write(reportContent);
    reportWindow.document.close();
    
    showToast('Reporte de contactos generado', 'success');
}

// Funciones auxiliares
function getLocationName(locationId) {
    const location = locations.find(loc => loc.id === locationId);
    return location ? location.title : 'Desconocida';
}

function getEventType(type) {
    const types = {
        'conference': 'Conferencia',
        'workshop': 'Taller',
        'seminar': 'Seminario',
        'other': 'Otro'
    };
    return types[type] || type;
}

