const container = document.getElementById("resultContainer");

// Fetch and display all countries on page load
window.onload = async () => {
  const countries = await fetchCountries("all");
  displayCountries(countries);
};

// Fetch countries (all or by name)
async function fetchCountries(query) {
  const url =
    query === "all"
      ? "https://restcountries.com/v3.1/all"
      : `https://restcountries.com/v3.1/name/${query}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Country not found");
    return await res.json();
  } catch (error) {
    container.innerHTML = `<p style="color:red">Error: ${error.message}</p>`;
    return [];
  }
}

// Display a list of country cards
function displayCountries(countries) {
  container.innerHTML = "";

  countries.forEach((country) => {
    const {
      name,
      capital,
      flags,
      population,
      region,
      currencies,
      area,
      languages,
    } = country;

    const currencyNames = currencies
      ? Object.values(currencies).map((c) => c.name).join(", ")
      : "N/A";

    const languageNames = languages
      ? Object.values(languages).join(", ")
      : "N/A";

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${flags.png}" alt="Flag of ${name.common}">
      <h2>${name.common}</h2>
      <p><strong>Capital:</strong> ${capital ? capital[0] : "N/A"}</p>
      <p><strong>Population:</strong> ${population.toLocaleString()}</p>
      <p><strong>Region:</strong> ${region}</p>
      <p><strong>Area:</strong> ${area.toLocaleString()} km²</p>
      <p><strong>Currency:</strong> ${currencyNames}</p>
      <p><strong>Languages:</strong> ${languageNames}</p>
    `;
    container.appendChild(card);
  });
}
// Load all countries (used by Home button too)
async function loadAllCountries() {
    const allCountries = await fetchCountries("all");
    displayCountries(allCountries);
  }
  
  // Show About Modal
  function showAbout() {
    document.getElementById("aboutModal").style.display = "block";
  }
  
  // Close About Modal
  function closeAbout() {
    document.getElementById("aboutModal").style.display = "none";
  }
  
  // Close modal on outside click
  window.onclick = function (event) {
    const modal = document.getElementById("aboutModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  
  // Load all countries on page load
  window.onload = loadAllCountries;
  
// Search handler
async function searchCountry() {
  const input = document.getElementById("countryInput").value.trim();
  if (!input) {
    const allCountries = await fetchCountries("all");
    displayCountries(allCountries);
  } else {
    const countries = await fetchCountries(input);
    displayCountries(countries);
  }
}
