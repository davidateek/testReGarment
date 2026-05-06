# Clothes Recycle & Donation Directory

A web directory showcasing clothes recycling centers and donation drop-off locations across the United States. Users can search by city, state, or ZIP code and view locations on an interactive map.

## Features

✨ **Interactive Map** - View all recycling centers and donation drop-offs on an interactive map powered by Leaflet.js

🔍 **Search & Filter** - Search by city, state, or ZIP code and filter by location type

📋 **Location List** - Browse all locations with complete details

📍 **Location Details** - Click any location to see full information including address, phone, hours, and website

📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

## File Structure

- `index.html` - Main homepage with search, list, and map interface
- `styles.css` - Complete styling with responsive design
- `script.js` - All functionality: data loading, map interactions, search/filtering
- `locations.json` - Location data file with all recycling centers and donation drop-offs
- `README.md` - This documentation file

## How to Use

### For Users

1. **Browse Locations** - See all recycling centers and donation drop-offs on page load
2. **Search** - Enter a city name, state abbreviation, or ZIP code in the search bar
3. **Filter** - Toggle between recycle centers and donation drop-offs
4. **View Details** - Click any location in the list or on the map to see complete information
5. **Clear Search** - Click "Clear Filters" to reset and see all locations

### For Developers

#### Adding New Locations

Edit `locations.json` and add a new object to the `locations` array:

```json
{
  "id": 13,
  "name": "Location Name",
  "type": "recycle",
  "address": "123 Main St",
  "city": "City Name",
  "state": "ST",
  "zip": "12345",
  "phone": "(123) 555-0000",
  "website": "www.example.com",
  "hours": "Mon-Fri 9AM-5PM",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

**Fields:**
- `id` - Unique identifier (integer)
- `name` - Location name/business name (string)
- `type` - Either "recycle" or "donate" (string)
- `address` - Street address (string)
- `city` - City name (string)
- `state` - Two-letter state abbreviation (string)
- `zip` - ZIP code (string)
- `phone` - Phone number (string)
- `website` - Website URL without https:// (string)
- `hours` - Operating hours (string)
- `latitude` - Latitude coordinate (number)
- `longitude` - Longitude coordinate (number)

#### Customizing the Map

The map is centered on the USA. To change the center and zoom level, edit `script.js`:

```javascript
map = L.map('map').setView([latitude, longitude], zoom_level);
```

#### Data Source

Currently using sample data. To integrate real data:
1. Prepare data in the same JSON format
2. Replace `locations.json` with real data
3. Ensure all required fields are present
4. Latitude and longitude can be obtained from geocoding services

## Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Map Library:** Leaflet.js 1.9.4
- **Map Tiles:** OpenStreetMap (free, no API key required)
- **Hosting:** GitHub Pages
- **Data Format:** JSON

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- User ratings and reviews
- Location submission form
- Admin dashboard for data management
- Real-time data integration from clothing recycling organizations
- Mobile app version
- Advanced filtering (hours, specific types of clothing accepted)
- Directions integration with Google Maps/Apple Maps
- Location categorization (drop-off only, accept mail-in, etc.)

## License

This project is open source and available under the MIT License.

## Contact & Contributing

For suggestions or to contribute locations, please create an issue or submit a pull request.

---

**Last Updated:** May 2026
**Status:** Active - Sample data loaded
