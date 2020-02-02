console.log('Playperwerwerlaying')


let enemy;

function Enemy(name, health, dmgDie, atkMod, ac, boss) {
	this.name = name;
	this.health = health;
	this.dmgDie = dmgDie;
	this.atkMod = atkMod;
	this.ac = ac;
	this.boss = boss;
}

let selectMonster = () => { 
	let enemy00 = new Enemy('bat', 3, 4, 1, 12, false);
	let enemy01 = new Enemy('bandit', 18, 6, 3, 10, false);
	let enemy02 = new Enemy('wolf', 12, 8, 2, 8, false);
	let enemy03 = new Enemy('orc', 21, 6, 4, 6, false);
	let enemy04 = new Enemy('giant spider', 8, 12, 1, 9, false);
	let enemy05 = new Enemy('Leshen', 35, 8, 7, 15, true);
	let pick;
	if (page.wins >=100){
	 pick = Math.floor(Math.random() * 6)
	} else {
	 pick = Math.floor(Math.random() * 5)	
	};
	switch (pick) {
		case 0:
			opponent = enemy00;
			break;
		case 1:
			opponent = enemy01;
			break;
		case 2:
			opponent = enemy02;
			break;
		case 3:
			opponent = enemy03;
			break;
		case 4:
			opponent = enemy04;
			break;
		case 5:
			opponent = enemy05;
			break;
	}
	page.xpPrize = opponent.health + opponent.dmgDie + opponent.atkMod + opponent.ac;
}




//monster library bestiary --depreciated--

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