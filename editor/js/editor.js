var nophp = getParameterByName("nophp")!==null;
var LEVELS2 = [];
var games = null;
var gameId = null;
var gameIndex = null;

function gameIndexById(id) {
  for (var i=0; i<games.length; i++) {
    if (games[i].id==id) {
      return i;
    }
  }
  return -1;
}

String.prototype.replaceAt=function(index, replacement) {
  return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/*
Usage:

// query string: ?foo=lorem&bar=&baz
var foo = getParameterByName('foo'); // "lorem"
var bar = getParameterByName('bar'); // "" (present with empty value)
var baz = getParameterByName('baz'); // "" (present with no value)
var qux = getParameterByName('qux'); // null (absent)
*/

class Editor {
  constructor() {
    Editor.defaultLevelLines   = 47;
    Editor.defaultLevelColumns = 110;
    Editor.gamePath = './editor/levels/games.json';
    
    this.start();

    this.active = false;
    this.logActive = true;
    this.arrowsKeys = true;
    
    this.itemIndex = 2;
    this.items = [
      {"ch": " " ,"name": "space"  ,"code": 32  },
      {"ch": "o" ,"name": "coin"   ,"code": 79  },
      {"ch": "x" ,"name": "wall"   ,"code": 88  },
      {"ch": "!" ,"name": "lava"   ,"code": 76  },
      {"ch": "|" ,"name": "lava"   ,"code": 220 },
      {"ch": "=" ,"name": "lava"   ,"code": 187 },
      {"ch": "v" ,"name": "lavag"  ,"code": 86  },
      {"ch": "g" ,"name": "grass"  ,"code": 71  },
      {"ch": "m" ,"name": "mob"    ,"code": 77  },
      {"ch": "@" ,"name": "player" ,"code": 80  },
    ]
    this.itemsKeyCodes = [];
    for (var item of this.items) {
      this.itemsKeyCodes.push(item.code);
    }
    this.itemsChars = [];
    for (var item of this.items) {
      this.itemsChars.push(item.ch);
    }
    this.setItem(this.itemIndex);
    game.joypad.onUpdate = this.updateJoypad;
  }

  updateJoypad(sender, e, eventType) {
    if (eventType==="button_press") {
      const { buttonName } = e.detail;
  
      if (window.editor) {
        // SELECT
        if (buttonName === 'button_8') {
          editor.switchGame();
        }
        // START
        if (buttonName === 'button_9') {
          editor.switch();
        }
      }
  
      if (window.editor && editor.active) {
        // A
        if (buttonName === 'button_0') {
          editor.insertItemByChar("!")
        }
        // O
        if (buttonName === 'button_1') {
          editor.insertItemByChar("o")
        }
        // X
        if (buttonName === 'button_2') {
          editor.cleanItem();
        }
        // []
        if (buttonName === 'button_3') {
          //editor.switchItem(-1);
          editor.insertItemByChar("x")
        }
        // L1
        if (buttonName === 'button_4') {
          //alert("button_4")
        }
        // R1
        if (buttonName === 'button_5') {
          //alert("button_5")
        }
        // L2
        if (buttonName === 'button_6') {
          //alert("button_6")
        }
        // R2
        if (buttonName === 'button_7') {
          //alert("button_7")
        }
        // SELECT
        if (buttonName === 'button_9') {
          //alert("button_9")
        }
        // START
        if (buttonName === 'button_9') {
          //alert("button_9")
        }
      }
    }
    else if (eventType==='axis_move') {
      const { directionOfMovement, stickMoved } = e.detail;

      if (stickMoved === 'left_stick') {
        if (window.editor && editor.active) {

          // move cursor
          switch (directionOfMovement) {
            case 'left':
              editor.left();
              break;
            case 'top':
              editor.up();
              break;
            case 'right':
              editor.right();
              break;
            case 'bottom':
              editor.down();
              break;
          }
        }
        else {

          // move personagem
          switch (directionOfMovement) {
            case 'left':
              sender.sendCustomKeyCode(37);
              sender.press.left = true;
              break;
            case 'top':
              sender.sendCustomKeyCode(38);
              sender.press.up = true;
              break;
            case 'right':
              sender.sendCustomKeyCode(39);
              sender.press.right = true;
              break;
          }
        }
      }
      if (this.press.left && e.detail.gamepad.axes[0]!==-1) {
        sender.sendCustomKeyCode(37, "keyup");
        sender.press.left = false;
      }
      if (sender.press.up && e.detail.gamepad.axes[1]!==-1) {
        sender.sendCustomKeyCode(38, "keyup");
        sender.press.up = false;
      }
      if (sender.press.right && e.detail.gamepad.axes[0]!==1) {
        sender.sendCustomKeyCode(39, "keyup");
        sender.press.right = false;
      }
      
    }
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

  switchGame(step) {
    step = step===undefined ? 1 : step;
    var gIndex = gameIndex;
    if (step>0) {
      if (gIndex<games.length-1) {
        gIndex++;
      }
      else {
        gIndex = 0;
      }
    }
    else //(step<0) 
    {
      if (gIndex>0) {
        gIndex--;
      }
      else {
        gIndex = games.length-1;
      }
    }
    var gId = games[gIndex].id;
    this.init(gId);
  }

  switchLog() {
    this.logActive = !this.logActive;
    this.consoleStatus("switchLog()");
  }

  switchKeys() {
    this.arrowsKeys = !this.arrowsKeys;
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
    return this.getLevelIndex()+1;
  }

  getLevelIndex() {
    return game.n;
  }

  getFieldType(ch) {
    var fieldType = false;
    for (var item in this.items) {
      if (item.ch === ch) {
        fieldType = item.name;
        break;
      }
    }

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

  insertItemByKeyCode(keyCode) {
    var i = this.itemsKeyCodes.indexOf(keyCode)
    if (i!==-1) {
      this.insertItem(i);
    }
  }

  insertItemByChar(char) {
    var i = this.itemsChars.indexOf(char)
    if (i!==-1) {
      this.insertItem(i);
    }
  }

  insertItem(item) {
    item = item===undefined ? this.itemIndex : item;
    this.setLevelGrid(this.getLevelIndex(),this.cursorX, this.cursorY, item);
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
    }
    this.consoleStatus("up()");
  }

  down() {
    if (this.cursorY<game.level.grid.length-1) {
      this.hideCursor();
      this.cursorY++;
      this.showCursor(); 
      this.focus() 
    }
    this.consoleStatus("down()");
  }

  left() {
    if (this.cursorX>0) {
      this.hideCursor();
      this.cursorX--;
      this.showCursor();
      this.focus() 
    }
    this.consoleStatus("left()");
  }

  right() {
    if (this.cursorX<game.level.grid[this.cursorY].length-1) {
      this.hideCursor();
      this.cursorX++;
      this.showCursor();
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
    return this.cursorX * scale;
  }

  cursorTop() {
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

  // filtro de teclas para o game.js
  filterCodes(codes) {
    var codesEnabled = codes;

    // se o editor está ativo
    if (this.active) {

      // verifica as teclas disponiveis
      codesEnabled = {}
      for (var c in codes) {
        if (
          // se o editor quer usar as setas ou o code não for: A, W, D
          (this.arrowsKeys || ["65","87","68"].indexOf(c)===-1)
          &&
          // E
          // se o editor que usar AWD ou o code não for: left, up, right 
          (!this.arrowsKeys || ["37","38","39"].indexOf(c)===-1)
        ) {
          // o editor não vai reservar o code para si
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
        "levelNumber": this.getLevelNumber(),
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

  loadGames(onLoad) {

    function loadGames2(onLoad) {
      var client = new XMLHttpRequest();
      client.open('GET', Editor.gamesPath);
      client.onreadystatechange = function(event) {
        if (event.target.readyState===4) {
          if (onLoad) {
            onLoad(JSON.parse(result.content));
          }
        }
      }
      client.send();
    }

    var oThis = this;
    if (!nophp) {
      var g = [];
      $.ajax("editor.php", {
        "method": "POST",
        "dataType": "json",
        "async": true,
        "data": {
          "function": "loadGames",
        },
        "success": function(result) {
          if (result && result.ok && result.content) {
            if (onLoad) {
              onLoad(JSON.parse(result.content))
            }
          }
          else {
            alert(result && result.message ? result.message : "Failure on load games")
            loadGames2(onLoad);
          }
        },
        "error": function(error, message) {
          alert("Error on save games: "+ message + "\n\n" + error.responseText);
          loadGames2(onLoad);
        },
      });
      return g;
    }
    else {
      loadGames2(onLoad);
    }
  }

  saveGames() {
    var ok = false;
    $.ajax("editor.php", {
      "method": "POST",
      "dataType": "json",
      "async": false,
      "data": {
        "function": "saveGames",
        "games": JSON.stringify(games),
      },
      "success": function(result) {
        if (!result || result && !result.ok) {
          alert(result && result.message ? result.message : "Failure on save games")
        }
        else {
          ok = true;  
        }
      },
      "error": function(error, message) {
        alert("Error on save games: " + message + "\n\n" + error.resonseText)
      }
    })
    return ok;
  }

  getMaxLevelNumber(gameIndex) {
    var max = 0;
    for (var file of games[gameIndex].files) {
      if (parseInt(file)>max) {
        max = parseInt(file);
      }
    }
    return max;
  }

  addNewLevel(columns, lines) {
    
    // define colunas e linhas do level
    columns = parseInt(columns===undefined ? Editor.defaultLevelColumns : columns);
    lines = parseInt(lines===undefined ? Editor.defaultLeveltLines : lines);

    // adiciona um level ao game
    games[gameIndex].files.push(strZero(this.getMaxLevelNumber(gameIndex)+1, 3));
    if (!this.saveGames()) {
      games[gameIndex].pop();
      return false;
    }

    // cria o novo level vazio
    LEVELS.push(new Array(lines).fill(" ".repeat(columns)));

    // seleciona o novo level
    game.n = LEVELS.length-1;
    var newLevel = LEVELS[LEVELS.length-1];

    // calcula a linha do piso inical (no meio da camera)
    var yW = Math.trunc(Math.min(Math.trunc(this.clientHeight()),newLevel.length-1)/2);
  
    // calcula a largura do piso inicial
    var widthFirstWall = Math.min(Math.floor(Math.trunc(this.clientWidth()/scale)/5*3), newLevel[yW].length-1);
    var x1W = 0 
    var x2W = x1W + widthFirstWall;
  
    // calcula posição inicial do personagem
    var yP = Math.min(yW - 2, newLevel.length-1);
    var xP = Math.trunc(Math.min(Math.trunc(this.clientWidth()/scale), newLevel[yP].length-1)/2); 

    // calcula posicao da moeda final
    var yFinalCoin;
    var xFinalCoin
    do {
      yFinalCoin = Math.floor((Math.random() * newLevel.length-1) + 0)
      xFinalCoin = Math.floor((Math.random() * newLevel[yFinalCoin].length-1) + 0)
    } while (
        xP===xFinalCoin && yP===yFinalCoin 
        ||
        yW===yFinalCoin && x1W>=xFinalCoin && x2W<=xFinalCoin
    );

    // insere o piso inical no meio da tela
    for (var x=x1W; x<x2W; x++) 
      newLevel[yW] = newLevel[yW].replaceAt(x,"x") 

    // insere personagem sob o piso
    newLevel[yP] = newLevel[yP].replaceAt(3, "@")

    // insere a última moeda num local aletório como sugestão de ser a útima
    // a sugestão é fazer todo um caminho de maneira que essa seja última moeda
    newLevel[yFinalCoin] = newLevel[yFinalCoin].replaceAt(xFinalCoin,"o") 


    game.startLevel(game.n);
    this.saveLevel();
  }

  confirmNewLevel() {
    if (confirm("adicionar novo Level?")) {
      var end = false;
      while (!end) {
        var columns = prompt("Colunas: ", Editor.defaultLevelColumns);
        try {
          end = columns===null || parseInt(columns)>=2;
          if (!end) {
            alert("The minimal value is 2")
          }
        }
        catch (err) {
          alert("Invalid value")
        }
      }
      if (columns!==null) {
        end = false;
        while (!end) {
          var lines = prompt("Linhas", Editor.defaultLevelLines);
          try {
            end = lines===null || parseInt(lines)>=2;
            if (!end) {
              alert("The minimal value is 2")
            }

          }
          catch (err) {
            alert("Invalid value")
          }
        }
        if (lines!==null) {
          this.addNewLevel(columns, lines);
        }
      }
    }
  }
  
  deleteLevel(levelNumber, confirmation) {
    confirmation = confirmation===undefined ? true : confirmation;
    if (confirmation && !confirm("ATENÇÃO: ESSE LEVEL SERÁ EXCLUÍDO, CONFIRMA?")) {
      return false;
    }
    var levelIndex = levelNumber-1;
    $.ajax("editor.php", {
      "method": "POST",
      "dataType": "json",
      "async": true,
      "data": {
        "function": "deleteLevel",
        "gameId": this.game.id,
        "levelFile": this.game.files[levelIndex], 
      },
      "success": function(result) {
        if (result && result.ok) {
          LEVELS.splice(levelIndex, 1);
          game.plans.splice(levelIndex, 1);
          alert("Level deleted sucessful");
          var nextLevelIndex = Math.min(levelIndex, LEVELS.length-1);
          if (nextLevelIndex<0) {
            this.confirmNewLevel()
          }  
          else {
            game.startLevel(nextLevelIndex);
          }
        }
        else {
          alert("Delete level failed"+  result && result.message ? ": \n\n"+result.message : "")
        }
      },
      "error": function(error, message) {
        alert("Error on delete level: "+message+"/n/n"+error.responseText);
      }
    })
  }

  init(gameId, onLoadLevels) {
    var oThis = this;
    this.game = this.getGameById(gameId);
    gameIndex = gameIndexById(gameId);

    function _init(levelsFromServer) {
      LEVELS = levelsFromServer;
      startNewGame()
      oThis.start();
      if (onLoadLevels) {
        onLoadLevels();
      }
    }

    loadLevels(this.game, function(levelsFromServer) {
      if (!nophp) {
        _init(levelsFromServer);
      }
      else {
        // esse delay funciona em conjunto com o loadLevel sem PHP
        // caso de problemas aumentar o intervalo
        // mínimo para um processador i5 gen 9 foi 5ms
        setTimeout(function() {
          _init(levelsFromServer);
        }, 750);
      }
    });
  }
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

// requer PHP
function loadLevel(path) {

  var levelIndex = getLevelIndex(path);
  if (levelIndex===false) {
    return false;
  }
  $.ajax("editor.php", {
    "method": "POST",
    "dataType": "json",
    "async": true,
    "data": {
      "function": "loadLevel",
      "levelPath": path
    },
    success(result) {
      if (result.ok) {
        LEVELS2[levelIndex] = levelTextToArray(result.content);
      }
      else {
        alert("Erro ao abrir level "+(levelIndex+1)+"\n\n"+result.message)
        loadLevel2(path)
      }
    },
    error(error, message) {
      alert(message+"\n\n"+"")
      loadLevel2()
    }
  });
}

// funciona sem PHP
function loadLevel2(path) {
  var levelIndex = getLevelIndex(path);
  if (levelIndex===false) {
    return false;
  }
  var client = new XMLHttpRequest();
  client.open('GET', path);
  client.onreadystatechange = function(event) {
    if (event.target.readyState===4) {
      LEVELS2[levelIndex] = levelTextToArray(client.responseText);
    }
  }
  client.send();
}

function loadLevelsList(path, files) {
  var paths = [];
  for (var f=0; f<=files.length; f++) {
    paths.push(path + (path==="/" ? "" : "/") + files[f]);
  }
  return paths;
}

function strZero(num, size) {
  var s = "000" + num;
  return s.substr(s.length-size);
}

function loadLevels2(game, onLoad) {
  LEVELS2 = [];
  if (!game) {
    return false;
  }
  var levelsList = loadLevelsList(game.path, game.files);
  if (levelsList.length>0) {
    for (levelPath of levelsList) {
      loadLevel2(levelPath);
    }
  }
}

function loadLevels(game, onLoad) {
  LEVELS2 = [];
  if (!game) {
    return false;
  }
  if (!nophp) {
    $.ajax("editor.php",{
      "method": "POST",
      "dataType": "json",
      "async": true,
      "data": {
        "function": "loadLevels",
        "gameId": game.id,
      },
      "success": function(result) {
        if (result && result.ok) {
          if (onLoad) {
            onLoad(result.content)
          }
        }
        else {
          alert("Fail on load levels" + (result && result.message ? ": \n\n"+result.message : ""));
          loadLevel2(game, onLoad);
        } 
      },
      "error": function(error, message) {
        alert("Error on load levels: "+ message + "\n\n" + error.responseText);
        loadLevel2(game, onLoad);
      }
    });
  }
  else {
    loadLevel2(game, onLoad);
  }
}

function editorKeyDown(e) {
  var isLeft  = e.keyCode===(editor.arrowsKeys ? 37 : 65);
  var isUp    = e.keyCode===(editor.arrowsKeys ? 38 : 87);
  var isRight = e.keyCode===(editor.arrowsKeys ? 39 : 68);
  var isDown  = e.keyCode===(editor.arrowsKeys ? 40 : 83);

  // TECLAS 1, 2, 3, 4, 5, 6, 7, 8, 9 e 0 
  if (e.keyCode>=48 && e.keyCode<=57 && !e.shiftKey && !e.ctrlKey && !e.altKey) {
    var gameId = e.keyCode-48;  
    if (e.keyCode===48) {
      gameId = 0;
    }
    editor.init(gameId);
    e.preventDefault();
  }

  // CTRL+ENTER = alterna editor
  if (e.keyCode===13 && !e.shiftKey && e.ctrlKey && !e.altKey) {
    editor.switch();
    e.preventDefault();
  }

  // SHIFT+ENTER = alterna teclas direcionais
  if (e.keyCode===13 && e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.switchKeys();
    e.preventDefault();
  }

  // OUTRAS TECLAS (para depurar seu code)
  if (!editor.active && e.keyCode!==16 && e.keyCode!==17 && e.altKey!==18) {
    console.log("keyCode:"+e.keyCode+" | shift:"+e.shiftKey+" | ctrl:"+e.ctrlKey+" | alt:"+e.altKey);
    e.preventDefault();
  }

  // AS TECLAS A SEGUIR SÓ QUANDO EDITOR ATIVO
  if (!editor.active) {
    return false;
  }

  // CTRL+RIGHT = abre próximo nível para edição
  if (isRight && !e.shiftKey && e.ctrlKey && !e.altKey) {
    if (game.n<games[gameIndex].files.length-1) {
      game.n++;
      game.startLevel(game.n);
    }
    // sugere adicionar um novo nível caso esteja na última
    else if (!editor.confirmNewLevel()) {
      // senão passa para o primeiro nível
      game.n =0
      game.startLevel(game.n);
    }
    e.preventDefault();
  }

  // CTRL+LEFT = abre nível anterior para edição
  if (isLeft && !e.shiftKey && e.ctrlKey && !e.altKey) {
    if (game.n>0) {
      game.n--;
      game.startLevel(game.n);
    }
    // sugere adicionar uma novo nível caso esteja na primeira
    else if (!editor.confirmNewLevel()) {
      // senão passa para o último nível
      game.n = games[gameIndex].files.length-1
      game.startLevel(game.n);
    }
    e.preventDefault();
  }

  // CTRL+INSERT - Insere um novo nível na posição atual
  if (e.keyCode===45 && !e.shiftKey && e.ctrlKey && !e.altKey) {
    editor.confirmNewLevel()
    e.preventDefault();
  }
  
  // CTRL+DELETE - Excluí o nível atual (com confirmação antes)
  if (e.keyCode===46 && !e.shiftKey && e.ctrlKey && !e.altKey) {
    editor.deleteLevel(editor.getLevelNumber())
    e.preventDefault();
  }
  
  // ALT+INSERT | ALT+SPACE = próximo item
  if (
    (e.keyCode===45 && !e.shiftKey && !e.ctrlKey && e.altKey) 
    ||
    (e.keyCode===32 && !e.shiftKey && !e.ctrlKey && e.altKey)
  ) {

    editor.switchItem(+1);
    e.preventDefault();
  }
    
  // ALT+DEL = item anterior
  if (e.keyCode===46 && !e.shiftKey && !e.ctrlKey && e.altKey) {
    editor.switchItem(-1);
    e.preventDefault();
  }
  
  // CTRL+SPACE = reinicia jogo
  if (e.keyCode===32 && !e.shiftKey && e.ctrlKey && !e.altKey) {
    editor.restartGame();
    e.preventDefault();
  }
  
  // SHIFT | INSERT = insere item
  if ( 
    (e.keyCode===16 && e.shiftKey && !e.ctrlKey && !e.altKey) 
    ||
    (e.keyCode===45 && !e.shiftKey && !e.ctrlKey && !e.altKey) 
  ) {
    editor.insertItem();
    e.preventDefault();
  }
  // INSERE PAREDE
  if (editor.itemsKeyCodes.indexOf(e.keyCode)!==-1 && !e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.insertItemByKeyCode(e.keyCode);
    e.preventDefault();
  }
  
  // SPACE | DELETE = apaga item
  if ( 
    (e.keyCode===32 && !e.shiftKey && !e.ctrlKey && !e.altKey) 
    ||
    (e.keyCode===46 && !e.shiftKey && !e.ctrlKey && !e.altKey) 
  ) {
    editor.cleanItem();
    e.preventDefault();
  }

  // Left ou A = move cursor para esquerda
  if (isLeft && !e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.left();
    e.preventDefault();
  }
  // Up ou W = move cursor para cima
  if (isUp && !e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.up();
    e.preventDefault();
  }
  // Right ou D = move cursor para direita
  if (isRight && !e.shiftKey && !e.ctrlKey && !e.altKey
  ) {
    editor.right();
    e.preventDefault();
  }
  // Down ou S = move cursor para baixo
  if (isDown && !e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.down();
    e.preventDefault();
  }

  // SHIFT+LEFT | SHIFT+A = insere item e move cursor para esquerda
  if (isLeft && e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.insertItemAndLeft();
    e.preventDefault();
  }
  // SHIT+UP | SHIFT+W = insere item e move cursor para cima
  if (isUp && e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.insertItemAndUp();
    e.preventDefault();
  }
  // SHIFT+RIGHT | SHIFT+D = insere item e move cursor para direita
  if (isRight && e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.insertItemAndRight();
    e.preventDefault();
  }
  // SHIFT+DOWN | SHIFT+S = insere item e move cursor para baixo
  if (isDown && e.shiftKey && !e.ctrlKey && !e.altKey) {
    editor.insertItemAndDown();
    e.preventDefault();
  }

  /*
  // CTRL+ALT+A = limpa item e move cursor para esquerda
  if (isLeft && !e.shiftKey && e.ctrlKey && e.altKey) {
    editor.cleanItemAndLeft();
    e.preventDefault();
  }
  // CTRL+ALT+W = limpa item e move cursor para cima
  if (isUp && !e.shiftKey && e.ctrlKey && e.altKey) {
    editor.cleanItemAndUp();
    e.preventDefault();
  }
  // CTRL+ALT+D = limpa item e move cursor para direita
  if (isRight && !e.shiftKey && e.ctrlKey && e.altKey) {
    editor.cleanItemAndRight();
    e.preventDefault();
  }
  // CTRL+ALT+S = limpa item e move cursor para baixo
  if (isDown && !e.shiftKey && e.ctrlKey && e.altKey) {
    editor.cleanItemAndDown();
    e.preventDefault();
  }
  */

  // CNTRL+X = salva fase no arquivo
  if (e.keyCode===88 && !e.shiftKey && e.ctrlKey && !e.altKey) {
    editor.saveLevel();
    e.preventDefault();
  }
}

var editor = new Editor();

editor.loadGames(function(gamesFromServer) {
  games = gamesFromServer  
  gameId = 2;
  gameIndex = gameIndexById(gameId);

  // inicia game dos arquivos de levels
  editor.init(gameId, function() {
    game.editor = editor;
    document.addEventListener("keydown", editorKeyDown);
  });
})
