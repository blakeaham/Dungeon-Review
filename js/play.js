console.log('Playplaying')

const sceneObj = {
	name: 'cave',
	pName: 'cave'
}
		
let currentLog = '';

let page = {
	
	wins: 0,
	scene: null,
	gameMessage: document.getElementById('game-message'),
	button1: document.getElementById('button1'),
	button2: document.getElementById('button2'),
	video: document.querySelector('video'),
	video1: document.querySelector('source'),
	backgroundImage: document.querySelector('body'),
	goldDiv: document.getElementById('gold-page'),
	topDiv: document.getElementById('top-label'),
	topMessage: document.getElementById('top-message'),
	bottomDiv: document.getElementById('bottom-label'),
	bottomMessage: document.getElementById('bottom-message'),
	rollDisplay: document.getElementById('player-roll-sub'),
	gameLog: document.getElementById('right-div'),
	xpDisplay: document.getElementById('wins-page'),
	buttonList: document.getElementById('buttonList')

}

let player = {
	gold: 0,
	health: '?',
	level: 1,
	firstAttack: true,
	inventory: [],

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
	power: 2,

}




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
		page.buttonList.appendChild(node);
		node.addEventListener("click",element.method);

	})
	console.log('clearing da buttons');
	buttons = [];
};






// Classes class list class selection

/*
HOLY CRAP DUMDUM

player.class = {name: 'fighter', hd: 10,}
*/

const fighter = () => {

	player.strength = player.statArray[0];
	player.strMod = Math.floor((player.strength - 10) / 2);
	player.atkMod = player.strMod;
	player.dexterity = player.statArray[2];
	player.dexMod = Math.floor((player.dexterity - 10) / 2);
	player.dmgDie = 8;
	player.hd = 10;
	player.hpMax = Math.floor((player.statArray[1] - 10)) + 20;
	player.health = player.hpMax;
	player.ac = 14 + player.dexMod
	currentLog += 'You are a beefy fighter: +' + player.strMod + ' is your attack modifier, and you have ' + player.hpMax + ' health. \n Your AC is: '+ player.ac +' \n You are good at killing; in fact, you were just trying to kill this ' + opponent.name;
	buttons.push({'name':'Fight!', 'method':fight});
	buttons.push({'name':'Run off!', 'method':run});
	page.gameMessage.innerText = "What do you do?"
	printToScreen()

}	

const rogue = () => {


	player.class = 'rogue';
	player.dexterity = player.statArray[0];
	player.dexMod = Math.floor((player.dexterity - 10) / 2);
	player.atkMod = player.dexMod;
	player.dmgDie = 6;
	player.hd = 8;
	player.hpMax = Math.floor((player.statArray[1] - 10)) + 16;
	player.health = player.hpMax;
	player.ac = 12 + player.dexMod
	currentLog += 'You are a sneaky rogue : +' + player.dexMod + ' is your attack modifier, and you have ' + player.hpMax + ' health. \n Your AC is: '+ player.ac +' \n You are good escaping; in fact, you were just trying to escape this ' + opponent.name;
	buttons.push({'name':'Fight!', 'method':fight});
	buttons.push({'name':'Run off!', 'method':run});
	printToScreen()
}


//Rolls rolling attack traits rolls

const roll = () => {
	player.rollResult = Math.floor(Math.random() * 20) + 1;

	opponent.rollResult = Math.floor(Math.random() * 20) + 1;
	console.log(player.rollResult + ' and ' + opponent.rollResult);
}

const roll20 = (creature) =>{
	let die = rollD(20);
	creature.rollResult = die;
	return (die + creature.atkMod);
}

roundStart = () => {
	page.playerRoll = roll20(player);
	page.opponentRoll = roll20(opponent);
	console.log('player rolled ' + player.rollResult + ' enemy rolled' + opponent.rollResult);
	console.log('player total ' + page.playerRoll + ' enemy total' + page.opponentRoll);
}

