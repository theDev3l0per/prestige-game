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
      return (this.player.pu[1] ? D(25).times(D(1.1).pow(this.player.incrementers.sub(1))) : D(25).times(D(1.15).pow(D(this.player.incrementers).sub(1))))
      break
    case 2:
      return (this.player.pu[1] ? D(200).times(D(1.1).pow(this.player.workers)) : D(200).times(D(1.15).pow(this.player.workers)))
      break
    case 3:
      return (this.player.pu[1] ? D(15000).times(D(1.1).pow(this.player.banks)) : D(15000).times(D(1.15).pow(this.player.banks)))
      break
    case 4:
      return (this.player.pu[12] ? D(100).times(D(1.1).pow(this.player.derivatives)) : D(100).times(D(1.15).pow(this.player.derivatives)))
      break
    case 5:
      return (this.player.pu[12] ? D(10000).times(D(1.1).pow(this.player.derivatives2)) : D(10000).times(D(1.15).pow(this.player.derivatives2)))
      break 
    case 6:
      return (this.player.pu[12] ? D(1000000).times(D(1.1).pow(this.player.derivatives3)) : D(1000000).times(D(1.15).pow(this.player.derivatives3)))
      break
  } 
    },
    D: function (){return D()},
    player: {
      points: "0",
      tb: "0",
      time: "0",
      incrementers: "1",
      pincrementers: "0",
      workers: "0",
      pworkers: "0",
      banks: "0",
      pbanks: "0",
      derivatives: "0",
      derivatives2: "0",
      derivatives3: "0",
      dpower: "0",
      tickpart: 0,
      tickspeed: 50,
      b: "0",
      tab: 1,
      pu: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      puCosts: [1,3,5,5,10,15,20,30,50,50,500,1000,10000,15000,50000,100000,150000,200000,1000000,100000000],
      automators: [false,false,false,false],
      autoprestigeamt: "1",
      pps: "0",
      prestiges: 0,
      theme: true,
      achs: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      tpoints: "0",
      prestigetime: 0,
      fastestprestige: 42069,
      puBought: 0,
      sachs: [0,0,0,0,0,0,0,0,0,0],
      clicks: 0,
      luck: 0,
      pointsThisPrestige: "0",
      achsCompleted: 0,
      check: 0
    }
  },
  format: function(x){
  if (new Decimal(x).gte("1e9")) {
    let loggers = new Decimal(x).log(10)
    ping = new Decimal(loggers.floor())
    pingery = new Decimal(loggers.sub(ping))
    e = Decimal.pow(10,pingery).times(1000).round().div(1000)
    return e.toString() + "e" + ping.toString()
} else return x.toString()
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

function initiate() {
  $("style").href = app.player.theme ? "style.css" : "dark.css";
}

initiate()

function cost(x) {
  switch(x){
    case 1:
      return (app.player.pu[1] ? D(25).times(D(1.1).pow(D(app.player.incrementers).sub(D(1))).floor()) : D(25).times(D(1.15).pow(D(app.player.incrementers).sub(D(1))).floor()))
      break //because you start with 1 of them
    case 2:
      return (app.player.pu[1] ? D(200).times(D(1.1).pow(app.player.workers).floor()) : D(200).times(D(1.15).pow(app.player.workers).floor()))
      break
    case 3:
      return (app.player.pu[1] ? D(15000).times(D(1.1).pow(app.player.banks).floor()) : D(15000).times(D(1.15).pow(app.player.banks).floor()))
      break
    case 4:
      return app.player.pu[12] ? (new Decimal(100).times(new Decimal(1.1).pow(app.player.derivatives))).floor() : (new Decimal(100).times(new Decimal(1.15).pow(app.player.derivatives))).floor()
      break
    case 5:
      return app.player.pu[12] ? new Decimal(10000).times(new Decimal(1.1).pow(app.player.derivatives2)).floor() : new Decimal(10000).times(new Decimal(1.15).pow(app.player.derivatives2)).floor()
      break 
    case 6:
      return app.player.pu[12] ? new Decimal(1000000).times(new Decimal(1.1).pow(app.player.derivatives3)).times(1e6).round().div(1e6).floor() : new Decimal(1000000).times(new Decimal(1.15).pow(app.player.derivatives3)).times(1e6).round().div(1e6).floor()
      break 
  } 
}
function format(x){
  if (new Decimal(x).gte("1e9")) {
    let loggers = new Decimal(x).log(10)
    ping = new Decimal(loggers.floor())
    pingery = new Decimal(loggers.sub(ping))
    e = Decimal.pow(10,pingery).times(1000).round().div(1000)
    return e.toString() + "e" + ping.toString()
} else return x.toString()
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

  app.player.dpower = D(app.player.dpower).add(D(app.player.derivatives).mul(app.player.pu[14] == 1 ? 2 : 1).times(app.player.pu[19] == 1 ? D(app.player.b).add(1).log(10).add(1) : 1).div(30))
  app.player.derivatives2 = D(app.player.derivatives2).add(D(app.player.derivatives3).div(300).mul(app.player.pu[14] == 1 ? 2 : 1).times(app.player.pu[19] == 1 ? D(app.player.b).add(1).log(10).add(1) : 1))
  app.player.derivatives = D(app.player.derivatives).add(D(app.player.derivatives2).div(300).mul(app.player.pu[14] == 1 ? 2 : 1).times(app.player.pu[19] == 1 ? D(app.player.b).add(1).log(10).add(1) : 1))
  app.player.pps = D(D(app.player.incrementers).times(app.player.pu[0] == 1 ? D(app.player.time).add(1).log(10).add(1).times(2) : 1).times(app.player.pu[7] == 1 ? app.player.pu[11] == 0 ? D(app.player.workers).add(1).root(2).add(1).times(3) : 3 : 1)).add(D(app.player.workers).times(10).times(app.player.pu[0] == 1 ? D(app.player.time).add(1).log(10).add(1).times(2) : 1)).add(D(app.player.banks).times(1000).times(app.player.pu[0] == 1 ? D(app.player.time).add(1).log(10).add(1).times(2) : 1).times(app.player.pu[2] == 1 ? app.player.pu[11] == 0 ? D(app.player.incrementers).add(1).log(10).add(1) : 1 : 1)).times(app.player.pu[14] == 1 ? D(app.player.dpower).add(1).sqrt().add(1) : D(app.player.dpower).add(1).log(10).add(1))
    .add(D(D(app.player.pincrementers).times(app.player.pu[0] == 1 ? D(app.player.time).add(1).log(10).add(1).times(2) : 1).times(app.player.pu[7] == 1 ? app.player.pu[11] == 0 ? D(app.player.pworkers).add(1).root(2).add(1).times(3) : 3 : 1)).add(D(app.player.pworkers).times(10).times(app.player.pu[0] == 1 ? D(app.player.time).add(1).log(10).add(1).times(2) : 1)).add(D(app.player.pbanks).times(1000).times(app.player.pu[0] == 1 ? D(app.player.time).add(1).log(10).add(1).times(2) : 1).times(app.player.pu[2] == 1 ? app.player.pu[11] == 0 ? D(app.player.pincrementers).add(1).log(10).add(1) : 1 : 1)).times(app.player.pu[14] == 1 ? D(app.player.dpower).add(1).sqrt().add(1) : D(app.player.dpower).add(1).log(10).add(1)))
    .times(app.player.pu[11] == 1 ? new Decimal(app.player.incrementers).add(app.player.workers).add(app.player.banks) : 1).mul(app.player.pu[18] == 1 ? app.player.achsCompleted**1.5 : 1) //incrementers*timeMult*workerMult+workers*timeMult+banks*timeMult*increMult whats the formula for the points per second as of rn, with all the upgrades included?
  app.player.points = D(app.player.points).add(D(app.player.pps.div(30)))
  app.player.tpoints = D(app.player.tpoints).add(D(app.player.pps.div(30)))
  app.player.time = D(app.player.time).add(1/30)
  app.player.prestigetime += 1/30;
  app.player.pointsThisPrestige = D(app.player.pointsThisPrestige).max(app.player.points)
  app.player.tb = new Decimal(app.player.tb)
  app.player.banks = new Decimal(app.player.banks)
  app.player.incrementers = new Decimal(app.player.incrementers)
  app.player.derivatives3 = new Decimal(app.player.derivatives3)
  app.player.workers = new Decimal(app.player.workers)
  app.player.b = new Decimal(app.player.b).floor()
  app.player.pbanks = new Decimal(app.player.pbanks).add(app.player.pu[17] ? new Decimal(app.player.incrementers).div(300) : 0)
  app.player.pincrementers = new Decimal(app.player.pincrementers).add(app.player.pu[16] ? new Decimal(app.player.workers).div(300) : 0)
  app.player.pworkers = new Decimal(app.player.pworkers).add(app.player.pu[15] ? new Decimal(app.player.banks).div(300) : 0)
  app.player.puBought = app.player.pu[0]+app.player.pu[1]+app.player.pu[2]+app.player.pu[3]+app.player.pu[4]+app.player.pu[5]+app.player.pu[6]+app.player.pu[7]+app.player.pu[8]+app.player.pu[9]+app.player.pu[10]+app.player.pu[11]+app.player.pu[12]+app.player.pu[13]+app.player.pu[14]+app.player.pu[15]+app.player.pu[16]+app.player.pu[17]+app.player.pu[18]+app.player.pu[19];
  app.player.achsCompleted = app.player.achs[0]+app.player.achs[1]+app.player.achs[2]+app.player.achs[3]+app.player.achs[4]+app.player.achs[5]+app.player.achs[6]+app.player.achs[7]+app.player.achs[8]+app.player.achs[9]+app.player.achs[10]+app.player.achs[11]+app.player.achs[12]+app.player.achs[13]+app.player.achs[14]+app.player.achs[15]+app.player.achs[16]+app.player.achs[17]+app.player.achs[18]+app.player.achs[19]+app.player.achs[20]+app.player.achs[21]+app.player.achs[22]+app.player.achs[23];
  app.player.luck = Math.floor(Math.random()*100000)
  if(D(app.player.points).gt(D(app.player.pointsThisPrestige))) D(app.player.pointsThisPrestige).eq(D(app.player.points))

  
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
  if (app.player.automators[0]+app.player.automators[1]+app.player.automators[2]+app.player.automators[3] >= 3) app.player.achs[11] = 1;
  if (app.player.puBought >= 2) app.player.achs[8] = 1;
  if (app.player.puBought >= 10) app.player.achs[16] = 1;
  if (D(app.player.points).gte(1e12)) app.player.achs[17] = 1;
  if (D(app.player.b).gte(10000)) app.player.achs[20] = 1;
  if (app.player.prestiges >= 100) app.player.achs[21] = 1;
  if (app.player.puBought >= 20) app.player.achs[23] = 1;
  if (app.player.derivatives2 >= 1) app.player.achs[18] = 1;
  if (app.player.pworkers >= 1) app.player.achs[19] = 1;
  if (!app.player.theme) app.player.sachs[0] = 1;
  if (app.player.clicks >= 10) app.player.sachs[5] = 1;
  if (app.player.luck == 42069) app.player.sachs[6] = 1;
  if (D(app.player.autoprestigeamt).toString() == "69") app.player.sachs[7] = 1;
  if (D(app.player.banks).gte(D(app.player.workers)) && D(app.player.workers).gte(D(app.player.incrementers))) app.player.sachs[8] = 1;
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
    var b = app.player.pu[10] ? D(app.player.points).div(100000).sqrt().times(app.player.pu[4] + 1).floor() : D(app.player.points).div(100000).log(2).times(app.player.pu[4] + 1).add(1);
    if (app.player.pu[19] == 1){b=b.times(100)}
    b=b.floor()
    if(D(b).gte(app.player.autoprestigeamt)){
      prestige();
    }
  } 
}

