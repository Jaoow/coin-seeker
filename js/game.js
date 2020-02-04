// CRIADOR DE FASES
var LEVELS = [
  [
    "                                                                                                              ",
    "                                             xxxxxxx      xxxxxxx",
    "                                             x!!!!!x      x!!!!!x",
    "                                             x!!!!!x      x!!!!!xxxxx",
    "                                             x!!!!!x      x!!!!!!!!!xxxxxxxxxxxxxx",
    "                                             x!!!!!x      x!!!!!!!!!!!!!!!!!!!!!!x",
    "                                             x!!!!!x      x!!!!!xxxxxxxxxxxxxxxx!x",
    "                                             x    vx      x    v               x!x",
    "                                             x     x      x                    x!x",
    "                                             xv    x      xv                   x!x",
    "                                     xxxxxxxxx     xxxxxxxx                    xvxxx",
    "                                                                                   x",
    "                                                                                   x",
    "                                                                                   x",
    "                                                                                   x",
    "                                                                                   x",
    "                                               o o          o o                    x",
    "                                                                                   x",
    "                                                                                   x",
    "                    o         g      xxxxxxxxx     xxxxxxxx     xxxxxxxxxxxxxx     x",
    "                  o   o      ggg     x       x!!!!!x      x!!!!!x            x     x",
    "                             ggg     x       x!!!!!x      x!!!!!x            xx    x",
    "  @                           x      x       x!!!!!x      x!!!!!x            x     x",
    "xxxxxxxxxxxxxxxxxx     xxxxxxxxxxxxxxx       x!!!!!x      x!!!!!x            x     x",
    "                 x     x                     x!!!!!x      x!!!!!x            x    xx",
    "                 x     x                     x!!!!!x      x!!!!!x            x     x",
    "                 x  !!!x                     x!!!!!x      x!!!!!x            xo    x",
    "                 x!!!!!x                     xxxxxxx      xxxxxxx            xx    x",
    "                 x!!!!!x                                                     x     x",
    "                 x!!!!!x                                                     x    ox",
    "                 xxxxxxx                                                     x    xx",
    "                                                                             x     x",
    "                                                                             xo    x",
    "                                                     xxxxx                   xx    x",
    "                                             xxxxxxxxxvxvxxxxxxxxxxxxxxxxxxxxx     x",
    "                                             x      v     v                        x",
    "                                             x                                     x",
    "                                             x                                     x",
    "                                             x    o         o                      x",
    "                                             x    x         x              o       x",
    "                                             x                            xxx      x",
    "                                             x!!!!!!!!!!!!!!!!!!!!x       xxx   x!!x",
    "                                             x!!!!!!!!!!!!!!!!!!!!xxxxxxxxxxxxxxxxxx",
    "                                             xxxxxxxxxxxxxxxxxxxxxx"
  ],
  [
    "                                                                                ",
    "                                                                                ",
    "                                                                                ",
    "                                                                                ",
    "                                                                                ",
    "                                                                                ",
    "                                                                  xxx           ",
    "                                                   xx      xx    xx!xx          ",
    "                                    o o      xx                  x!!!x          ",
    "                                                                 xx!xx          ",
    "                                   xxxxx                          xvx           ",
    "                                                                            xx  ",
    "  xx                                      o o                                x  ",
    "  x                     o                                                    x  ",
    "  x                                      xxxxx                             o x  ",
    "  x          xxxx       o                                                    x  ",
    "  x  @       x  x                                                xxxxx       x  ",
    "  xxxxxxxxxxxx  xxxxxxxxxxxxxxx   xxxxxxxxxxxxxxxxxxxx     xxxxxxx   xxxxxxxxx  ",
    "                              x   x                  x     x                    ",
    "                              x!!!x                  x!!!!!x                    ",
    "                              x!!!x                  x!!!!!x                    ",
    "                              xxxxx                  xxxxxxx                    ",
    "                                                                                ",
    "                                                                                "
  ],
  [
    "                                      x!!x                        xxxxxxx                                    x!x  ",
    "                                      x!!x                     xxxx     xxxx                                 x!x  ",
    "                                      x!!xxxxxxxxxx           xx           xx                                x!x  ",
    "                                      xx!!!!!!!!!!xx         xx             xx                               x!x  ",
    "                                       xxxxxxxxxx!!x         x                                    o   o   o  x!x  ",
    "                                                xx!x         x     o   o                                    xx!x  ",
    "                                                 x!x         x                                xxxxxxxxxxxxxxx!!x  ",
    "                                                 xvx         x     x   x                        !!!!!!!!!!!!!!xx  ",
    "                                                             xx  |   |   |  xx            xxxxxxxxxxxxxxxxxxxxx   ",
    "                                                              xx!!!!!!!!!!!xx            v                        ",
    "                                                               xxxx!!!!!xxxx                                      ",
    "                                               x     x            xxxxxxx        xxx         xxx                  ",
    "                                               x     x                           x x         x x                  ",
    "                                               x     x                             x         x                    ",
    "                                               x     x                             xx        x                    ",
    "                                               xx    x                             x         x                    ",
    "                                               x     x      o  o     x   x         x         x                    ",
    "               xxxxxxx        xxx   xxx        x     x               x   x         x         x                    ",
    "              xx     xx         x   x          x     x     xxxxxx    x   x   xxxxxxxxx       x                    ",
    "             xx       xx        x o x          x    xx               x   x   x               x                    ",
    "     @       x         x        x   x          x     x               x   x   x               x                    ",
    "    xxx      x         x        x   x          x     x               x   xxxxx   xxxxxx      x                    ",
    "    x x      x         x       xx o xx         x     x               x     o     x x         x                    ",
    "!!!!x x!!!!!!x         x!!!!!!xx     xx!!!!!!!!xx    x!!!!!!!!!!     x     =     x x         x                    ",
    "!!!!x x!!!!!!x         x!!!!!xx       xxxxxxxxxx     x!!!!!!!xx!     xxxxxxxxxxxxx xx  o o  xx                    ",
    "!!!!x x!!!!!!x         x!!!!!x    o                 xx!!!!!!xx !                    xx     xx                     ",
    "!!!!x x!!!!!!x         x!!!!!x                     xx!!!!!!xx  !                     xxxxxxx                      ",
    "!!!!x x!!!!!!x         x!!!!!xx       xxxxxxxxxxxxxx!!!!!!xx   !                                                  ",
    "!!!!x x!!!!!!x         x!!!!!!xxxxxxxxx!!!!!!!!!!!!!!!!!!xx    !                                                  ",
    "!!!!x x!!!!!!x         x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xx     !                                                  ",
    "xxxxx xxxxxxxx         xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx     !                                                  "
  ],
  [
    "                                                                                                              ",
    "                                                                                                              ",
    "                                                                                                              ",
    "                                                                                                              ",
    "                                                                                                              ",
    "                                        o                                                                     ",
    "                                                                                                              ",
    "                                        x                                                                     ",
    "                                        x                                                                     ",
    "                                        x                                                                     ",
    "                                        x                                                                     ",
    "                                       xxx                                                                    ",
    "                                       x x                 !!!        !!!  xxx                                ",
    "                                       x x                 !x!        !x!                                     ",
    "                                     xxx xxx                x          x                                      ",
    "                                      x   x                 x   oooo   x       xxx                            ",
    "                                      x   x                 x          x      x!!!x                           ",
    "                                      x   x                 xxxxxxxxxxxx       xxx                            ",
    "                                     xx   xx      x   x      x                                                ",
    "                                      x   xxxxxxxxx   xxxxxxxx              x x                               ",
    "                                      x   x           x                    x!!!x                              ",
    "                                      x   x           x                     xxx                               ",
    "                                     xx   xx          x                                                       ",
    "                                      x   xm m m      x            xxx                                        ",
    "                                      x   x           x           x!!!x                                       ",
    "                                      x   x      m m mx     o      xxx       xxx                              ",
    "                                     xx   xx          x                     x!!!x                             ",
    "                              o   o   x   x           x     x                xxv        xxx                   ",
    "                                      x   x           x              x                 x!!!x                  ",
    "                             xxx xxx xxx xxx     o o  x!!!!!!!!!!!!!!x                   vx                   ",
    "                             x xxx x x xxx x          x!!!!!!!!!!!!!!x                                        ",
    "                             x             x   xxxxxxxxxxxxxxxxxxxxxxx                                        ",
    "                             xx           xx                                         xxx                      ",
    "  xxx                         x     x     x                                         x!!!x                xxx  ",
    "  x x                         x    xxx    x                                          xxx                 x x  ",
    "  x                           x    xxx    xxxxxxx                        xxxxx                             x  ",
    "  x                           x           x                              x   x                             x  ",
    "  x                           xx          x                              x x x                             x  ",
    "  x                                       x       |xxxx|    |xxxx|     xxx xxx                             x  ",
    "  x                xxx             o o    x                              x         xxx                     x  ",
    "  x               xxxxx       xx          x                             xxx       x!!!x          x         x  ",
    "  x               oxxxo       x    xxx    x                             x x        xxx          xxx        x  ",
    "  x                xxx        xxxxxxxxxxxxx  x oo x    x oo x    x oo  xx xx                    xxx        x  ",
    "  x      @          x         x           x!!x    x!!!!x    x!!!!x    xx   xx                    x         x  ",
    "  xxxxxxxxxxxxxxxxxxxxxxxxxxxxx           xxxxxxxxxxxxxxxxxxxxxxxxxxxxx     xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  ",
    "                                                                                                              ",
    "                                                                                                              "
  ],
  [
    "                                                                                                  xxx x       ",
    "                                                                                                      x       ",
    "                                                                                                  xxxxx       ",
    "                                                                                                  x           ",
    "                                                                                                  x xxx       ",
    "                          o                                                                       x x x       ",
    "                                                                                             o o oxxx x       ",
    "                   xxx                                                                                x       ",
    "       !  o  !                                                xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx       ",
    "       x     x                                                x   x x   x x   x x   x x   x x   x x           ",
    "       x= o  x            x                                   xxx x xxx x xxx x xxx x xxx x xxx x xxxxx       ",
    "       x     x                                                  x x   x x   x x   x x   x x   x x     x       ",
    "       !  o  !            o                                  xxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxxxx       ",
    "                                                                                                              ",
    "          o              xxx                              xx                                                  ",
    "                                                                                                              ",
    "                                                                                                              ",
    "                                                      xx                                                      ",
    "                   xxx         xxx                                                                            ",
    "                                                                                                              ",
    "                          o                                                     x      x                      ",
    "                                                          xx     xx                                           ",
    "             xxx         xxx         xxx                                 x                  x                 ",
    "                                                                                                              ",
    "                                                                 ||                                           ",
    "  xxxxxxxxxxx                                                                                                 ",
    "  x         x o xxxxxxxxx o xxxxxxxxx o xx                                                x                   ",
    "  x         x   x       x   x       x   x                 ||                  x     x                         ",
    "  x  @      xxxxx   o   xxxxx   o   xxxxx                                                                     ",
    "  xxxxxxx                                     xxxxx       xx     xx     xxx                                   ",
    "        x=                  =                =x   x                     xxx                                   ",
    "        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   x!!!!!!!!!!!!!!!!!!!!!xxx!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    "                                                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "                                                                                                              "
  ]
];

