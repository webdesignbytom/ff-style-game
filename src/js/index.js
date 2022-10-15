const mainContainer = document.getElementById('container');
const levelContainer = document.getElementById('level-container');
const playerContainer = document.getElementById('player-info-container');
const enemyContainer = document.getElementById('enemy-container');
const actionsContainer = document.getElementById('actions-container');

const playernameContainer = document.getElementById('player-name-container');
const playerName = document.getElementById('player-name');
const playerStatsContainer = document.getElementById('player-stats-container');
const playerhealthBar = document.getElementById('player-health-bar');
const playerkillBar = document.getElementById('player-kill-bar');
const playerImage = document.getElementById('player-image-container');

const enemyHealthContainer = document.getElementById('enemy-health-container');
const enemyImageContainer = document.getElementById('enemy-image-container');
const enemyHealthBar = document.createElement('h4');
const enemyImage = document.createElement('img');

const itemBagContainer = document.createElement('div');
const itemHeadline = document.createElement('h3');

const fightButtons = document.createElement('div');
const buttonA = document.createElement('button');
const buttonB = document.createElement('button');
const buttonC = document.createElement('button');
const buttonD = document.createElement('button');

const fightbuttonsContainer = document.getElementById(
  'fight-buttons-container'
);

const easyLevelRandom = 10;
const mediumLevelRandom = 5;
const hardLevelRandom = 3;

// GENERATE ANY RANDOM NUMBERS NEEDED
const randomNumberGenerator = (number) => {
  const randomNumber = Math.floor(Math.random() * number) + 1;
  return randomNumber;
};

const randomIndexGenerator = (number) => {
  const randomNumber = Math.floor(Math.random() * number);
  return randomNumber;
};

let state = {
  level: 1,
  isItemBagOpen: false,
  isCurrentTurn: false,
  isInBattle: false,
};

let enemyState = {};

// PLAYER
class Player {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.kills = 0;
    this.deaths = 0;
    this.fights = 0;
    this.mana = 0;
    this.level = 1;
    this.image =
      'https://migrainecanada.org/wp-content/uploads/2019/07/occipital_nerves.jpg';
    this.items = [
      {
        name: 'Potion ',
        desc: 'Health plus 10 ',
        quantity: 10
      },
    ];
    this.weapons = [];
  }
}

// ENEMIES
class EnemyCreature {
  constructor({ name, health, strength, image }) {
    this.name = name;
    this.health = health;
    this.strength = strength;
    this.image = image;
  }
}
const enemiesList = [
  {
    name: 'Dragon',
    health: 25,
    strength: 5,
    image:
      'https://img.freepik.com/free-vector/hand-drawn-dragon_53876-88179.jpg?w=2000',
  },
  {
    name: 'Evil Wizard',
    health: 50,
    strength: 3,
    image: 'https://images.stockfreeimages.com/857/sfixl/8579385.jpg',
  },
];
// SPELLS

class Spell {
  constructor({ name, damage, image }) {
    this.name = name;
    this.damage = damage;
    this.image = image;
  }
}
const spellsAvailable = [
    {
    name: 'Fireball',
    damage: 10,
    image: `🔥`
    }
]

// ITEMS
class Item {
  constructor({ name, desc, use }) {
    this.name = name;
    this.desc = desc;
    this.use = use;
  }
}
const itemsAvailable = [
  {
    name: 'Bone',
    desc: 'It was free',
    use: +10,
  },
  {
    name: 'Potion',
    desc: 'Health plus 10',
    use: +10,
  },
  {
    name: 'Cheese',
    desc: 'Delicious treat',
    use: +10,
  },
  {
    name: 'Phoenix Down',
    desc: 'Restores health from 0 to 20 in battle',
    use: +10,
  },
];

// LEVELS
const levelLocations = [
  {
    name: 'CrossRoads',
    image:
      'https://www.blogdot.tv/wp-content/uploads/2022/05/little-witch-in-the-woods-game-preview-available-today.jpg',
  },
];

// WEAPONS
class Weapon {
  constructor({ name, strength, image }) {
    this.name = name;
    this.strength = strength;
    this.image = image;
  }
}
const weaponsAvailable = [
  {
    name: 'Mega Sword',
    strength: +5,
    image:
      'https://media.istockphoto.com/photos/sword-disposed-by-diagonal-picture-id630052480?k=20&m=630052480&s=612x612&w=0&h=FPu6qhzFivQuHltu4zcH0DA2M7LRBr3rsoUodk8laJ0=',
  },
];

// Stat of Game
const newCharacter = new Player((this.name = 'Tom'));

function startGame() {
}

function setPlayerData() {
  setPlayerImage(newCharacter);
  setPlayerStats(newCharacter);
  setStartingItems(newCharacter);
  setStartingWeapons(newCharacter);
}

function setPlayerImage(newCharacter) {
  const playerImg = document.createElement('img');
  playerImg.setAttribute('src', newCharacter.image);
  playerImg.setAttribute('class', 'player-image');
  playerImage.appendChild(playerImg);
}

function setPlayerStats(newCharacter) {
  playerName.innerText = `Name: ${newCharacter.name}`;
  playerhealthBar.innerText = `Health: ${newCharacter.health}`;
  playerkillBar.innerText = `Kills: ${newCharacter.kills}`;
}