function buyInc(x) {
  var ret = false
  switch (x) {
    case 1:
    if (D(app.player.points).gte(app.cost(1))){
      if (app.player.pu[13]==0) app.player.points = D(app.player.points).sub(app.cost(1))
      app.player.incrementers = D(app.player.incrementers).add(1)
      ret = true
    }
    break;
    case 2:
    if (D(app.player.points).gte(app.cost(2))){
      if (app.player.pu[13]==0) app.player.points = D(app.player.points).sub(app.cost(2));
      app.player.workers = D(app.player.workers).add(1)
      ret = true
    }
    break;
    case 3:
    if (D(app.player.points).gte(app.cost(3))){
      if (app.player.pu[13]==0) app.player.points = D(app.player.points).sub(app.cost(3));
      app.player.banks = D(app.player.banks).add(1);
      ret = true
    }
    break;
    case 4:
      if (D(app.player.b).gte(app.cost(4))) {
      app.player.b = D(app.player.b).sub(app.cost(4));
      app.player.derivatives = D(app.player.derivatives).add(1) 
      }
    break;
    case 5:
      if (D(app.player.b).gte(app.cost(5))) {
      app.player.b = D(app.player.b).sub(app.cost(5));
      app.player.derivatives2 = D(app.player.derivatives2).add(1) 
      }
    break;
    case 6:
      if (D(app.player.b).gte(app.cost(6))) {
      app.player.b = D(app.player.b).sub(app.cost(6));
      app.player.derivatives3 = D(app.player.derivatives3).add(1) 
      }
    break;
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
    }
}

