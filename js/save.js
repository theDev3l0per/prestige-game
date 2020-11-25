function loopAssign(x, y) {
  
    for (var key in y) {
        if (!y.hasOwnProperty(key)) continue;
        if (typeof y[key] == "object") {
            loopAssign(x[key],y[key])
        }
        else {
            x[key] = y[key]
        }
    }
    return x
}

function save() {
  if (typeof localStorage.game == "undefined") localStorage.game = JSON.stringify(game)
  localStorage.game = JSON.stringify(game)
}

function load() {
  if (typeof localStorage.game != "undefined") JSON.stringify(loopAssign(game, JSON.parse(localStorage.game)))
}

function reset() {
  if (confirm("Are you sure you want to reset?")) {
    game = {};
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
    save();
    load();
  }
}