const game_content = document.querySelector("#game-content");

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(other) {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  times(scale) {
    return new Vector(this.x * scale, this.y * scale);
  }
}

class Sound {
  constructor(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.volume = 0.0;
    return this.sound;
  }

  play() {
    this.sound.play().then(r => r.play());
  }
}

const coinSound = new Sound("src/audios/collect_coin.wav");
const winSound = new Sound("src/audios/win.wav");
const deathSound = new Sound("src/audios/death_2.wav");
const finishSound = new Sound("src/audios/finish_game.wav");
finishSound.volume = 0.5;

// MoveX
const playerXSpeed = 10;

// Move Y
const gravity = 30;

const jumpSpeed = 17;

class Player {
  constructor(pos) {
    this.pos = pos.plus(new Vector(0, -0.5));
    this.size = new Vector(0.6, 1.2);
    this.speed = new Vector(0, 0);
    this.coin = 0;
    this.coinInLevel = 0;
    this.deaths = 0;
  }

  moveX(step, level, keys) {
    this.speed.x = 0;
    if (keys.left) this.speed.x -= playerXSpeed;
    if (keys.right) this.speed.x += playerXSpeed;
    var motion = new Vector(this.speed.x * step, 0);
    var newPos = this.pos.plus(motion);
    var obstacle = level.obstacleAt(newPos, this.size);
    if (obstacle) level.playerTouched(level, obstacle);
    else this.pos = newPos;
  }