function setStartingItems(newCharacter) {
  const newItem = new Item(
    itemsAvailable[randomIndexGenerator(itemsAvailable.length)]
  );
  newItem.quantity = 1;
  newCharacter.items.push(newItem);
}

function setStartingWeapons(newCharacter) {
  const newWeapon = new Weapon(
    weaponsAvailable[randomIndexGenerator(weaponsAvailable.length)]
  );

  newCharacter.weapons.push(newWeapon);
}

function startNextTurn() {
  if (state.isCurrentTurn === true) {
    return;
  }
  state.isCurrentTurn = true;
  console.log('next turn');

  let newEnemy = spawnNewEnemy();

  if (!newEnemy) {
    state.isCurrentTurn = false;
    return console.log('no enemies');
  }

  createEnemyElements(newEnemy);
}

function createEnemyElements(newEnemy) {

  enemyImage.setAttribute('src', newEnemy.image);
  enemyImage.setAttribute('alt', newEnemy.name);
  enemyImage.setAttribute('class', 'enemy-image');
  enemyContainer.appendChild(enemyImage);

  enemyHealthBar.setAttribute('id', 'enemy-health-bar');
  enemyHealthBar.setAttribute('class', 'enemy-health-bar');
  enemyHealthBar.innerText = `Enemy Health: ${newEnemy.health}`;
  enemyHealthContainer.appendChild(enemyHealthBar);
}
// produces an instance of the enemy rerturns new enemy
function spawnNewEnemy() {
  if (randomNumberGenerator(10) > 5) {
    state.isInBattle = true;
    spawnCombatButtons();
    const newEnemy = new EnemyCreature(
      enemiesList[randomIndexGenerator(enemiesList.length)]
    );

    enemyState = newEnemy;
    return newEnemy;
  }
}

function spawnCombatButtons() {
  fightButtons.id = 'fight-buttons';
  fightbuttonsContainer.appendChild(fightButtons);

  buttonA.setAttribute('class', 'gameBtn');
  buttonA.innerText = `Attack`;
  buttonA.onclick = () => attack();

  buttonB.setAttribute('class', 'gameBtn');
  buttonB.innerText = `Magic`;
  buttonB.onclick = () => magic();

  buttonC.setAttribute('class', 'gameBtn');
  buttonC.innerText = `Items`;
  buttonC.onclick = () => items();

  buttonD.setAttribute('class', 'gameBtn');
  buttonD.innerText = `Run`;
  buttonD.onclick = () => runAway();

  fightButtons.appendChild(buttonA);
  fightButtons.appendChild(buttonB);
  fightButtons.appendChild(buttonC);
  fightButtons.appendChild(buttonD);
}

function winEnemyBattle() {
  enemyImage.remove();
  enemyHealthBar.remove();
  fightButtons.remove();
  state.isInBattle = false;
  state.isCurrentTurn = false;
  newCharacter.kills++;
  newCharacter.fights++;
  refreshStats();
}
// 4 Button options
const attack = () => {
  console.log('attack');

  let randomAttackDamage = randomNumberGenerator(5);
  enemyState.health = enemyState.health - randomAttackDamage;
  attachRefresh();
};

const magic = () => {
  console.log('magic');
};
const items = () => {
  openItemBag();
};
const runAway = () => {
  console.log('run');
};

function openItemBag() {

  if (state.isItemBagOpen === true) {
    return;
  }

  state.isItemBagOpen = true;

  itemBagContainer.id = 'item-bag-container';
  itemBagContainer.setAttribute('class', 'item-bag');
  mainContainer.appendChild(itemBagContainer);
  
  itemHeadline.innerText = 'Items';
  itemBagContainer.appendChild(itemHeadline);
  
  const itemUl = document.createElement('ul');
  itemBagContainer.appendChild(itemUl);

  newCharacter.items.forEach((item, index) => {

    const listP = document.createElement('p');
    const useItemButton = document.createElement('button');

    const itemLi = document.createElement('li');
    itemLi.setAttribute('class', 'list-item');
    itemUl.appendChild(itemLi);

    listP.innerText = item.name + `Quantity: ` + item.quantity;

    itemLi.appendChild(listP);

    useItemButton.innerText = 'USE';
    itemLi.appendChild(useItemButton);
  });

  const closeButton = document.createElement('button');
  closeButton.setAttribute('class', 'btn');
  closeButton.setAttribute('class', 'close-btn');
  closeButton.innerText = 'Close';
  closeButton.addEventListener('click', () => {
    itemBagContainer.remove();
    state.isItemBagOpen = false;
  });
  itemBagContainer.appendChild(closeButton);
}

function useBagItem(item) {
  console.log('item activated', item);
}

function setStartingLevel() {
  let i = state.level - 1;
  const imageTag = document.createElement('img');
  imageTag.setAttribute('src', levelLocations[i].image);
  imageTag.setAttribute('class', 'level-image');
  levelContainer.appendChild(imageTag);
}

function attachRefresh() {
  enemyHealthBar.innerText = `Enemy Health: ${enemyState.health}`;
  if (enemyState.health <= 1 && newCharacter.health > 0) winEnemyBattle();
}

function refreshStats() {
  playerhealthBar.innerText = `Health: ${newCharacter.health}`;
  playerkillBar.innerText = `Kills: ${newCharacter.kills}`;
}

function run() {
  setPlayerData();
  setStartingLevel();
  startGame();
}

run();