function prestige() {
  if(D(app.player.points).gte(100000)){
    if(app.player.prestigetime < app.player.fastestprestige) {app.player.fastestprestige = app.player.prestigetime}
    app.player.prestigetime = 0;
    // D(app.player.pointsThisPrestige).eq(0);
    var b = app.player.pu[10] ? D(app.player.points).div(100000).sqrt().times(app.player.pu[4] + 1).floor() : D(app.player.points).div(100000).log(2).times(app.player.pu[4] + 1).add(1);
    if (app.player.pu[19] == 1){b=b.times(100)}
    b=b.floor()
    app.player.achs[14] |= b.gte(20);
    app.player.b = app.player.b.add(b);//what this formula is wrong it says log2(points*2/100000) instead of log2(points/100000)*2
    app.player.tb = app.player.tb.add(b); //bruq I fixed it
    app.player.achs[7] |= D(app.player.incrementers).lt(2);
    app.player.achs[22] |= D(app.player.incrementers).lt(2) && D(app.player.workers).lt(1) && D(app.player.banks).lt(1);
    app.player.achs[10] |= D(app.player.banks).lt(1);
    app.player.sachs[9] |= D(app.player.banks).lt(1) && D(app.player.workers).lt(1);
    app.player.prestiges += 1;
    app.player.points = D(0);
    app.player.incrementers = "1";
    app.player.workers = "0";
    app.player.banks = "0";
    app.player.pincrementers = "0";
    app.player.pworkers = "0";
    app.player.pbanks = "0";
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

function newscheck () {
  if($("news").innerHTML == "Click this to obtain a secret achievement."){app.player.sachs[4]=1};
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
    case "b":
      prestige()
      break  
    case "a":
      if(app.player.pu[3] == 1){app.player.automators[0] = !app.player.automators[0]}
      if(app.player.pu[5] == 1){app.player.automators[1] = !app.player.automators[1]}
      if(app.player.pu[6] == 1){app.player.automators[2] = !app.player.automators[2]}
      break
    case "f":
      app.player.sachs[1] = 1;
  }
});