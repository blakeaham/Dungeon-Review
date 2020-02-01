console.log('Playplaying')

const sceneObj = {
	name: 'cave',
	pName: 'cave'
}
		
let currentLog = '';

let page = {
	
	wins: 0,
	scene: null,

}

let player = {
	gold: 0,
	health: '?',
	level: 1,
	firstAttack: true,
	inventory: [],
	rollAttack: function(){
		//WRITE THIS
	}
}
// GIVE PLAYER POTION
// NEED TO REMOVE ITEM WHEN USED (do this within the item's function)
const givePotion = () => { player.inventory = [{"name": "potion", "method": function(){ 
	player.health += 5
	const index = player.inventory.findIndex(item => item.name === "potion");
    console.log(index);
    player.inventory.splice( index, 1 );


}}];
};

let opponent = {
	health: 10,
	power: 2
}

const gameMessage = document.getElementById('game-message');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const video = document.querySelector('video');
const video1 = document.querySelector('source');
const backgroundImage = document.querySelector('body');
const goldDiv = document.getElementById('gold-page');
const topDiv = document.getElementById('top-label');
const topMessage = document.getElementById('top-message');
const bottomDiv = document.getElementById('bottom-label');
const bottomMessage = document.getElementById('bottom-message');
const rollDisplay = document.getElementById('player-roll-sub');
const gameLog = document.getElementById('right-div');
const xpDisplay = document.getElementById('wins-page');
const buttonList = document.getElementById('buttonList');
const mealPrice = player.level * 3;

//gonna try a scene object
let buttons = [];

const initializeButtons = () => {

	console.log('RENDERING BUTTONS');
	console.table(buttons);
	buttons.forEach(element => {
		let node = document.createElement("button");
		let textNode = document.createTextNode(`${element.name}`);
		node.appendChild(textNode);
		buttonList.appendChild(node);
		node.addEventListener("click",element.method);

	})
	console.log('clearing da buttons');
	buttons = [];
};


let action1;

const setButton1 = (text, method) => {
	button1.innerText= text;
	action1 = method;
}
let action2;

const setButton2 = (text, method) => {
	button2.innerText= text;
	action2 = method;
}




// Classes class list class selection

const fighter = () => {

	player.strength = page.playerStats[0];
	player.strMod = Math.floor((player.strength - 10) / 2);
	player.atkMod = player.strMod;
	player.dexterity = page.playerStats[2];
	player.dexMod = Math.floor((player.dexterity - 10) / 2);
	player.dmgDie = 8;
	player.hd = 10;
	player.hpMax = Math.floor((page.playerStats[1] - 10)) + 20;
	player.health = player.hpMax;
	player.ac = 14 + player.dexMod
	currentLog += 'You are a beefy fighter: +' + player.strMod + ' is your attack modifier, and you have ' + player.hpMax + ' health. \n Your AC is: '+ player.ac +' \n You are good at killing; in fact, you were just trying to kill this ' + opponent.name;
	buttons.push({'name':'Fight!', 'method':fight});
	buttons.push({'name':'Run off!', 'method':run});
	gameMessage.innerText = "What do you do?"
	printToScreen()

}	

const rogue = () => {


	player.class = 'rogue';
	player.dexterity = page.playerStats[0];
	player.dexMod = Math.floor((player.dexterity - 10) / 2);
	player.atkMod = player.dexMod;
	player.dmgDie = 6;
	player.hd = 8;
	player.hpMax = Math.floor((page.playerStats[1] - 10)) + 16;
	player.health = player.hpMax;
	player.ac = 12 + player.dexMod
	currentLog += 'You are a sneaky rogue : +' + player.dexMod + ' is your attack modifier, and you have ' + player.hpMax + ' health. \n Your AC is: '+ player.ac +' \n You are good escaping; in fact, you were just trying to escape this ' + opponent.name;
	buttons.push({'name':'Fight!', 'method':fight});
	buttons.push({'name':'Run off!', 'method':run});
	printToScreen()
}
//monster library bestiary

/*let determineEnemy = [
	{
		name: 'bat',
		health: 3,
		dmgDie: 4,
		atkMod: 1,
		ac: 13,
		boss: false

	},
	{
		name: 'bandit',
		health: 18,
		dmgDie: 6,
		atkMod: 3,
		ac: 12,
		boss: false
	},
	{
		name: 'wolf',
		health: 12,
		dmgDie: 8,
		atkMod: 2,
		ac: 10,
		boss: false
	},
	{
		name: 'Giant Spider',
		health: 8,
		dmgDie: 12,
		atkMod: 1,
		ac: 9,
		boss: false
	},
	
];
*/
//Determining Monster Goes here

