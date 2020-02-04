/*
var games = [
  {
    "id": 1,
    "autor": "joão Lucas",
    "path": "levels/joaolucas/01/",
    "length": 6
  },
  {
    "id": 2,
    "autor": "Jair Dias",
    "path": "levels/jairedias/01/",
    "length": 1
  }
];
*/
var games = [
  {
    "id": 1,
    "title": "Fases J.Lucas 01",
    "autor": "João Lucas",
    "path": "editor/levels/joaolucas/01/",
    "length": 6
  },
  {
    "id": 2,
    "title": "Fases Jairpro 01",
    "autor": "Jair Dias",
    "path": "editor/levels/jairedias/01/",
    "length": 1
  },
  {
    "id": 0,
    "title": "Fases Game 01",
    "autor": "joão Lucas",
    "path": "editor/levels/game/01/",
    "length": 6
  },
]

//var games = require('./data.json'); //with path
//var games = require('./editor/levels/games.json'); //with path

var LEVELS2 = [];
var LEVELS_OK = false;
var LAST_LEVEL_PATH = "";
var gameIndex = 0;

String.prototype.replaceAt=function(index, replacement) {
  return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

class Editor {
  constructor() {
    this.start();
    this.active = false;
    this.logActive = true;
    this.itemIndex = 2;
    this.items = [
      {"ch": " ", "name": "space" },
      {"ch": "o", "name": "coin" },
      {"ch": "x", "name": "wall" },
      {"ch": "!", "name": "lava 1" },
      {"ch": "|", "name": "lava 2" },
      {"ch": "=", "name": "lava 3" }  ,
      {"ch": "v", "name": "lavag" },
      {"ch": "g", "name": "grass" },
      {"ch": "m", "name": "mob" },
      {"ch": "@", "name": "me" },
    ]
    this.setItem(this.itemIndex); 
  }

  start() {
    this.cursorX = Math.round(this.clientWidth()/2/scale);
    this.cursorY = Math.round(this.clientHeight()/2/scale);
  }

  switch() {
    this.active = !this.active;
    if (this.active) {
      this.showCursor();
      this.focus();
    } 
    else {
      this.hideCursor();
    }
    this.consoleStatus("switch()");
  }

  switchLog() {
    this.logActive = !this.logActive;
    this.consoleStatus("switchLog()");
  }

  setItem(itemIndex) {
    this.itemIndex = itemIndex; 
    this.item = this.items[itemIndex];
    this.consoleStatus("setItem()");
  }

  switchItem(step) {
    step = undefined ? 1 : step;
    var itemIndex = this.itemIndex;
    if (step>0) {
      if (this.itemIndex===this.items.length-1) {
        itemIndex = 0
      }
      else {
        itemIndex++
      }
    }
    else {
      if (this.itemIndex===0) {
        itemIndex = this.items.length-1
      }
      else {
        itemIndex--
      }
    }
    if (itemIndex!==false) {
      this.setItem(itemIndex);
    }
  }

  getLevelNumber() {
    return parseInt(document.querySelector("#game-content span").innerText);
  }

  getLevelIndex() {
    return this.getLevelNumber()-1;
  }

  getFieldType(ch) {
    var fieldType = false;
    if (ch==="@") {
    }
    else if (ch === "x") fieldType = "wall";
    else if (ch === "g") fieldType = "grass";
    else if (ch === "!") fieldType = "lava";
    else if (ch === "|") fieldType = "lava";
    else if (ch === "=") fieldType = "lava";
    else if (ch === "v") fieldType = "lavag";
    else if (ch === "m") fieldType = "mob";
    return fieldType;
  }

  setLevelGrid(levelIndex, x, y, itemIndex) {
    var itemCh = this.items[itemIndex].ch;
    var itemName = this.items[itemIndex].name;
    LEVELS[levelIndex][y] = LEVELS[levelIndex][y].replaceAt(x, itemCh);
    var fieldType = this.getFieldType(itemCh);
    if (fieldType) {
      game.level.grid[y][x] = fieldType;
    }
    
    this.celula(x,y).className = itemCh!==" " ? itemName : "";
    
    if (x===this.cursorX && y===this.cursorY) {
      this.addClass(this.celula(x,y), "cursor");
    }
   }

  insertItem() {
    this.setLevelGrid(this.getLevelIndex(),this.cursorX, this.cursorY, this.itemIndex);
    //runGame(LEVELS, DOMDisplay);
    //playerDeath();
    this.consoleStatus("insertItem()");
  }

  cleanItem() {
    this.setLevelGrid(this.getLevelIndex(), this.cursorX, this.cursorY, 0);
    this.consoleStatus("cleanItem()");
  }

  bord() {
    return scale * 1;
  }

  up() {
    if (this.cursorY>0) {
      this.hideCursor();
      this.cursorY--;
      this.showCursor();
      this.focus() 
      //if (this.posY() < this.scrollTop() + this.bord()) {
      //  this.scrollTop(this.scrollTop()-scale);
      //}
    }
    this.consoleStatus("up()");
  }

  down() {
    if (this.cursorY<game.level.grid.length-1) {
      this.hideCursor();
      this.cursorY++;
      this.showCursor(); 
      this.focus() 
      //if (this.posY() > this.clientHeight() - this.bord()) {
      //  this.scrollTop(this.scrollTop()+scale);
      //}
    }
    this.consoleStatus("down()");
  }

  left() {
    if (this.cursorX>0) {
      this.hideCursor();
      this.cursorX--;
      this.showCursor();
      //if (this.posX() < this.scrollLeft() + this.bord()) {
      //  this.scrollLeft(this.scrollLeft()-scale);
      //}
      this.focus() 
    }
    this.consoleStatus("left()");
  }

  right() {
    if (this.cursorX<game.level.grid[this.cursorY].length-1) {
      this.hideCursor();
      this.cursorX++;
      this.showCursor();
      //if (this.posX() > this.clientWidth() - this.bord()) {
      //  this.scrollLeft(this.scrollLeft()+scale);
      //}
      this.focus() 
    }
    this.consoleStatus("right()");
  }

  hideCursor() {
    this.removeClass(this.celulaCursor(),"cursor"); 
  }

  showCursor() {
    this.addClass(this.celulaCursor(),"cursor"); 
  }

  addClass(elemento, className) {
    if (elemento.className.split(" ").indexOf(className)===-1) {
      elemento.className += " "+className
    }
  }

  removeClass(elemento, className) {
    var classSplit = elemento.className.split(" ");
    var index = classSplit.indexOf(className);
    if (index>-1) {
      classSplit.splice(index,1);
      elemento.className = classSplit.join(" ");
    }
  } 

  background() {
    return document.querySelector("#game-content table.background");
  }

  celula(x, y) {
    return this.background().rows[y].cells[x];
  }

  celulaCursor() {
    return this.celula(this.cursorX, this.cursorY);
  }

  insertItemAndUp() {
    this.insertItem();
    this.up();
  }

  insertItemAndDown() {
    this.insertItem();
    this.down();
  }

  insertItemAndLeft() {
    this.insertItem();
    this.left();
  }

  insertItemAndRight() {
    this.insertItem();
    this.right();
  }

  cleanItemAndUp() {
    this.cleanItem();
    this.up();
  }

  cleanItemAndDown() {
    this.insertItem();
    this.down();
  }

  cleanItemAndLeft() {
    this.cleanItem();
    this.left();
  }

  cleanItemAndRight() {
    this.cleanItem();
    this.right();
  }

  divGame() {
    return document.querySelector("#game-content div.game");
  }

  cellWidth() {
    this.celula(0,0).width;  
  }
  
  cellHeight() {
    this.celula(0,0).height;  
  }

  cusorLeft() {
    //return this.cursorX * this.cellWidth();
    return this.cursorX * scale;
  }

  cursorTop() {
    //return this.cursorY * this.cellHeight();
    return this.cursorY * scale;
  }

  posX() {
    return this.cursorX * scale;
  }

  posY() {
    return this.cursorY * scale;
  }

  scrollLeft(scroll) {
    var previous = this.divGame().scrollLeft;
    if (scroll!==undefined) {
      this.divGame().scrollLeft = scroll;
    } 
    return previous;
  }

  scrollTop(scroll) {
    var previous = this.divGame().scrollTop;
    if (scroll!==undefined) {
      this.divGame().scrollTop = scroll;
    } 
    return previous;
  }

  width() {
    return this.divGame().scrollWidth;
  }

  height() {
    return this.divGame().scrollHeight;
  }

  clientWidth() {
    return this.divGame().clientWidth;
  }

  clientHeight() {
    return this.divGame().clientHeight;
  }

  focus() {
    this.scrollLeft(this.posX()-Math.round(this.clientWidth()/2));
    this.scrollTop(this.posY()-Math.round(this.clientHeight()/2));
  }

  consoleStatus(t) {
    if (this.logActive) {
      console.log(t
        +" | x:"+this.cursorX
        +" | y:"+this.cursorY
        +" | i:"+this.itemIndex
        +" | a:"+this.active
        +" | scroll L: "+this.scrollLeft()
        +" | scroll T: "+this.scrollTop()
        +" | posX: "+this.posX()
        +" | posY: "+this.posY()
        +" | clientW: "+this.clientWidth()
        +" | clientH: "+this.clientHeight()
        +" | Width: "+this.width()
        +" | Height: "+this.height()
      );
    }
  }


  restartGame() {
    runGame(LEVELS, DOMDisplay)
  }

  getGameByIndex(index) {
    return games[index]
  }

  getGameById(id) {
    for (var game of games) {
      if (game.id===id) {
        return game;
      }
    }
    return false;
  }

  filterCodes(codes) {
    var codesEnabled = codes;
    if (this.active) {
      codesEnabled = {}
      for (var c in codes) {
        if (["65","87","68"].indexOf(c)===-1) {
          codesEnabled[c] = codes[c];
        }
      }
    }
    return codesEnabled; 
  }

  saveLevel() {
    var pathSplit = this.game.path.split("/");
    $.ajax('editor.php',{
      "method": "POST",
      "dataType": "json",
      "async": true,
      "data": {
        "function": "saveLevel",
        "gameId": this.game.id,
        "gameFolder": pathSplit[pathSplit.length-2],
        "levelNumber": game.n+1,
        //"levelNumber": this.getLevelNumber(),
        "levelContent": JSON.stringify(LEVELS[game.n])
      },
      "success": function(result) {
        if (result && result.ok) {
          alert("Nível salvo com sucesso!");
        }
        else {
          alert("Erro ao salvar Nível"+(result ? ":\n"+result.message : ""))
        }
      },
      "error": function(erro, message) {
        alert(message+":\n\n"+erro.responseText);
      } 
    });
  }

  init(gameId) {
    
    this.game = this.getGameById(gameId);
    loadLevels(this.game);
    
    setTimeout(function(){
      LEVELS = LEVELS2;
      startNewGame()
      this.start();
    }, 750);
    
  }
}
editor = new Editor;

document.addEventListener("keydown", function (e) {
  if (e.keyCode>=48 && e.keyCode<=57 && !e.shiftKey && !e.ctrlKey && !e.altKey) {
    var gameId = e.keyCode-48;  
    if (e.keyCode===48) {
      gameId = 0;
    }
    editor.init(gameId);
  }

  // CTRL+ENTER = alterna editor
  if (e.keyCode===13 && !e.shiftKey && e.ctrlKey && !e.altKey) {
    editor.switch();
  }

  if (!editor.active && e.keyCode!==16 && e.keyCode!==17 && e.altKey!==18) {
    console.log("keyCode:"+e.keyCode+" | shift:"+e.shiftKey+" | ctrl:"+e.ctrlKey+" | alt:"+e.altKey);
  }

  if (!editor.active) {
    return false;
  }

  // ALT+INSERT | ALT+SPACE = próximo item
  if (
    (e.keyCode===45 && !e.shiftKey && !e.ctrlKey && e.altKey) 
    ||
    (e.keyCode===32 && !e.shiftKey && !e.ctrlKey && e.altKey)
  ) {
    editor.switchItem(+1);
  }

  // ALT+DEL = item anterior
  if (e.keyCode===46 && !e.shiftKey && !e.ctrlKey && e.altKey) {
    editor.switchItem(-1);
  }

  // CTRL+SPACE = reinicia jogo
  if (e.keyCode===32 && !e.shiftKey && e.ctrlKey && !e.altKey) {
    editor.restartGame();
  }

  //// SHIFT | INSERT | CTRL+SPACE = insere item
  // SHIFT | INSERT = insere item
  if ( 
    (e.keyCode===16 && e.shiftKey && !e.ctrlKey && !e.altKey) 
    ||
    (e.keyCode===45 && !e.shiftKey && !e.ctrlKey && !e.altKey) 
    //||
    //(e.keyCode===32 && !e.shiftKey && e.ctrlKey && !e.altKey)
  ) {
    editor.insertItem();
  }

  //// DELETE | CTRL+ALT+SPACE = apaga item
  // DELETE = apaga item
  if ( 
    (e.keyCode===46 && !e.shiftKey && !e.ctrlKey && !e.altKey) 
//    ||
//    (e.keyCode===32 && !e.shiftKey && e.ctrlKey && e.altKey) 
  ) {
    editor.cleanItem();
  }

  // W = move cursor para cima
  if (e.keyCode===87 && !e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.up();
  }
  // S = move cursor para baixo
  if (e.keyCode===83 && !e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.down();
  }
  // A = move cursor para esquerda
  if (e.keyCode===65 && !e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.left();
  }
  // D = move cursor para direita
  if (e.keyCode===68 && !e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.right();
  }

  // SHIFT+W = insere item e move cursor para cima
  if (e.keyCode===87 && e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.insertItemAndUp();
  }
  // SHIFT+S = insere item e move cursor para baixo
  if (e.keyCode===83 && e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.insertItemAndDown();
  }
  // SHIFT+A = insere item e move cursor para esquerda
  if (e.keyCode===65 && e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.insertItemAndLeft();
  }
  // SHIFT+D = insere item e move cursor para direita
  if (e.keyCode===68 && e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.insertItemAndRight();
  }

  /*
  // CTRL+ALT+W = limpa item e move cursor para cima
  if (e.keyCode===87 && !e.shiftKey && e.ctrlKey && e.altKey) {
    editor.cleanItemAndUp();
  }
  // CTRL+ALT+S = limpa item e move cursor para baixo
  if (e.keyCode===83 && !e.shiftKey && e.ctrlKey && e.altKey) {
    editor.cleanItemAndDown();
  }
  // CTRL+ALT+A = limpa item e move cursor para esquerda
  if (e.keyCode===65 && !e.shiftKey && e.ctrlKey && e.altKey) {
    editor.cleanItemAndLeft();
  }
  // CTRL+ALT+D = limpa item e move cursor para direita
  if (e.keyCode===68 && !e.shiftKey && e.ctrlKey && e.altKey) {
    editor.cleanItemAndRight();
  }
  */

  // CNTRL+X = salva level no arquivo
  if (e.keyCode===88 && !e.shiftKey && e.ctrlKey && !e.altKey) {
    editor.saveLevel();
  }
});

function imgToLEVEL(src) {
  var LEVEL = [];
  var img = new Image();
  img.src = src;
  context.drawImage(img, 0, 0);
  console.log(context.getImageData(0, 0, canvas.height, canvas.width));
  return LEVEL;
}

function levelTextToArray(levelText) {
  var linhas = levelText.split("\n");
  var i = 0;
  for (linha of linhas) {
    if (linha.substr(0,1).charCodeAt()===34) {
      linha = linha.substr(1);
    }
    if (linha.substr(-1,1).charCodeAt()===13) {
      linha = linha.substr(0,linha.length-1)
    }
    if (linha.substr(-1,1).charCodeAt()===34) {
      linha = linha.substr(0,linha.length-1)
    }
    linhas[i] = linha;
    i++; 
  }
  return linhas;
}

function getLevelIndex(path) {
  var r = false;
  try {
   r =parseInt(path.substr(-3,3))-1;
  }
  catch(err) {
  }
  return r;
}

function loadGames(path) {
  var client = new XMLHttpRequest();
  client.open('GET', path);
  client.onreadystatechange = function(event) {
    if (event.target.readyState===4) {
      editor.setGames(client.responseText); 
    }
  }
  client.send();
}

/*
function loadLevel(path) {
  var levelIndex = getLevelIndex(path);
  if (levelIndex===false) {
    return false;
  }
  var client = new XMLHttpRequest();
  client.open('GET', path);
  //client.open('GET', '/foo.txt');
  client.onreadystatechange = function(event) {
    //alert(client.responseText);
    if (event.target.readyState===4) {
      //LEVELS2.push(levelTextToArray(client.responseText));
      LEVELS2[levelIndex] = levelTextToArray(client.responseText);
      if (path===LAST_LEVEL_PATH) {
        LEVELS_OK = true;
      }
    }
  }
  client.send();
}
*/
function loadLevel(path) {
  var levelIndex = getLevelIndex(path);
  if (levelIndex===false) {
    return false;
  }
  $.ajax("editor.php", {
    "method": "POST",
    "dataType": "json",
    "async": false,
    "data": {
      "function": "loadLevel",
      "levelPath": path
    },
    success(result) {
      if (result.ok) {
        LEVELS2[levelIndex] = levelTextToArray(result.content);
        if (path===LAST_LEVEL_PATH) {
          LEVELS_OK = true;
        }
      }
      else {
        alert("Erro ao abrir level "+(levelIndex+1)+"\n\n"+result.message)
      }
    },
    error(error, message) {
      alert(message+"\n\n"+"")
    }
  });
}

function loadLevelsList(path, length) {
  var files = [];
  for (var f=1; f<=length; f++) {
    files.push(path+strZero(f,3));
  }
  return files;
}

function strZero(num, size) {
  var s = "000" + num;
  return s.substr(s.length-size);
}

function loadLevels(dados) {
  LEVELS2 = [];
  if (!dados) {
    return false;
  }
  var levelsList = loadLevelsList(dados.path, dados.length);
  if (levelsList.length>0) {
    LAST_LEVEL_PATH = levelsList[levelsList.length-1];
    for (levelPath of levelsList) {
      loadLevel(levelPath);
    }
  }
}

function loadAll() {
  loadGames();
  loadLevels();
}

game.editor = editor;