  moveY(step, level, keys) {
    this.speed.y += step * gravity;
    var motion = new Vector(0, this.speed.y * step);
    var newPos = this.pos.plus(motion);
    var obstacle = level.obstacleAt(newPos, this.size);
    if (obstacle) {
      level.playerTouched(level, obstacle);
      if (keys.up && this.speed.y > 0) this.speed.y = -jumpSpeed;
      else this.speed.y = 0;
    } else {
      this.pos = newPos;
    }
  }

  act(step, level, keys) {
    this.moveX(step, level, keys);
    this.moveY(step, level, keys);
    var otherActor = level.actorAt(this);
    if (otherActor) level.playerTouched(level, otherActor.type, otherActor);
    // Animação de morte
    if (level.status === "lost") {
      this.pos.y += step;
      this.size.y -= step;
    }
  }

  addDeath() {
    this.deaths += 0;
  }

  addCoin() {
    this.coin += 1;
    this.coinInLevel += 1;
    this.updateScore();
  }

  removeCoinInLevel() {
    this.coin -= this.coinInLevel;
    this.coinInLevel = 0;
    this.updateScore();
  }

  newLevel() {
    this.coinInLevel = 0;
    this.updateScore();
  }

  updateScore() {
    document.querySelector("#coin").innerHTML = this.coin + "c";
  }
}

