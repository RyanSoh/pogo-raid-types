// Updated Pokémon type data
const typeData = {
  Normal: {
    strongAgainst: [],
    weakAgainst: ["Rock", "Ghost", "Steel"],
    resistantTo: ["Ghost"],
    vulnerableAgainst: ["Fighting"],
  },
  Fighting: {
    strongAgainst: ["Normal", "Rock", "Steel", "Ice", "Dark"],
    weakAgainst: ["Flying", "Poison", "Psychic", "Bug", "Ghost", "Fairy"],
    resistantTo: ["Rock", "Bug", "Dark"],
    vulnerableAgainst: ["Flying", "Psychic", "Fairy"],
  },
  Flying: {
    strongAgainst: ["Fighting", "Bug", "Grass"],
    weakAgainst: ["Rock", "Steel", "Electric"],
    resistantTo: ["Fighting", "Ground", "Bug", "Grass"],
    vulnerableAgainst: ["Rock", "Electric", "Ice"],
  },
  Poison: {
    strongAgainst: ["Grass", "Fairy"],
    weakAgainst: ["Poison", "Ground", "Rock", "Ghost", "Steel"],
    resistantTo: ["Fighting", "Poison", "Grass", "Fairy"],
    vulnerableAgainst: ["Ground", "Psychic"],
  },
  Ground: {
    strongAgainst: ["Poison", "Rock", "Steel", "Fire", "Electric"],
    weakAgainst: ["Flying", "Bug", "Grass"],
    resistantTo: ["Poison", "Rock", "Electric"],
    vulnerableAgainst: ["Water", "Grass", "Ice"],
  },
  Rock: {
    strongAgainst: ["Flying", "Bug", "Fire", "Ice"],
    weakAgainst: ["Fighting", "Ground", "Steel"],
    resistantTo: ["Normal", "Flying", "Poison", "Fire"],
    vulnerableAgainst: ["Fighting", "Ground", "Steel", "Water", "Grass"],
  },
  Bug: {
    strongAgainst: ["Grass", "Psychic", "Dark"],
    weakAgainst: ["Fighting", "Flying", "Poison", "Ghost", "Steel", "Fire", "Fairy"],
    resistantTo: ["Fighting", "Ground", "Grass"],
    vulnerableAgainst: ["Flying", "Rock", "Fire"],
  },
  Ghost: {
    strongAgainst: ["Ghost", "Psychic"],
    weakAgainst: ["Normal", "Dark"],
    resistantTo: ["Normal", "Fighting", "Poison", "Bug"],
    vulnerableAgainst: ["Ghost", "Dark"],
  },
  Steel: {
    strongAgainst: ["Rock", "Ice", "Fairy"],
    weakAgainst: ["Steel", "Fire", "Water", "Electric"],
    resistantTo: ["Normal", "Flying", "Poison", "Rock", "Bug", "Steel", "Grass", "Psychic", "Ice", "Dragon", "Fairy"],
    vulnerableAgainst: ["Fighting", "Ground", "Fire"],
  },
  Fire: {
    strongAgainst: ["Bug", "Steel", "Grass", "Ice"],
    weakAgainst: ["Rock", "Fire", "Water", "Dragon"],
    resistantTo: ["Bug", "Steel", "Fire", "Grass", "Ice"],
    vulnerableAgainst: ["Ground", "Rock", "Water"],
  },
  Water: {
    strongAgainst: ["Ground", "Rock", "Fire"],
    weakAgainst: ["Water", "Grass", "Dragon"],
    resistantTo: ["Steel", "Fire", "Water", "Ice"],
    vulnerableAgainst: ["Grass", "Electric"],
  },
  Grass: {
    strongAgainst: ["Ground", "Rock", "Water"],
    weakAgainst: ["Flying", "Poison", "Bug", "Steel", "Fire", "Grass", "Dragon"],
    resistantTo: ["Ground", "Water", "Grass", "Electric"],
    vulnerableAgainst: ["Flying", "Poison", "Bug", "Fire", "Ice"],
  },
  Electric: {
    strongAgainst: ["Flying", "Water"],
    weakAgainst: ["Ground", "Grass", "Electric", "Dragon"],
    resistantTo: ["Flying", "Steel", "Electric"],
    vulnerableAgainst: ["Ground"],
  },
  Psychic: {
    strongAgainst: ["Fighting", "Poison"],
    weakAgainst: ["Steel", "Psychic", "Dark"],
    resistantTo: ["Fighting", "Psychic"],
    vulnerableAgainst: ["Bug", "Ghost", "Dark"],
  },
  Ice: {
    strongAgainst: ["Flying", "Ground", "Grass", "Dragon"],
    weakAgainst: ["Steel", "Fire", "Water", "Ice"],
    resistantTo: ["Ice"],
    vulnerableAgainst: ["Fighting", "Rock", "Steel", "Fire"],
  },
  Dragon: {
    strongAgainst: ["Dragon"],
    weakAgainst: ["Steel", "Fairy"],
    resistantTo: ["Fire", "Water", "Grass", "Electric"],
    vulnerableAgainst: ["Ice", "Dragon", "Fairy"],
  },
  Dark: {
    strongAgainst: ["Ghost", "Psychic"],
    weakAgainst: ["Fighting", "Dark", "Fairy"],
    resistantTo: ["Ghost", "Psychic", "Dark"],
    vulnerableAgainst: ["Fighting", "Bug", "Fairy"],
  },
  Fairy: {
    strongAgainst: ["Fighting", "Dragon", "Dark"],
    weakAgainst: ["Poison", "Steel", "Fire"],
    resistantTo: ["Fighting", "Bug", "Dragon", "Dark"],
    vulnerableAgainst: ["Poison", "Steel"],
  },
};