/*const selectMonster = () => {
	n = Math.floor(Math.random() * determineEnemy.length);
	opponent.health = determineEnemy[n].health;
	opponent.atkMod = determineEnemy[n].atkMod;
	opponent.dmgDie = determineEnemy[n].dmgDie;
	opponent.ac = determineEnemy[n].ac;
	opponent.boss = determineEnemy[n].boss;
	opponent.name = determineEnemy[n].name;
}
*/

//Rolls rolling attack traits rolls

const roll = () => {
	player.rollResult = Math.floor(Math.random() * 20) + 1;

	opponent.rollResult = Math.floor(Math.random() * 20) + 1;
	console.log(player.rollResult + ' and ' + opponent.rollResult);
}

const rollD = (d) => {
	return Math.floor(Math.random() * d + 1);
	}

const rollStats = () => {
	page.playerStats = [];
	for (i=0; i < 6; i++) {
		page.playerStats.push(rollD(6) + rollD(6) + 6);
	}
	console.log(page.playerStats);
	page.playerStats.sort((a, b) => b - a);
	gameMessage.innerText = "What class do you choose?";
	buttons.push({'name':'Fighter', 'method':fighter});
	buttons.push({'name':'Rogue', 'method':rogue});
	currentLog += "Your stats are " + page.playerStats;
	printToScreen()
};

const determineAttack = (power) => {
	return rollD(power.dmgDie) + power.atkMod;
}



//actions

const giveUp = () => {
	button2.disabled = true;
	button1.disabled = true;
	setButton1('YOU',0);
	setButton2('QUIT!?',0);
	return;
	}



const fight = () => {
	roll();
	//   gameLog.innerText += "\n You attack, rolling a " + (player.rollResult + player.atkMod);
	
	let playerAttack = determineAttack(player);
	if (player.rollResult + player.atkMod >= opponent.ac ) {
		if (player.class === 'rogue') {
			if (player.firstAttack === true) {
				let snd = rollD(6);
				console.log(playerAttack + ' is unmodified damage');
				playerAttack += snd;
				console.log(playerAttack + ' damage after adding Sneak for ' + snd );
				player.firstAttack = false;
			}
		}
		opponent.health -= playerAttack;
		currentLog += "You hit with a " + (player.rollResult + player.atkMod) + ' for ' + playerAttack + ' damage.';
		console.log('hit for' + playerAttack)
	} else {
		
	currentLog += "Your " + (player.rollResult + player.atkMod) + ' did not hit against AC.';
	}

	if (isGameOver(opponent.health)){
		gameMessage.innerText = "Player won!";
		player.firstAttack = true;
		win();
		buttons.push({'name':'Go Home!', 'method':home});
		buttons.push({'name':'Fight more!', 'method':fightAgain});		
	} else {
	buttons.push({'name':'Fight!', 'method':fight});
	buttons.push({'name':'Run off!', 'method':run});
	gameMessage.innerText = "The opponent lunges!"
		let opponentAttack = determineAttack(opponent);
		if ( opponent.rollResult +  opponent.atkMod >= player.ac ) {
			gameMessage.innerText = "You got hit!";	
			player.health -= opponentAttack;
			console.log('hit  u for' + opponentAttack)
		} else {
			gameMessage.innerText = "They Missed you!";	
			console.log('missed u')
		}
		

		if (isGameOver(player.health)){
		gameMessage.innerText = "Opponent won!";
		buttons.push({'name':'YOU', 'method':alert('game over')});
		buttons.push({'name':'DIED', 'method':alert("It's Over!")});
		printToScreen();
		return;
		}

		
	};

	printToScreen();

}

const isGameOver = (health) => {
	return health <= 0;
}

const reset = () => {
	window.alert('Resetting');
	setTimeout(()=>{
		player.health = 10;
		opponent.health = 10;
		printToScreen();
	},1000);
}

const run = () => {
	roll();
	console.log(player.rollResult + player.dexMod +' vs '+ opponent.rollResult)
	if (opponent.rollResult >= player.rollResult + player.dexMod) {
//		This is what I had. waste of space lol!?	player.health -= Math.floor(Math.random() * opponent.dmgDie + 1);
	player.health -= rollD(opponent.dmgDie);
	buttons.push({'name':'Fight!', 'method':fight});
	buttons.push({'name':'Run off!', 'method':run});
	currentLog += 'You try to run, but are struck!';
	gameMessage.innerText = "You're struck, and stuck!"
	} else {
		currentLog += 'You make it away from the ' + opponent.name;
		player.firstAttack = true;
		home();
		return;
	}
	printToScreen();
}
let n = 0;