Player.prototype.type = "player";
// Player.prototype.coin = 0;
// Player.prototype.coinInLevel = 0;
// Player.prototype.deaths = 0;

class Lava {
  constructor(pos, ch) {
    this.pos = pos;
    this.size = new Vector(1, 1);
    if (ch === "=") {
      this.speed = new Vector(2, 0);
      this.type = "lava";
    } else if (ch === "|") {
      this.speed = new Vector(0, 2);
      this.type = "lava";
    } else if (ch === "v") {
      this.type = "lavag";
      this.speed = new Vector(0, 3);
      this.repeatPos = pos;
    }
  }

  act(step, level) {
    var newPos = this.pos.plus(this.speed.times(step));
    if (!level.obstacleAt(newPos, this.size)) this.pos = newPos;
    else if (this.repeatPos) this.pos = this.repeatPos;
    else this.speed = this.speed.times(-1);
  }
}

class Mob {
  repeatPos;

  constructor(pos, ch) {
    this.pos = pos;
    this.size = new Vector(1, 1);
    if (ch === "m") this.speed = new Vector(2, 0);
  }

  act(step, level) {
    const newPos = this.pos.plus(this.speed.times(step));
    if (!level.obstacleAt(newPos, this.size)) this.pos = newPos;
    else if (this.repeatPos) this.pos = this.repeatPos;
    else this.speed = this.speed.times(-1);
  }
}

Mob.prototype.type = "mob";

// Coin
const wobbleSpeed = 8;
const wobbleDist = 0.07;

class Coin {
  constructor(pos) {
    this.basePos = this.pos = pos;
    this.size = new Vector(1, 1);
    this.wobble = Math.random() * Math.PI * 2;
  }

  act(step) {
    // Balanço do coin desativado!

    this.wobble += step * wobbleSpeed;
    const wobblePos = Math.sin(this.wobble) * wobbleDist;
    this.pos = this.basePos.plus(new Vector(0, wobblePos));
  }
}

Coin.prototype.type = "coin";

// Level
const maxStep = 0.05;

const actorchars = {
  "@": Player,
  o: Coin,
  "=": Lava,
  "|": Lava,
  v: Lava,
  m: Mob
};

class Level {
  constructor() {
    this.number = null;
    this.width = null;
    this.height = null;
    this.grid = [];
    this.actors = [];
    this.player = null;
    this.status = false;
  }
  
