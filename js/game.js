const $ = id => document.getElementById(id)
const c = id => document.getElementsByClassName(id)
const t = id => document.getElementsByTagName(id)
const D = id => new Decimal(id)

var game = {};
game.time = 0
game.tb = 0
game.points = 0;
game.incrementers = 1;
game.workers = 0;
game.banks = 0;
game.derivatives = 0; 
game.dpower = 0;
game.cost1 = 25;
game.cost2 = 200;
game.cost3 = 15000;
game.cost4 = 100;
game.tickpart = 0;
game.tickspeed = 50;
game.b = 0,
game.tab = 1;
game.pu = [0,0,0,0,0,0,0,0,0,0];
game.puCosts = [1,3,5,5,10,15,20,30,50,50];
game.x = 1;
game.automators = [false,false,false,false];
game.autoprestigeamt = 1;
game.pps = 0;
game.prestiges = 0;
console.log("What are you doing here in the console?");

// so we are going to save the game in an object.

function showElement(element) { // shows element
  $(element).style.display = "inline";
}

function hideElement(element) { // hides element
  $(element).style.display = "none";
} 

function init() { // only run this once 
  
}

init();

var mainGameLoop = window.setInterval(function() { // runs the loop
  game.tickpart += 50
  if (game.tickpart>=game.tickspeed) {
    game.tickpart -= game.tickspeed
    loop();
  }
}, 33);

function loop() { // don't change this stuff unless you know what you're doing
  game.points += game.incrementers/30*(game.pu[0]==1 ? 2*Math.log10(game.time) : 1)*(game.pu[7]==1 ? Math.log10(game.workers+1)+1 : 1)*(Math.log10(game.dpower+1)+1); //1 per sec 
  game.points += game.workers/3*(game.pu[0]==1 ? 2*Math.log10(game.time) : 1)*(Math.log10(game.dpower+1)+1); //10 per sec
  game.points += game.banks*100/3*(game.pu[0]==1 ? 2*Math.log10(game.time) : 1)*(game.pu[2]==1 ? Math.log10(game.incrementers+1)+1 : 1)*(Math.log10(game.dpower+1)+1); //1000 per sec
  game.dpower += game.derivatives/30
  game.time += 1/30;
  game.pps = Math.floor((game.incrementers*(game.pu[0]==1 ? 2*Math.log10(game.time) : 1)*(game.pu[7]==1 ? Math.log10(game.workers+1)+1 : 1)*(Math.log10(game.dpower+1)+1))+(game.workers*10*(game.pu[0]==1 ? 2*Math.log10(game.time) : 1)*(Math.log10(game.dpower+1)+1))+(game.banks*1000*(game.pu[0]==1 ? 2*Math.log10(game.time) : 1)*(game.pu[2]==1 ? Math.log10(game.incrementers+1)+1 : 1)*(Math.log10(game.dpower+1)+1)));
  $("points").innerHTML = `Points: ${Math.floor(game.points)}`;
  $("pps").innerHTML = `You are getting ${game.pps} points per second`;
  $("inc").innerHTML = `Incrementers: ${game.incrementers}`;
  $("workers").innerHTML = `Workers: ${game.workers}`;
  $("banks").innerHTML = `Banks: ${game.banks}`;
  $("derivatives").innerHTML = `Derivatives: ${game.derivatives}`;
  $("incbuy").innerHTML = `Buy an incrementer for ${game.cost1} points`;
  $("workerbuy").innerHTML = `Buy a worker for ${game.cost2} points`;
  $("bankbuy").innerHTML = `Buy a bank for ${game.cost3} points`;
  $("derivativebuy").innerHTML = `Buy a derivative for ${game.cost4} b`;
  $("dpower").innerHTML = `You have ${Math.floor(game.dpower)} Derivative Power, giving a ${Math.round(Math.log10(game.dpower+1)+1)}x multiplier to point production`
  $("prestige").innerHTML = `Prestige for ${Math.floor(Math.log2(game.points/100000)*(game.pu[4]==1 ? 2 : 1))+1} b`
  $("b").innerHTML = `You have ${game.b} b`
  $("pu1").innerHTML = `Gain a multiplier to point production based on time played <br> Cost: 1 b <br> Currently: ${Math.round(2*Math.log10(game.time))}x`
  $("pu3").innerHTML = `Banks are more powerful based on Incrementers bought <br> Cost: 5 b <br> Currently: ${Math.round(Math.log10(game.incrementers+1)+1)}x`
  $("pu8").innerHTML = `Incrementers are more powerful based on Workers bought <br> Cost: 30 b <br> Currently: ${Math.round(Math.log10(game.workers+1)+1)}x`
  $("info").innerHTML = `You have a total of ${game.incrementers+game.workers+game.banks} buildings.<br>You have collected a total of ${game.tb} b.<br>You have prestiged ${game.prestiges} times.<br>You have played this game for ${Math.floor(game.time)} seconds.`
  $("auto1").innerHTML = `Auto: ${game.automators[0] ? "ON" : "OFF"}`;
  $("auto2").innerHTML = `Auto: ${game.automators[1] ? "ON" : "OFF"}`;
  $("auto3").innerHTML = `Auto: ${game.automators[2] ? "ON" : "OFF"}`;
  $("autoprestige").innerHTML = `Auto-Prestige: ${game.automators[3] ? "ON" : "OFF"}`;
  game.autoprestigeamt = $("inputBox").value;

  Array.from(document.querySelectorAll("body *")).forEach(elem => {
    if (!elem.getAttribute("display")) return elem;
    elem.style.display = eval(elem.getAttribute("display"))
      ? "inline-block"
      : "none";
  });
  
  game.x += 1;
  if (game.x >= 11){
    game.x = 1;
  }
  if(game.b >= game.puCosts[game.x-1] && game.pu[game.x-1] == 0){
    $("pu"+(game.x)).className = "pubuyable";
  }
  if(game.b < game.puCosts[game.x-1] && game.pu[game.x-1] == 0){
    $("pu"+(game.x)).className = "pulocked";
  }
  if(game.pu[game.x-1] == 1){
    $("pu"+(game.x)).className = "pubought";
  }
  
  if(game.points >= game.cost1){
    $("incbuy").className = "buyable";
  }else{
    $("incbuy").className = "buyableLocked";
  }
  if(game.points >= game.cost2){
    $("workerbuy").className = "buyable";
  }else{
    $("workerbuy").className = "buyableLocked";
  }
  if(game.points >= game.cost3){
    $("bankbuy").className = "buyable";
  }else{
    $("bankbuy").className = "buyableLocked";
  }
  if(game.b >= game.cost4){
    $("derivativebuy").className = "buyable";
  }else{
    $("derivativebuy").className = "buyableLocked";
  }
  
  if(game.automators[2] == true){
    var ret = false;
    if (game.points > game.cost3){
      game.points -= game.cost3;
      game.banks += 1;
      game.cost3 = game.pu[1]==1 ? Math.round(game.cost3*1.1) : Math.round(game.cost3*1.15);
      ret = true;
    }
  }
  if(game.automators[1] == true){
    var ret = false;
    if (game.points > game.cost2){
      game.points -= game.cost2;
      game.workers += 1;
      game.cost2 = game.pu[1]==1 ? Math.round(game.cost2*1.1) : Math.round(game.cost2*1.15);
      ret = true;
    }
  }
  if(game.automators[0] == true){
    var ret = false;
    if (game.points > game.cost1){
      game.points -= game.cost1;
      game.incrementers += 1;
      game.cost1 = game.pu[1]==1 ? Math.round(game.cost1*1.1) : Math.round(game.cost1*1.15);
      ret = true;
    }
  }
  if(game.automators[3] == true){
    if(Math.floor(Math.log2(game.points/100000)*(game.pu[4]==1 ? 2 : 1))+1 >= game.autoprestigeamt){
      prestige();
    }
  }
}

