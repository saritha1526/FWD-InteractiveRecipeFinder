document.addEventListener('DOMContentLoaded', () => {
   const recipes = {
    chicken: [
      { name: "Chicken Curry", steps: "1. Heat oil. 2. Fry onions. 3. Add spices + chicken. 4. Add water + cook until soft.", img: "https://source.unsplash.com/800x600/?chicken-curry" },
      { name: "Butter Chicken", steps: "1. Marinate chicken with yogurt + spices. 2. Cook in butter + tomato gravy. 3. Serve with naan.", img: "https://source.unsplash.com/800x600/?butter-chicken" },
      { name: "Chicken Biryani", steps: "1. Cook chicken with spices. 2. Layer with half-cooked rice. 3. Steam until aromatic.", img: "https://source.unsplash.com/800x600/?biryani,chicken" }
    ],
    paneer: [
      { name: "Paneer Butter Masala", steps: "1. Fry paneer cubes. 2. Cook tomato-onion gravy with spices. 3. Mix paneer + cream.", img: "https://source.unsplash.com/800x600/?paneer,butter-masala" },
      { name: "Palak Paneer", steps: "1. Boil spinach + grind. 2. Fry paneer. 3. Mix in spinach curry with spices.", img: "https://source.unsplash.com/800x600/?palak-paneer,spinach" }
    ],
    samosa: [
      { name: "Samosa", steps: "1. Fill dough with potato masala. 2. Fry until golden brown. 3. Serve with chutney.", img: "https://source.unsplash.com/800x600/?samosa" }
    ],
    pakoda: [
      { name: "Pakoda", steps: "1. Dip onions/potatoes in besan batter. 2. Fry until crispy. 3. Serve hot.", img: "https://source.unsplash.com/800x600/?pakora,pakoda" }
    ],
    noodles: [
      { name: "Noodles", steps: "1. Boil noodles for 5-7 minutes. 2. Add soy sauce, vinegar, garlic paste. 3. Fry with noodles until golden. 4. Serve with tomato sauce.", img: "https://source.unsplash.com/800x600/?noodles,stir-fry" }
    ],
    frenchfries: [
      { name: "French Fries", steps: "1. Cut potato into sticks. 2. Deep fry for 2-3 min. 3. Serve with tomato sauce.", img: "https://source.unsplash.com/800x600/?french-fries,fries" },
      { name: "Tea", steps: "1. Boil water 5 min. 2. Add tea powder. 3. Add milk + sugar. 4. Serve hot.", img: "https://source.unsplash.com/800x600/?tea,chai" }
    ],
    soup: [
      { name: "Tomato Soup", steps: "1. Boil tomatoes + spices. 2. Blend. 3. Serve with cream.", img: "https://source.unsplash.com/800x600/?tomato-soup" },
      { name: "Sweet Corn Soup", steps: "1. Boil sweet corn. 2. Add water + spices. 3. Serve hot.", img: "https://source.unsplash.com/800x600/?sweet-corn-soup" }
    ],
    juice: [
      { name: "Orange Juice", steps: "1. Squeeze oranges. 2. Strain if needed. 3. Serve chilled.", img: "https://source.unsplash.com/800x600/?orange-juice,juice" },
      { name: "Dragon Fruit Juice", steps: "1. Blend dragon fruit + milk + sugar + ice. 2. Strain if needed. 3. Serve chilled.", img: "https://source.unsplash.com/800x600/?dragon-fruit,dragonfruit-juice" },
      { name: "Lemonade", steps: "1. Squeeze lemon. 2. Add sugar, ice, pinch of salt. 3. Strain & serve.", img: "https://source.unsplash.com/800x600/?lemonade" },
      { name: "Grape Juice", steps: "1. Boil grapes. 2. Crush. 3. Strain. 4. Add sugar, ice. 5. Serve chilled.", img: "https://source.unsplash.com/800x600/?grape-juice,grapes" },
      { name: "Banana Shake", steps: "1. Blend banana + milk + sugar + ice. 2. Strain if needed. 3. Serve chilled.", img: "https://source.unsplash.com/800x600/?banana-shake,milkshake" },
      { name: "Mango Shake", steps: "1. Blend mango + sugar + ice. 2. Strain if needed. 3. Serve chilled.", img: "https://source.unsplash.com/800x600/?mango-shake,mango" },
      { name: "Watermelon Juice", steps: "1. Blend watermelon + sugar + ice. 2. Strain if needed. 3. Serve chilled.", img: "https://source.unsplash.com/800x600/?watermelon-juice,watermelon" }
    ],
    sweets: [
      { name: "Gulab Jamun", steps: "1. Make dough balls. 2. Fry golden. 3. Soak in sugar syrup.", img: "https://source.unsplash.com/800x600/?gulab-jamun,indian-sweets" },
      { name: "Rasgulla", steps: "1. Make chenna balls. 2. Boil in sugar syrup. 3. Serve chilled.", img: "https://source.unsplash.com/800x600/?rasgulla,indian-sweets" }
    ]
  };

  // Create an aggregated 'snacks' category so your 'Snacks' filter works
  recipes.snacks = []
    .concat(recipes.samosa || [], recipes.pakoda || [], recipes.frenchfries || [], recipes.noodles || []);

  // DOM refs
  const recipeListDiv = document.getElementById("recipeList");
  const instructionsDiv = document.getElementById("instructions");
  const filterButtons = document.querySelectorAll('.filters button');
  const suggestionsDiv = document.getElementById("suggestions");
  const ingredientInput = document.getElementById("ingredientInput");

  // fallback image
  const FALLBACK_IMG = "https://source.unsplash.com/800x600/?food,meal";

  // ---------- helper: create one recipe card ----------
  function createCard(recipe) {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = recipe.img || FALLBACK_IMG;
    img.alt = recipe.name;
    img.onerror = function () { this.onerror = null; this.src = FALLBACK_IMG; };

    const title = document.createElement("h4");
    title.textContent = recipe.name;

    const btn = document.createElement("button");
    btn.textContent = "View Recipe";
    btn.addEventListener("click", () => showRecipeByName(recipe.name));

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(btn);
    return card;
  }

  // ---------- display list ----------
  function displayRecipes(recipeArray) {
    recipeListDiv.innerHTML = "";
    if (!Array.isArray(recipeArray) || recipeArray.length === 0) {
      recipeListDiv.innerHTML = "<p>No recipes to display.</p>";
      return;
    }
    recipeArray.forEach(recipe => {
      recipeListDiv.appendChild(createCard(recipe));
    });
  }

  // ---------- filter category ----------
  function filterCategory(category, btn) {
    instructionsDiv.innerHTML = "";
    suggestionsDiv.innerHTML = "";
    filterButtons.forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    if (category === "all") {
      // combine all recipe arrays
      const all = Object.values(recipes).reduce((acc, arr) => acc.concat(Array.isArray(arr) ? arr : []), []);
      displayRecipes(all);
      return;
    }

    if (!recipes[category]) {
      recipeListDiv.innerHTML = "<p>No recipes available for this category.</p>";
      return;
    }
    displayRecipes(recipes[category]);
  }

  // ---------- search by ingredient key ----------
  function findRecipes() {
    const input = (ingredientInput && ingredientInput.value || "").toLowerCase().trim();
    instructionsDiv.innerHTML = "";
    suggestionsDiv.innerHTML = "";
    if (recipes[input]) {
      displayRecipes(recipes[input]);
    } else {
      recipeListDiv.innerHTML = "<p>No recipes found for this ingredient.</p>";
    }
  }

  // ---------- show recipe details ----------
  function showRecipeByName(recipeName) {
    // flatten all recipes and find by name
    const allRecipes = Object.values(recipes).reduce((acc, arr) => acc.concat(Array.isArray(arr) ? arr : []), []);
    const recipe = allRecipes.find(r => r.name === recipeName);
    if (!recipe) {
      instructionsDiv.innerHTML = "<p>Recipe not found.</p>";
      return;
    }

    // build details DOM (avoid raw innerHTML to reduce injection risk)
    instructionsDiv.innerHTML = "";
    const h3 = document.createElement("h3");
    h3.textContent = recipe.name;

    const img = document.createElement("img");
    img.src = recipe.img || FALLBACK_IMG;
    img.alt = recipe.name;
    img.width = 300;
    img.onerror = function () { this.onerror = null; this.src = FALLBACK_IMG; };

    const p = document.createElement("p");
    p.textContent = recipe.steps;

    instructionsDiv.appendChild(h3);
    instructionsDiv.appendChild(img);
    instructionsDiv.appendChild(p);

    window.scrollTo({ top: instructionsDiv.offsetTop - 20, behavior: 'smooth' });
  }

  // ---------- dynamic suggestions ----------
  function showSuggestions(value) {
    suggestionsDiv.innerHTML = "";
    const input = (value || "").toLowerCase().trim();
    if (!input) return;
    const matches = Object.keys(recipes).filter(key => key.startsWith(input));
    matches.forEach(match => {
      const div = document.createElement("div");
      div.innerText = match;
      div.addEventListener("click", () => {
        if (ingredientInput) ingredientInput.value = match;
        findRecipes();
        suggestionsDiv.innerHTML = "";
      });
      suggestionsDiv.appendChild(div);
    });
  }

  // Export small API to window so your inline onclick attributes still work
  window.filterCategory = filterCategory;
  window.findRecipes = findRecipes;
  window.showRecipeByName = showRecipeByName;
  window.showSuggestions = showSuggestions;

  // Wire up keyboard suggestions if input exists (this replaces inline onkeyup but also works if inline remains)
  if (ingredientInput) {
    ingredientInput.addEventListener('keyup', (e) => showSuggestions(e.target.value));
  }

  // Initial load — activate first filter button if present
  if (filterButtons && filterButtons[0]) {
    filterCategory('all', filterButtons[0]);
  } else {
    // fallback: show everything
    const all = Object.values(recipes).reduce((acc, arr) => acc.concat(Array.isArray(arr) ? arr : []), []);
    displayRecipes(all);
  }
});