  load(plan) {
    this.number = LEVELS.indexOf(plan) + 1;
    this.width = plan[0].length;
    this.height = plan.length;
    this.grid = [];
    this.actors = [];
    for (var y = 0; y < this.height; y++) {
      var line = plan[y],
        gridLine = [];
      for (var x = 0; x < this.width; x++) {
        var ch = line[x],
          fieldType = null;
        var Actor = actorchars[ch];
        if (Actor) this.actors.push(new Actor(new Vector(x, y), ch));
        else if (ch === "x") fieldType = "wall";
        else if (ch === "g") fieldType = "grass";
        else if (ch === "!") fieldType = "lava";
        else if (ch === "|") fieldType = "lava";
        else if (ch === "=") fieldType = "lava";
        else if (ch === "v") fieldType = "lavag";
        else if (ch === "m") fieldType = "mob";
        gridLine.push(fieldType);
      }
      this.grid.push(gridLine);
    }
    this.player = this.actors.filter(function(actor) {
      return actor.type === "player";
    })[0];
    this.status = this.finishDelay = null;
  }

  isFinished() {
    return this.status != null && this.finishDelay < 0;
  }

  obstacleAt(pos, size) {
    const xStart = Math.floor(pos.x);
    const xEnd = Math.ceil(pos.x + size.x);
    const yStart = Math.floor(pos.y);
    const yEnd = Math.ceil(pos.y + size.y);
    if (xStart < 0 || xEnd > this.width || yStart < 0) return "wall";
    if (yEnd > this.height) return "lava";
    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        const fieldType = this.grid[y][x];
        if (fieldType) return fieldType;
      }
    }
  }

  actorAt(actor) {
    for (let i = 0; i < this.actors.length; i++) {
      const other = this.actors[i];
      if (
        other !== actor &&
        actor.pos.x + actor.size.x > other.pos.x &&
        actor.pos.x < other.pos.x + other.size.x &&
        actor.pos.y + actor.size.y > other.pos.y &&
        actor.pos.y < other.pos.y + other.size.y
      )
        return other;
    }
  }

  animate(step, keys) {
    if (this.status != null) this.finishDelay -= step;
    while (step > 0) {
      var thisStep = Math.min(step, maxStep);
      this.actors.forEach(function(actor) {
        if (actor.type !== "coin") actor.act(thisStep, this, keys);
      }, this);
      step -= thisStep;
    }
  }

  playerTouched(level, type, actor) {
    if (
      (type === "lava" || type === "mob" || actor instanceof Lava) &&
      this.status == null
    ) {
      this.status = "lost";
      deathSound.cloneNode(true).play();
      this.finishDelay = 1;
    } else if (type === "coin" && level.status !== "lost") {
      this.actors = this.actors.filter(function(other) {
        return other !== actor;
      });
      Player.prototype.addCoin();
      if (
        !this.actors.some(function(actor) {
          return actor.type === "coin";
        })
      ) {
        winSound.cloneNode(true).play();
        this.status = "won";
        this.finishDelay = 1;
      } else {
        coinSound.cloneNode(true).play();
      }
    }
  }
}

function element(name, className) {
  var elem = document.createElement(name);
  if (className) elem.className = className;
  return elem;
}

let scale;

// Coins
const playerCoins = 0;

class DOMDisplay {
  constructor(parent, level) {
    clearContent(game_content);
    this.level = level;
    this.drawCounters();
    this.wrap = game_content.appendChild(element("div", "game"));
    this.wrap.appendChild(this.drawBackground());
    this.actorLayer = null;
    this.drawFrame();
  }

  drawBackground() {
    var table = element("table", "background");
    table.style.width = this.level.width * scale + "px";
    table.style.height = this.level.height * scale + "px";
    this.level.grid.forEach(function(row) {
      var rowElement = table.appendChild(element("tr"));
      rowElement.style.height = scale + "px";
      row.forEach(function(type) {
        rowElement.appendChild(element("td", type));
      });
    });
    return table;
  }

  drawCounters() {
    var levelCount = element("span", "count");
    var coinCount = element("span", "count");

    levelCount.setAttribute("id", "level");
    coinCount.setAttribute("id", "coin");

    levelCount.appendChild(document.createTextNode(this.level.number));
    coinCount.appendChild(document.createTextNode("0c"));

    game_content.appendChild(levelCount);
    game_content.appendChild(coinCount);
  }

  drawActors() {
    var wrap = element("div");
    this.level.actors.forEach(function(actor) {
      var rect = wrap.appendChild(element("div", "actor " + actor.type));
      rect.style.width = actor.size.x * scale + "px";
      rect.style.height = actor.size.y * scale + "px";
      rect.style.left = actor.pos.x * scale + "px";
      rect.style.top = actor.pos.y * scale + "px";
    });
    return wrap;
  }

