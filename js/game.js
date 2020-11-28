const $ = id => document.getElementById(id)
const c = id => document.getElementsByClassName(id)
const t = id => document.getElementsByTagName(id)
const D = id => new Decimal(id)

const app = new Vue({
  el: '#app',
  data: {
    cost: function(x){
      switch(x){
    case 1:
      return (this.player.pu[1] == 1 ? D(25).times(D(1.1).pow(this.player.incrementers.sub(1))) : D(25).times(D(1.15).pow(D(this.player.incrementers).sub(1))))
      break
    case 2:
      return (this.player.pu[1] == 1 ? D(200).times(D(1.1).pow(this.player.workers)) : D(200).times(D(1.15).pow(this.player.workers)))
      break
    case 3:
      return (this.player.pu[1] == 1 ? D(15000).times(D(1.1).pow(this.player.banks)) : D(15000).times(D(1.15).pow(this.player.banks)))
      break
    case 4:
      return (this.player.pu[1000] == 1 ? D(100).times(D(1.1).pow(this.player.derivatives)) : D(100).times(D(1.15).pow(this.player.derivatives)))
      break 
  } 
    },
    D: function (){return D()},
    player: {
      points: "0",
      tb: "0",
      time: "0",
      incrementers: "1",
      workers: "0",
      banks: "0",
      dpower: "0",
      tickpart: 0,
      tickspeed: 50,
      b: "0",
      tab: 1,
      pu: [0,0,0,0,0,0,0,0,0,0],
      puCosts: [1,3,5,5,10,15,20,30,50,50],
      automators: [false,false,false,false],
      autoprestigeamt: 1,
      pps: "0",
      prestiges: 0,
      theme: true,
      achs: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      tpoints: "0",
      prestigetime: 0,
      fastestprestige: 42069,
      puBought: 0
    }
  }
})

console.log("What are you doing here in the console?");
$("style").href = app.player.theme ? "style.css" : "dark.css";

// so we are going to save the  in an object.

function showElement(element) { // shows element
  $(element).style.display = "inline";
}

function hideElement(element) { // hides element
  $(element).style.display = "none";
} 

function init() { // only run this once 
  // stopLookingInTheCodeHacker();
}

init();

function cost(x) {
  switch(x){
    case 1:
      return (app.player.pu[1] == 1 ? D(25).times(D(1.1).pow(D(app.player.incrementers).sub(D(1))).floor()) : D(25).times(D(1.15).pow(D(app.player.incrementers).sub(D(1))).floor()))
      break //because you start with 1 of them
    case 2:
      return (app.player.pu[1] == 1 ? D(200).times(D(1.1).pow(app.player.workers).floor()) : D(200).times(D(1.15).pow(app.player.workers).floor()))
      break
    case 3:
      return (app.player.pu[1] == 1 ? D(15000).times(D(1.1).pow(app.player.banks).floor()) : D(15000).times(D(1.15).pow(app.player.banks).floor()))
      break
    case 4:
      return (app.player.pu[1000] == 1 ? D(100).times(D(1.1).pow(app.player.derivatives).floor()) : D(100).times(D(1.15).pow(app.player.derivatives).floor()))
      break 
  } 
}

var mainGameLoop = window.setInterval(function() { // runs the loop
  app.player.tickpart += 50
  if (app.player.tickpart>=app.player.tickspeed) {
    app.player.tickpart -= app.player.tickspeed
    loop();
  }
}, (100/3));

function loop() { // don't change this stuff unless you know what you're doing
// got it, ok get started on pps, and ill fix the game loop while you do that, based on that.
  app.player.dpower = D(app.player.dpower).add(D(app.player.derivatives).div(30))
  app.player.pps = D(D(app.player.incrementers).times(app.player.pu[0] == 1 ? D(app.player.time).add(1).log(10).add(1).times(2) : 1).times(app.player.pu[7] == 1 ? D(app.player.workers).add(1).root(2).add(1).times(3) : 1)).add(D(app.player.workers).times(10).times(app.player.pu[0] == 1 ? D(app.player.time).add(1).log(10).add(1).times(2) : 1)).add(D(app.player.banks).times(1000).times(app.player.pu[0] == 1 ? D(app.player.time).add(1).log(10).add(1).times(2) : 1).times(app.player.pu[2] == 1 ? D(app.player.incrementers).add(1).log(10).add(1) : 1)).times(D(app.player.dpower).add(1).log(10).add(1)) //incrementers*timeMult*workerMult+workers*timeMult+banks*timeMult*increMult whats the formula for the points per second as of rn, with all the upgrades included?
  app.player.points = D(app.player.points).add(D(app.player.pps.div(30)))
  app.player.tpoints = D(app.player.tpoints).add(D(app.player.pps))
  app.player.time = D(app.player.time).add(1/30)
  app.player.prestigetime += 1/30;
  app.player.tb = new Decimal(app.player.tb)
  app.player.banks = new Decimal(app.player.banks)
  app.player.incrementers = new Decimal(app.player.incrementers)
  app.player.workers = new Decimal(app.player.workers)
  app.player.b = new Decimal(app.player.b)
  
  const conditions = [
    "D(app.player.incrementers).gte(2)",
    "D(app.player.points).gte(100)",
    "D(app.player.workers).gte(1)",
    "D(app.player.banks).gte(1)",
    "D(app.player.incrementers).add(app.player.workers).add(app.player.banks).gte(30)",
    "D(app.player.points).gte(100000)",
    
  ]
  for(const i in conditions) {
    //if (eval(conditions[i])) app.player.achs[i] = 1
  }
  if (D(app.player.incrementers).gte(2)) app.player.achs[0] = 1;
  if (D(app.player.points).gte(100)) app.player.achs[1] = 1;
  if (D(app.player.workers).gte(1)) app.player.achs[2] = 1;
  if (D(app.player.banks).gte(1)) app.player.achs[3] = 1;
  if (D(app.player.incrementers).add(app.player.workers).add(app.player.banks).gte(30)) app.player.achs[4] = 1;
  if (D(app.player.points).gte(100000)) app.player.achs[5] = 1; // you put the data in
  if (D(app.player.pps).gte(10000)) app.player.achs[6] = 1;
  if (D(app.player.points).gte(1000000)) app.player.achs[9] = 1;
  if (D(app.player.derivatives).gte(1)) app.player.achs[13] = 1;
  if (D(app.player.points).gte(1000000000)) app.player.achs[15] = 1;
  if (app.player.pu[8] == 1) app.player.achs[12] = 1;
  if (app.player.automators[0] == true && app.player.automators[1] == true && app.player.automators[2] == true) app.player.achs[11] = 1;
  if (app.player.puBought >= 2) app.player.achs[8] = 1;
  if (app.player.automators[2]){
    var ret = false;
    buyInc(3)
  }
  if (app.player.automators[1]){
    var ret = false;
    buyInc(2)
  }
  if (app.player.automators[0]){
    var ret = false;
    buyInc(1)
  }
  if (app.player.automators[3]){
    if(D.floor(D.log(app.player.points/100000,2)*(app.player.pu[4]==1 ? 2 : 1)).plus(1).gte( app.player.autoprestigeamt)){
      prestige();
    }
  } 
}