const fightAgain = () => {
	selectMonster();
	if (page.scene === 'forest') {
		forest();
	} else if (page.scene === 'cave') {
		cave();
	} else {
		buttons.push({'name':'Youre', 'method':home});
		buttons.push({'name':'LOST!', 'method':home});
		currentLog += "You need to go back home, you've lost your way";
		printToScreen();
	}
}

const home = () => {
	sceneObj.name = 'tavern'
		


	if (player.gold > 1) {

		player.gold -= 1;
		advanceCheck();
		page.scene = 'tavern';


		console.log('doing the healing')
		goldDiv.innerText = player.gold;
		currentLog += 'You make it back to the Slippery Corkscrew, the local inn and tavern. \n Micah passes you a beer from behind the bar. \n He says he\'ll have a plate out soon. \n'
		player.health = player.hpMax;
		currentLog += 'Your health is ' +  player.health + ' and you\'re ready to  go out and fight again!';
	} else {
		currentLog += 'You get to the inn, but Micah turns you away as the pauper you are. \n "Don\'t come back until you\'ve some gold to pay!';
	}
	//determine MONTSHTER //
	selectMonster();


	
	buttons.push({'name':'Cave!', 'method':cave});
	buttons.push({'name':'Forest!', 'method':forest});
	printToScreen();
}

//This prints and updates screen, so it should be called ALL THE TIME//

const printToScreen = () => {
	console.log('clearing prev btns');
	while (buttonList.firstChild) {
    buttonList.removeChild(buttonList.firstChild);
  	};
  	if(player.inventory[0]){
  		player.inventory.forEach(e => {
  		buttons.push(e);
  		});
  	}

	initializeButtons();

	console.log(buttons);
	backgroundImage.style.backgroundImage = `url('css/img/${sceneObj.name}.jpg')`;
/*	let vidID = `css/vid/${sceneObj.name}.mp4`
	console.log(sceneObj.name);
	console.log('prev ' + sceneObj.pName);
		if (sceneObj.name != sceneObj.pName){
			console.log('this   ' + video1.src);
			video1.src = vidID;
			video.load();
			sceneObj.pName = sceneObj.name;
		}*/
	if (sceneObj.name === 'tavern'){
	topDiv.innerText = 'Back at the Slippery Corkscrew';
	topMessage.innerText = " you seek food and lodging.";
	} else {
	rollDisplay.innerText = player.rollResult;
	page.opponentName = opponent.name;
	topDiv.innerText = 'You face a ' + page.opponentName + ' :';
	topMessage.innerText = "Your opponent has " + opponent.health + " health";
	
	}
	
	if (currentLog === '') { 
		console.log('empty CurrentLog');
	} else {
		gameLog.innerText += '\n' + currentLog + '\n';
		currentLog = '';
	}
	bottomMessage.innerText = "You have " + player.health + " health";
	gameLog.scrollTop = gameLog.scrollHeight;
	
}

//initialize buttons here

selectMonster();
buttons.push({'name':'Roll Scores', 'method':rollStats});
buttons.push({'name':'Give up', 'method':giveUp});
initializeButtons();



//printToScreen();




//This might be a good demarkation for a module for fighting


const win = () => {
	if (opponent.boss) {
		player.gold += Math.floor(Math.random() * 88) + 55;
	}
	player.gold += Math.floor(Math.random() * 5) + 2;
	goldDiv.innerText = player.gold;
	console.log(page.wins);
	page.wins += page.xpPrize;
	console.log(page.wins + 'y');
	xpDisplay.innerText = page.wins;
	/*if (page.wins === 5) {      //better way for this?
		determineEnemy.push({
		name: 'Leshen',
		health: 35,
		dmgDie: 8,
		atkMod: 7,
		ac: 15,
		boss: true
	});
	}*/
}


const advanceCheck = () => {
	let xpLevel = (Math.floor(page.wins / 100) + 1);
	if (xpLevel > player.level) {
		player.level += 1;
		player.hpMax += rollD(player.hd); 
	}

}

// where we keep scene

const forest= () => {
	sceneObj.name = 'forest';
	// video1.src ="forestVideo.mp4";
	// video.load();
	page.scene = 'forest';
	buttons.push({'name':'Fight!', 'method':fight});
	buttons.push({'name':'Run off!', 'method':run});
	printToScreen();
}

const cave = () => {
	/* not sure why this doesn't work */
	sceneObj.name = 'cave';

	/*
	*/	page.scene = 'cave';
	buttons.push({'name':'Fight!', 'method':fight});
	buttons.push({'name':'Run off!', 'method':run});	
	printToScreen();

}