  drawFrame() {
    if (this.actorLayer) this.wrap.removeChild(this.actorLayer);
    this.actorLayer = this.wrap.appendChild(this.drawActors());
    this.wrap.className = "game " + (this.level.status || "");
    this.scrollPlayerIntoView();
  }

  scrollPlayerIntoView() {
    var width = this.wrap.clientWidth;
    var height = this.wrap.clientHeight;
    var margin = width / 4;
    var left = this.wrap.scrollLeft,
      right = left + width;
    var top = this.wrap.scrollTop,
      bottom = top + height;
    var player = this.level.player;
    var center = player.pos.plus(player.size.times(0.5)).times(scale);
    if (center.x < left + margin) this.wrap.scrollLeft = center.x - margin;
    else if (center.x > right - margin)
      this.wrap.scrollLeft = center.x + margin - width;
    if (center.y < top + margin) this.wrap.scrollTop = center.y - margin;
    else if (center.y > bottom - margin)
      this.wrap.scrollTop = center.y + margin - height;
  }

  clear() {
    this.wrap.parentNode.removeChild(this.wrap);
  }
}

if (window.matchMedia("(max-width: 700px)").matches) {
  scale = 12;
} else if (window.matchMedia("(max-width: 900px").matches) {
  scale = 15;
} else {
  scale = 20;
}

const arrowCodes = {
  37: "left",
  38: "up",
  39: "right",
  65: "left",
  87: "up",
  68: "right"
};

function trackKeys(codes) {
  const pressed = Object.create(null);

  function handler(event) {
    if (codes.hasOwnProperty(event.keyCode)) {
      pressed[codes[event.keyCode]] = event.type === "keydown";
      event.preventDefault();
    }
  }

  addEventListener("keydown", handler);
  addEventListener("keyup", handler);
  return pressed;
}

function runAnimation(frameFunc) {
  let lastTime = null;

  function frame(time) {
    let stop = false;
    if (lastTime != null) {
      const timeStep = Math.min(time - lastTime, 100) / 1000;
      stop = frameFunc(timeStep) === false;
    }
    lastTime = time;
    if (!stop) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

const arrows = trackKeys(arrowCodes);

function runLevel(level, Display, andThen) {
  const display = new Display(document.body, level);
  runAnimation(function(step) {
    level.animate(step, arrows);
    display.drawFrame(step);
    if (level.isFinished()) {
      display.clear();
      if (andThen) andThen(level.status);
      return false;
    }
  });
}

function clearContent(div) {
  while (div.firstChild && div.removeChild(div.firstChild));
}

function startNewGame() {
  clearContent(game_content);
  runGame(LEVELS, DOMDisplay);
}

class Game {
  constructor() {
    this.n = null; // Level index
    this.plans = null;
    this.level = new Level();
    this.Display = null;
  }

  startLevel(n) {
    this.n = n!==undefined ? n : this.n;
    this.level.load(this.plans[this.n]);
    runLevel(this.level, this.Display, onFinish);
  }
}

var game = new Game();

function onFinish(status) {
  if (status === "lost") {
    game.startLevel(game.n);
    Player.prototype.removeCoinInLevel();
    Player.prototype.addDeath();
  } else if (game.n < game.plans.length - 1) {
    game.startLevel(this.n + 1);
    Player.prototype.newLevel();
  } else {
    finishSound.cloneNode(true).play();
    game_content.innerHTML =
      '<div class="new"><h2>Game status:</h2><div class="itens"><div class="item"><div class="title" id="gold">' +
      Player.prototype.coin +
      '</div><div class="text" id="gold">Coins</div></div><div class="item" id="red"><div class="title" id="red">' +
      Player.prototype.deaths +
      '</div><div class="text" id="red">Mortes</div></div></div><button onclick="startNewGame();">START NEW GAME</button></div>';
  }
}

function runGame(plans, Display) {
  game.plans = plans;
  game.Display = Display;

  (Player.prototype.coin = 0),
    (Player.prototype.coinInLevel = 0),
    (Player.prototype.deaths = 0);

  game.startLevel(0);
}

runGame(LEVELS, DOMDisplay);
