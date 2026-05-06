/**
 * Clothes Recycle & Donation Directory
 * Main application script
 * 
 * Features:
 * - Load and display recycling centers and donation drop-offs
 * - Interactive map with location markers
 * - Search and filter functionality
 * - Location detail modals
 * - Responsive design
 */

// Global variables
let allLocations = [];
let filteredLocations = [];
let map;
let markers = [];

/**
 * Initialize the application on page load
 * - Load location data from JSON
 * - Set up the map
 * - Render initial list and markers
 * - Attach event listeners
 */
document.addEventListener('DOMContentLoaded', async () => {
    await loadLocations();
    initializeMap();
    renderLocations(allLocations);
    setupEventListeners();
});

/**
 * Load location data from locations.json file
 * Handles async fetch and error management
 */
async function loadLocations() {
    try {
        const response = await fetch('locations.json');
        const data = await response.json();
        allLocations = data.locations;
        filteredLocations = [...allLocations];
    } catch (error) {
        console.error('Error loading locations:', error);
    }
}

/**
 * Initialize Leaflet map with OpenStreetMap tiles
 * Sets view to center of USA and adds tile layer
 */
function initializeMap() {
    map = L.map('map').setView([39.5, -98.5], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    addMarkersToMap(allLocations);
}

/**
 * Add or update location markers on the map
 * Green markers for recycle centers, blue for donation drop-offs
 * 
 * @param {Array} locations - Array of location objects to display
 */
function addMarkersToMap(locations) {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    locations.forEach(location => {
        const color = location.type === 'recycle' ? '#28a745' : '#007bff';
        const markerHtml = `
            <div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                ${location.type === 'recycle' ? '♻' : '📦'}
            </div>
        `;

        const marker = L.marker([location.latitude, location.longitude], {
            icon: L.divIcon({
                html: markerHtml,
                iconSize: [30, 30],
                className: 'custom-marker'
            })
        }).addTo(map);

        marker.bindPopup(`
            <strong>${location.name}</strong><br/>
            <span class="type-badge ${location.type}">${location.type === 'recycle' ? 'Recycle Center' : 'Donation Drop-off'}</span><br/>
            ${location.address}<br/>
            ${location.city}, ${location.state} ${location.zip}
        `);

        marker.on('click', () => showLocationDetails(location));
        markers.push(marker);
    });
}

/**
 * Render locations list view
 * Creates and displays location cards in the sidebar
 * 
 * @param {Array} locations - Array of location objects to display
 */
function renderLocations(locations) {
    const container = document.getElementById('locationsList');
    container.innerHTML = '';

    if (locations.length === 0) {
        container.innerHTML = '<p>No locations found. Try adjusting your search or filters.</p>';
        return;
    }

    locations.forEach(location => {
        const card = createLocationCard(location);
        container.appendChild(card);
    });

    addMarkersToMap(locations);
}

/**
 * Create a location card DOM element
 * Displays location summary with name, type, address, and phone
 * 
 * @param {Object} location - Location object with all properties
 * @returns {HTMLElement} - Location card element
 */
function createLocationCard(location) {
    const card = document.createElement('div');
    card.className = 'location-card';
    card.innerHTML = `
        <h3>
            ${location.type === 'recycle' ? '♻️' : '📦'} ${location.name}
        </h3>
        <span class="type-badge ${location.type}">
            ${location.type === 'recycle' ? 'Recycle Center' : 'Donation Drop-off'}
        </span>
        <p class="address">${location.address}</p>
        <p>${location.city}, ${location.state} ${location.zip}</p>
        <p style="font-size: 0.9rem; color: #0066cc;">${location.phone}</p>
    `;
    card.addEventListener('click', () => showLocationDetails(location));
    return card;
}

/**
 * Display detailed location information in a modal
 * Shows complete address, phone, hours, website, and coordinates
 * 
 * @param {Object} location - Location object with all properties
 */
function showLocationDetails(location) {
    const modal = document.getElementById('detailsModal');
    const modalBody = document.getElementById('modalBody');

    const hoursText = location.hours || 'Not available';
    const websiteText = location.website 
        ? `<a href="https://${location.website}" target="_blank">${location.website}</a>`
        : 'Not available';

    modalBody.innerHTML = `
        <h2>${location.name}</h2>
        <span class="type-badge ${location.type}">
            ${location.type === 'recycle' ? 'Recycle Center' : 'Donation Drop-off'}
        </span>
        <div class="detail-row" style="margin-top: 1rem;">
            <span class="detail-label">Address:</span>
            <span>${location.address}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">City:</span>
            <span>${location.city}, ${location.state} ${location.zip}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Phone:</span>
            <span><a href="tel:${location.phone.replace(/\D/g, '')}">${location.phone}</a></span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Hours:</span>
            <span>${hoursText}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Website:</span>
            <span>${websiteText}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Coordinates:</span>
            <span>${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}</span>
        </div>
    `;

    modal.style.display = 'block';
}

/**
 * Setup event listeners for UI interactions
 * - Search input for filtering
 * - Type filter checkboxes
 * - Clear filters button
 * - Modal close functionality
 */
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const filterRecycle = document.getElementById('filterRecycle');
    const filterDonate = document.getElementById('filterDonate');
    const clearButton = document.getElementById('clearFilters');
    const closeModal = document.querySelector('.close');

    searchInput.addEventListener('input', applyFilters);
    filterRecycle.addEventListener('change', applyFilters);
    filterDonate.addEventListener('change', applyFilters);
    clearButton.addEventListener('click', clearAllFilters);
    closeModal.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        const modal = document.getElementById('detailsModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

/**
 * Apply search and filter logic
 * Filters locations by search term and selected types
 * Updates both list and map display
 */
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filterRecycle = document.getElementById('filterRecycle').checked;
    const filterDonate = document.getElementById('filterDonate').checked;

    filteredLocations = allLocations.filter(location => {
        const matchesSearch = !searchTerm || 
            location.city.toLowerCase().includes(searchTerm) ||
            location.state.toLowerCase().includes(searchTerm) ||
            location.zip.includes(searchTerm) ||
            location.name.toLowerCase().includes(searchTerm);

        const matchesType = 
            (filterRecycle && location.type === 'recycle') ||
            (filterDonate && location.type === 'donate');

        return matchesSearch && matchesType;
    });

    renderLocations(filteredLocations);
}

/**
 * Clear all search and filter inputs
 * Resets to showing all locations
 */
function clearAllFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('filterRecycle').checked = true;
    document.getElementById('filterDonate').checked = true;
    applyFilters();
}