function tabSwitch(x) {
   game.tab = x;
}

function buyInc(x) {
  var ret = false
  switch (x) {
    case 1:
    if (game.points > game.cost1){
      game.points -= game.cost1;
      game.incrementers += 1;
      game.cost1 = game.pu[1]==1 ? Math.round(game.cost1*1.1) : Math.round(game.cost1*1.15);
      ret = true
    }
    break;
    case 2:
    if (game.points > game.cost2){
      game.points -= game.cost2;
      game.workers += 1;
      game.cost2 = game.pu[1]==1 ? Math.round(game.cost2*1.1) : Math.round(game.cost2*1.15);
      ret = true
    }
    break;
    case 3:
    if (game.points > game.cost3){
      game.points -= game.cost3;
      game.banks += 1;
      game.cost3 = game.pu[1]==1 ? Math.round(game.cost3*1.1) : Math.round(game.cost3*1.15);
      ret = true
    }
    break;
    case 4:
      if (game.b > game.cost4) {
      game.b -= game.cost4
      game.derivatives += 1; 
      game.cost4 = Math.round(game.cost4*1.15);
      }
  } 
  return ret
}

function maxAll(x) {
  while (true) {
    let a = buyInc(3)
    if (!a) break
  }
  while (true) {
    let a = buyInc(2)
    if (!a) break
  }
  while (true) {
    let a = buyInc(1)
    if (!a) break
  }
}

function buyPU(x) {
    if(game.b >= game.puCosts[x-1] && game.pu[x-1] == 0){
      game.b -= game.puCosts[x-1];
      game.pu[x-1] = 1;
    }
}

function prestige() {
    game.b += Math.floor(Math.log2(game.points/100000)*(game.pu[4]==1 ? 2 : 1)+1);//what this formula is wrong it says log2(points*2/100000) instead of log2(points/100000)*2
    game.tb += Math.floor(Math.log2(game.points/100000)*(game.pu[4]==1 ? 2 : 1)+1); //bruq I fixed it
    game.prestiges += 1;
    game.points = 0;
    game.incrementers = 1;
    game.workers = 0;
    game.banks = 0;
    game.derivatives = 0; 
    game.cost1 = 25;
    game.cost2 = 200;
    game.cost3 = 15000;
    game.tickpart = 0;
    game.tickspeed = 50;
}

function toggleAuto(x) {
  switch (x) {
    case 1:
     game.automators[0] = !game.automators[0]
     $("auto1").innerHTML = `Auto: ${game.automators[0] ? "ON" : "OFF"}`;
    break;
    case 2:
      game.automators[1] = !game.automators[1]
      $("auto2").innerHTML = `Auto: ${game.automators[1] ? "ON" : "OFF"}`;
    break;
    case 3:
      game.automators[2] = !game.automators[2]
      $("auto3").innerHTML = `Auto: ${game.automators[2] ? "ON" : "OFF"}`;
    break;
    case 4:
      game.automators[3] = !game.automators[3]
      $("autoprestige").innerHTML = `Auto-Prestige: ${game.automators[3] ? "ON" : "OFF"}`;
    break;
  }
}