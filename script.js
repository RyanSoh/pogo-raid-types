// Pokémon type data (unchanged)
const typeData = {
  Normal: { strongAgainst: [], weakAgainst: ["Rock", "Steel", "Fighting"] },
  Fighting: { strongAgainst: ["Normal", "Rock", "Steel", "Ice", "Dark"], weakAgainst: ["Flying", "Poison", "Psychic", "Ghost", "Fairy"] },
  Flying: { strongAgainst: ["Fighting", "Ground", "Bug", "Grass"], weakAgainst: ["Rock", "Steel", "Electric", "Ice"] },
  Poison: { strongAgainst: ["Fighting", "Grass", "Fairy"], weakAgainst: ["Ground", "Rock", "Ghost", "Steel", "Psychic"] },
  Ground: { strongAgainst: ["Poison", "Rock", "Steel", "Fire", "Electric"], weakAgainst: ["Flying", "Bug", "Water", "Grass", "Ice"] },
  Rock: { strongAgainst: ["Normal", "Flying", "Poison", "Bug", "Fire", "Ice"], weakAgainst: ["Fighting", "Ground", "Steel", "Water", "Grass"] },
  Bug: { strongAgainst: ["Ground", "Grass", "Psychic", "Dark"], weakAgainst: ["Flying", "Poison", "Rock", "Ghost", "Steel", "Fire", "Fairy"] },
  Ghost: { strongAgainst: ["Fighting", "Poison", "Bug", "Psychic"], weakAgainst: ["Dark"] },
  Steel: { strongAgainst: ["Normal", "Flying", "Poison", "Rock", "Bug", "Grass", "Psychic", "Ice", "Dragon", "Fairy"], weakAgainst: ["Fighting", "Ground", "Fire", "Water", "Electric"] },
  Fire: { strongAgainst: ["Bug", "Steel", "Grass", "Ice", "Fairy"], weakAgainst: ["Ground", "Rock", "Water", "Dragon"] },
  Water: { strongAgainst: ["Ground", "Rock", "Steel", "Fire", "Ice"], weakAgainst: ["Grass", "Electric", "Dragon"] },
  Grass: { strongAgainst: ["Ground", "Rock", "Water", "Electric"], weakAgainst: ["Flying", "Poison", "Bug", "Steel", "Fire", "Grass", "Ice", "Dragon"] },
  Electric: { strongAgainst: ["Flying", "Steel", "Water"], weakAgainst: ["Ground", "Grass", "Dragon"] },
  Psychic: { strongAgainst: ["Fighting", "Poison"], weakAgainst: ["Bug", "Ghost", "Steel", "Dark"] },
  Ice: { strongAgainst: ["Flying", "Ground", "Grass", "Dragon"], weakAgainst: ["Fighting", "Rock", "Steel", "Fire", "Water"] },
  Dragon: { strongAgainst: ["Fire", "Water", "Grass", "Electric"], weakAgainst: ["Steel", "Ice", "Fairy"] },
  Dark: { strongAgainst: ["Ghost", "Psychic"], weakAgainst: ["Fighting", "Bug", "Fairy"] },
  Fairy: { strongAgainst: ["Fighting", "Bug", "Dragon", "Dark"], weakAgainst: ["Poison", "Steel", "Fire"] },
};

// Calculate weaknesses and strengths
function calculateWeaknessAndAvoid(input) {
  const types = input
    .split(",")
    .map(t => t.trim().toLowerCase()); // Convert to lowercase for case-insensitivity

  const allWeaknesses = [];
  const allStrengths = [];

  // Collect all weaknesses and strengths for all input types
  types.forEach(type => {
    const typeKey = Object.keys(typeData).find(
      key => key.toLowerCase() === type // Match regardless of case
    );
    if (typeKey) {
      allWeaknesses.push(...typeData[typeKey].weakAgainst);
      allStrengths.push(...typeData[typeKey].strongAgainst);
    }
  });

  // Remove duplicates by converting to sets
  const combinedWeaknesses = [...new Set(allWeaknesses)];
  const combinedStrengths = [...new Set(allStrengths)];

  // Remove strengths from weaknesses
  const finalWeaknesses = combinedWeaknesses.filter(weak => !combinedStrengths.includes(weak));

  // Calculate avoidUsing: types that are strong but not weak
  const avoidUsing = combinedStrengths.filter(strong => !combinedWeaknesses.includes(strong));

  // Prepare Pokémon Go text
  const weaknessText = finalWeaknesses.join(",@").toLowerCase();
  const avoidText = avoidUsing.map(type => `${type}`).join("&!@").toLowerCase();
  const pokeGoText = `@${weaknessText}&!@${avoidText}`
  return {
    weaknesses: finalWeaknesses.join(", ") || "No weaknesses found",
    avoidUsing: avoidUsing.join(", ") || "None",
    pokeGoText: pokeGoText || "N/A",
  };
}



// Trigger calculation on button click
document.getElementById("calculateWeakness").addEventListener("click", () => {
  const input = document.getElementById("pokemonTypes").value;
  const result = calculateWeaknessAndAvoid(input);
  document.getElementById("weaknessList").textContent = `${result.weaknesses}`;
  document.getElementById("avoidList").textContent = `${result.avoidUsing}`;
  document.getElementById("pokeGoText").textContent = result.pokeGoText;
});

// Trigger calculation on Enter key
document.getElementById("pokemonTypes").addEventListener("keypress", event => {
  if (event.key === "Enter") {
    document.getElementById("calculateWeakness").click();
  }
});


