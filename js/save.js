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
  if (typeof localStorage.game == "undefined") localStorage.game = JSON.stringify(app.player)
  localStorage.game = JSON.stringify(app.player)
}

function load() {
  if (typeof localStorage.game != "undefined") app.player = loopAssign(app.player, JSON.parse(localStorage.game))
}

function importSave() {
  x = window.prompt("Please enter your save here")
  if (x=="your save here") app.player.sachs[2]=1
  if (typeof localStorage.game != "undefined") app.player = loopAssign(app.player, JSON.parse(window.atob(x)))
  save()
}

function exportSave() {
   navigator.clipboard.writeText(window.btoa(JSON.stringify(app.player)))
  
  window.confirm("you save code has been copied to your clipboard")
}

function reset() {
  if (confirm("Are you sure you want to reset?")) {
    app.player = {
      points: "0",
      tb: "0",
      time: 0,
      incrementers: "1",
      workers: "0",
      banks: "0",
      dpower: "0",
      tickpart: 0,
      tickspeed: 50,
      b: "0",
      tab: 1,
      pu: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      puCosts: [1,3,5,5,10,15,20,30,50,50,500,1000,10000,15000,50000,100000,150000,200000,1000000,100000000],
      automators: [false,false,false,false],
      autoprestigeamt: 1,
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
      achsCompleted: 0
    };
    save();
    load();
  }
}