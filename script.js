// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2410-FTB-ET-WEB";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const state = {
  players: [],
}


const fetchAllPlayers = async () => {
  try {
    // TODO
    const response = await fetch(API_URL);
    if(response.ok) {
      const data = await response.json();
      state.players = data.data;
      return state.players
    } else {
      console.error('Failed to fetch all players: ', response.status)
    }
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};
/*const test = fetchAllPlayers()
console.log(test)*/
/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    // TODO
    const response = await fetch(`${API_URL}/${playerId}`);
    if(response.ok) {
      const data = await response.json();
      const player = data.data;
      console.log(player);
    } else {
      console.error(`Failed to fetch user with ID${playerId}: `, response.status )
    }
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};
fetchSinglePlayer(22138)
/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
const addNewPlayer = async (playerObj) => {
  try {
    // TODO
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerObj),
    });
    if(response.ok) {
      fetchAllPlayers();
    } else {
      console.error('Failed to add new player: ', response.status)
    }
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */
const removePlayer = async (playerId) => {
  try {
    // TODO
    const response = await fetch(`${API_URL}/${playerId}`, {
      method: "DELETE",
    });
    if(response.ok) {
      fetchAllPlayers();
      console.log(`User with ID${playerId} deleted successfully`)
    } else {
      console.error('Failed to delete user: ', response.status)
    }
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
const renderAllPlayers = (playerList) => {
  // TODO
  const main = document.querySelector('main');
  main.innerHTML = ""; // Clear the current contents of <main>
  const playerCards = document.createElement('ul');
  if(playerList.length > 0) {
    playerList.forEach((player) => {
      const card = document.createElement('li');
      card.innerHTML = `
        <p><strong>Name: ${player.name}</strong></p><br>
        <p>ID: ${player.id}</p><br>
        <img src='${player.imageUrl}' alt='${player.name}><br>
        <button onclick="renderSinglePlayer('${player.id}')">See details</button><br>
        <button onclick="removePlayer('${player.id}')">Remove from roster</button>
      `
      playerCards.appendChild(card);
    });
    main.replaceChild(playerCards);
  } else {
      // Show a message if no players are available
      const noPlayersMessage = document.createElement("p");
      noPlayersMessage.textContent = "No players are currently available.";
      main.appendChild(noPlayersMessage);
      return; // Exit the function as there are no players to render
  }
};

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => {
  // TODO
  const main = document.querySelector('main');
  playerDetail = document.createElement('div');
  playerDetail.id = player.id;
  playerDetail.innerHTML = `
  <p>Name: ${player.name}</p><br>
  <p>ID: ${player.id}</p><br>
  <p>Breed: ${player.breed}</p><br>
  <img src='${player.imageUrl}' alt='${player.name}>'
  <p>Team Name: </p>
  <button onclick='renderAllPlayers'>Back to all players</button>
  `
  
};

/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    // TODO
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
    removePlayer,
    renderAllPlayers,
    renderSinglePlayer,
    renderNewPlayerForm,
  };
} else {
  init();
}
