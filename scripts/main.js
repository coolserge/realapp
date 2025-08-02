const form = document.getElementById("plannerForm");
const output = document.getElementById("output");

const apiKey = "5ae2e3f221c38a28845f05b67626f82ffac042d58176711550cee38f"; // Replace this with your OpenTripMap API key
const radius = 10000;

async function fetchCityCoords(city) {
    const res = await fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${encodeURIComponent(city)}&apikey=${apiKey}`);
    if (!res.ok) throw new Error("City not found");
    return res.json();
}

async function fetchPlaces(lat, lon, interest) {
    const kinds = {
        culture: "cultural",
        nature: "natural",
        food: "foods",
        adventure: "sport"
    };
    const kind = kinds[interest] || "interesting_places";

    const res = await fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${lon}&lat=${lat}&kinds=${kind}&limit=5&apikey=${apiKey}`);
    const data = await res.json();
    return data.features.map(p => p.properties.name).filter(Boolean);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    output.innerHTML = "⏳ Loading itinerary...";
    const destination = document.getElementById("destination").value;
    const duration = parseInt(document.getElementById("duration").value);
    const interests = Array.from(document.getElementById("interests").selectedOptions).map(opt => opt.value);

    try {
        const { lat, lon } = await fetchCityCoords(destination);
        let result = `✈️ Destination: ${destination}\n🕒 Duration: ${duration} day(s)\n🎯 Interests: ${interests.join(", ")}\n\n`;

        for (let day = 1; day <= duration; day++) {
            result += `📅 Day ${day}:\n`;
            for (const interest of interests) {
                const places = await fetchPlaces(lat, lon, interest);
                const place = places[day % places.length] || "No data";
                result += ` - ${interest.charAt(0).toUpperCase() + interest.slice(1)}: ${place}\n`;
            }
            result += "\n";
        }
        output.innerHTML = result;
    } catch (err) {
        output.innerHTML = "❌ Failed to load data: " + err.message;
    }
});