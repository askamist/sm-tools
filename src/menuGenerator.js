// sm-tools/src/menuGenerator.js

const breakfastItems = [
	{ name: "Idli", probability: 0.3, pairsWith: ["Sambar", "Chutney"] },
	{ name: "Dosa", probability: 0.25, pairsWith: ["Sambar", "Chutney"] },
	{ name: "Upma", probability: 0.2, pairsWith: ["Chutney"] },
	{ name: "Pongal", probability: 0.15, pairsWith: ["Sambar", "Chutney"] },
	{ name: "Vada", probability: 0.1, pairsWith: ["Sambar", "Chutney"] },
];

const lunchDinnerItems = [
	{ name: "Rice", probability: 1.0, type: "main" }, // Main item, always present
	{ name: "Sambar", probability: 0.4, type: "curry", pairsWith: ["Rice"] },
	{ name: "Rasam", probability: 0.3, type: "curry", pairsWith: ["Rice"] },
	{ name: "Kootu", probability: 0.2, type: "side", pairsWith: ["Rice"] },
	{ name: "Poriyal", probability: 0.3, type: "side", pairsWith: ["Rice"] },
	{ name: "Aviyal", probability: 0.15, type: "side", pairsWith: ["Rice"] },
	{ name: "Curd", probability: 0.25, type: "side", pairsWith: ["Rice"] },
	{ name: "Appalam", probability: 0.4, type: "side" },
	{ name: "Pickle", probability: 0.3, type: "side" },
];

/**
 * Selects an item based on its probability.
 * @param {Array<Object>} items - Array of items with 'name' and 'probability' properties.
 * @returns {Object|null} The selected item or null if none is selected.
 */
function selectByProbability(items) {
	const totalProbability = items.reduce(
		(sum, item) => sum + item.probability,
		0,
	);
	let random = Math.random() * totalProbability;

	for (const item of items) {
		if (random < item.probability) {
			return item;
		}
		random -= item.probability;
	}
	return null;
}

/**
 * Generates a breakfast menu.
 * @returns {Array<string>} An array of selected breakfast items.
 */
export function generateBreakfastMenu() {
	const selectedBreakfast = selectByProbability(breakfastItems);
	if (!selectedBreakfast) return [];

	const menu = [selectedBreakfast.name];
	if (selectedBreakfast.pairsWith && selectedBreakfast.pairsWith.length > 0) {
		// Select one item from pairsWith randomly
		const pairedItem =
			selectedBreakfast.pairsWith[
				Math.floor(Math.random() * selectedBreakfast.pairsWith.length)
			];
		menu.push(pairedItem);
	}
	return menu;
}

/**
 * Generates a lunch or dinner menu.
 * @returns {Array<string>} An array of selected lunch/dinner items.
 */
export function generateLunchDinnerMenu() {
	const menu = [];
	const mainCourse = lunchDinnerItems.find((item) => item.type === "main");
	if (mainCourse) {
		menu.push(mainCourse.name);
	}

	const selectedCurries = [];
	// Ensure at least one curry is selected if main course is rice
	const availableCurries = lunchDinnerItems.filter(
		(item) => item.type === "curry",
	);
	if (mainCourse && mainCourse.name === "Rice" && availableCurries.length > 0) {
		let currySelected = false;
		// Attempt to select a curry based on probability, retry a few times to ensure one is picked
		for (let i = 0; i < 5 && !currySelected; i++) {
			const selected = selectByProbability(availableCurries);
			if (
				selected &&
				!selectedCurries.some((item) => item.name === selected.name)
			) {
				selectedCurries.push(selected);
				currySelected = true;
			}
		}
		// If after retries, no curry is selected, just pick one randomly
		if (!currySelected) {
			selectedCurries.push(
				availableCurries[Math.floor(Math.random() * availableCurries.length)],
			);
		}
	}

	// Select other curries based on probability, avoiding duplicates
	availableCurries.forEach((item) => {
		if (
			!selectedCurries.some((selected) => selected.name === item.name) &&
			Math.random() < item.probability
		) {
			selectedCurries.push(item);
		}
	});

	selectedCurries.forEach((item) => menu.push(item.name));

	// Select side dishes based on probability
	lunchDinnerItems
		.filter((item) => item.type === "side")
		.forEach((item) => {
			if (Math.random() < item.probability) {
				menu.push(item.name);
			}
		});

	return [...new Set(menu)]; // Remove potential duplicates
}

/**
 * Generates a full day's South Indian menu.
 * @returns {Object} An object containing breakfast, lunch, and dinner menus.
 */
export function generateFullDayMenu() {
	return {
		breakfast: generateBreakfastMenu(),
		lunch: generateLunchDinnerMenu(),
		dinner: generateLunchDinnerMenu(), // Dinner can be similar to lunch
	};
}