function buyInc(x) {
  var ret = false
  switch (x) {
    case 1:
    if (D(app.player.points).gte(cost(1))){
      app.player.points = D(app.player.points).sub(cost(1))
      app.player.incrementers = D(app.player.incrementers).add(1)
      ret = true
    }
    break;
    case 2:
    if (D(app.player.points).gte(cost(2))){
      app.player.points = D(app.player.points).sub(cost(2));
      app.player.workers = D(app.player.workers).add(1)
      ret = true
    }
    break;
    case 3:
    if (D(app.player.points).gte(cost(3))){
      app.player.points = D(app.player.points).sub(cost(3));
      app.player.banks = D(app.player.banks).add(1);
      ret = true
    }
    break;
    case 4:
      if (D(app.player.b).gte(cost(4))) {
      app.player.b = D(app.player.b).sub(cost(4));
      app.player.derivatives = D(app.player.deriviatives).add(1) 
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
    if(D(app.player.b).gte(app.player.puCosts[x-1]) && app.player.pu[x-1] == 0){
      app.player.b = D(app.player.b).sub(app.player.puCosts[x-1]);
      app.player.pu[x-1] = 1;
      app.player.puBought += 1;
    }
}

function prestige() {
  if(D(app.player.points).gte(100000)){
    if(app.player.prestigetime < app.player.fastestprestige){app.player.fastestprestige = app.player.prestigetime}
    app.player.prestigetime = 0;
    if ((D(app.player.points).div(100000).log(2).times(app.player.pu[4]==1 ? 2 : 1).add(1).floor().gte(20))) app.player.achs[14] = 1;
    app.player.b = app.player.b.add(app.player.points.div(100000).log(2).times(app.player.pu[4]==1 ? 2 : 1).add(1).floor());//what this formula is wrong it says log2(points*2/100000) instead of log2(points/100000)*2
    app.player.tb = D(app.player.tb).add(D(app.player.points).div(100000).log(2).times(app.player.pu[4]==1 ? 2 : 1).add(1).floor()); //bruq I fixed it
    if (D(app.player.incrementers).lt(2)) app.player.achs[7] = 1;
    if (D(app.player.banks).lt(1)) app.player.achs[10] = 1;
    app.player.prestiges += 1;
    app.player.points = "0";
    app.player.incrementers = "1";
    app.player.workers = "0";
    app.player.banks = "0";
    app.player.tickpart = 0;
    app.player.tickspeed = 50;
  }
}

function toggleAuto(x) {
  switch (x) {
    case 1:
     app.player.automators[0] = !app.player.automators[0]
    break;
    case 2:
      app.player.automators[1] = !app.player.automators[1]
    break;
    case 3:
      app.player.automators[2] = !app.player.automators[2]
    break;
    case 4:
      app.player.automators[3] = !app.player.automators[3]
    break;
  }
}

function switchTheme () {
  app.player.theme = !app.player.theme;
  $("style").href = app.player.theme ? "style.css" : "dark.css";
}

document.addEventListener("keydown", function onEvent(event) {
  switch (event.key) {
    case "m": // max all
      if(D(app.player.tb).gt(0)){maxAll()}
      break
    case "1":
      buyInc(1)
      break
    case "2":
      buyInc(2)
      break
    case "3":
      buyInc(3)
      break
    case "4":
      buyInc(4)
      break
    case "p":
      prestige()
      break
    case "a":
      if(app.player.pu[3] == 1){app.player.automators[0] = !app.player.automators[0]}
      if(app.player.pu[5] == 1){app.player.automators[1] = !app.player.automators[1]}
      if(app.player.pu[6] == 1){app.player.automators[2] = !app.player.automators[2]}
  }
});