// Calculate weaknesses, strengths, resistances, and vulnerabilities
function calculateTypeEffectiveness(input) {
  const types = input
    .split(",")
    .map(t => t.trim().toLowerCase()); // Convert to lowercase for case-insensitivity

  const allWeaknesses = [];
  const allVulnerabilities = [];
  const allStrengths = [];
  const allResistances = [];

  // Collect data for all input types
  types.forEach(type => {
    const typeKey = Object.keys(typeData).find(
      key => key.toLowerCase() === type // Match regardless of case
    );
    if (typeKey) {
      allWeaknesses.push(...typeData[typeKey].weakAgainst);
      allStrengths.push(...typeData[typeKey].strongAgainst);
      allVulnerabilities.push(...typeData[typeKey].vulnerableAgainst);
      allResistances.push(...typeData[typeKey].resistantTo);
    }
  });

  // Prepare output strings
  const weaknesses = allWeaknesses.join(",") || "No weaknesses";
  const vulnerabilities = allVulnerabilities.map(v => `@${v}`).join(",") || "None";
  const strengths = allStrengths.join(",") || "No strengths";
  const resistances = allResistances.join(",") || "No resistances";
  const pokeGoText = `${weaknesses}&${vulnerabilities}`;

  return {
    weaknesses,
    strengths,
    vulnerabilities,
    pokeGoText,
  };
}

// Trigger calculation on button click
document.getElementById("calculateWeakness").addEventListener("click", () => {
  const input = document.getElementById("pokemonTypes").value;
  const result = calculateTypeEffectiveness(input);
  document.getElementById("weaknessList").textContent = result.weaknesses;
  document.getElementById("strengthList").textContent = result.strengths;
  document.getElementById("vulnerabilityList").textContent = result.vulnerabilities;
  document.getElementById("resistancesList").textContent = result.resistances;
  document.getElementById("pokeGoText").textContent = result.pokeGoText;
});

// Trigger calculation on Enter key
document.getElementById("pokemonTypes").addEventListener("keypress", event => {
  if (event.key === "Enter") {
    document.getElementById("calculateWeakness").click();
  }
});



