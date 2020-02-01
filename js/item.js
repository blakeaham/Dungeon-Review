console.log('running item generator')

let itemList;

const selectItem = () => {
			let pickNo = Math.random(Math.floor() * itemList.length);
			player.inventory.push itemList[pickNo];
			}

itemList = [
		{"name": "potion", "method": function(){ 
			player.health += 5
			const index = player.inventory.findIndex(item => item.name === "potion");
    console.log(index);
    player.inventory.splice( index, 1 );


}},
		{"name": "escape rope" , "method": function() {
				currentLog += "You used your escape rope and find yourself safely...\n";
			home();
			}},
			
			{"name": "firebomb" , "method": function(){
			opponent.health -= (rollD(12) + 4);}
			},		
			
			{"name":"regen potion", function() {
			player.regen += 1;
			// promise to remove when return home.
			
			//this highlights the need for a ROUND counter or function
			}
			},
			
			{"name" : "big potion", "method": function() {
			player.health += (rollD(8) + rollD(8) + 3);
				const index = player.inventory.findIndex(item => item.name === "big potion");
    console.log(index);
    player.inventory.splice( index, 1 );
			
			
			
			
			
			