const rollD = (d) => {
	return Math.floor(Math.random() * d + 1);
	}

const rollStats = () => {
	player.statArray = [];
	for (i=0; i < 6; i++) {
		player.statArray.push(rollD(6) + rollD(6) + 6);
	}
	console.log(player.statArray);
	player.statArray.sort((a, b) => b - a);
	page.gameMessage.innerText = "What class do you choose?";
	buttons.push({'name':'Fighter', 'method':fighter});
	buttons.push({'name':'Rogue', 'method':rogue});
	currentLog += "Your stats are " + player.statArray;
	printToScreen()
};

const rollDmg = (char) => {
	return rollD(char.dmgDie) + char.atkMod;
}



//actions

const giveUp = () => {
	page.button2.disabled = true;
	page.button1.disabled = true;
	setpage.Button1('YOU',0);
	setpage.Button2('QUIT!?',0);
	return;
	}



const fight = () => {
	roll();
	//   page.gameLog.innerText += "\n You attack, rolling a " + (player.rollResult + player.atkMod);
	
	let playerAttack = rollDmg(player);
	if (page.playerRoll >= opponent.ac ) {
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
		page.gameMessage.innerText = "Player won!";
		player.firstAttack = true;
		win();
		buttons.push({'name':'Go Home!', 'method':home});
		buttons.push({'name':'Fight more!', 'method':fightAgain});		
	} else {
	buttons.push({'name':'Fight!', 'method':fight});
	buttons.push({'name':'Run off!', 'method':run});
	page.gameMessage.innerText = "The opponent lunges!"
		let opponentAttack = rollDmg(opponent);
		if ( opponent.rollResult +  opponent.atkMod >= player.ac ) {
			page.gameMessage.innerText = "You got hit!";	
			player.health -= opponentAttack;
			console.log('hit  u for' + opponentAttack)
		} else {
			page.gameMessage.innerText = "They Missed you!";	
			console.log('missed u')
		}
		

		if (isGameOver(player.health)){
		page.gameMessage.innerText = "Opponent won!";
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
	page.gameMessage.innerText = "You're struck, and stuck!"
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
		page.goldDiv.innerText = player.gold;
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
	while (page.buttonList.firstChild) {
    page.buttonList.removeChild(page.buttonList.firstChild);
  	};
  	if(player.inventory[0]){
  		player.inventory.forEach(e => {
  		buttons.push(e);
  		});
  	}

	initializeButtons();

	console.log(buttons);
	page.backgroundImage.style.page.backgroundImage = `url('css/img/${sceneObj.name}.jpg')`;
/*	let vidID = `css/vid/${sceneObj.name}.mp4`
	console.log(sceneObj.name);
	console.log('prev ' + sceneObj.pName);
		if (sceneObj.name != sceneObj.pName){
			console.log('this   ' + page.video1.src);
			page.video1.src = vidID;
			page.video.load();
			sceneObj.pName = sceneObj.name;
		}*/
	if (sceneObj.name === 'tavern'){
	page.topDiv.innerText = 'Back at the Slippery Corkscrew';
	page.topMessage.innerText = " you seek food and lodging.";
	} else {
	page.rollDisplay.innerText = player.rollResult;
	page.opponentName = opponent.name;
	page.topDiv.innerText = 'You face a ' + page.opponentName + ' :';
	page.topMessage.innerText = "Your opponent has " + opponent.health + " health";
	
	}
	
	if (currentLog === '') { 
		console.log('empty CurrentLog');
	} else {
		page.gameLog.innerText += '\n' + currentLog + '\n';
		currentLog = '';
	}
	page.bottomMessage.innerText = "You have " + player.health + " health";
	page.gameLog.scrollTop = page.gameLog.scrollHeight;
	
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
	page.goldDiv.innerText = player.gold;
	console.log(page.wins);
	page.wins += page.xpPrize;
	console.log(page.wins + 'y');
	page.xpDisplay.innerText = page.wins;
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