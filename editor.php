<?php
  ob_start();

  function StrZero($num, $len) {
    return str_pad($num, $len, "0", STR_PAD_LEFT);
  }

  class Games {
    const path = "./editor/levels/games.json";

    public $items;

    function updateFiles() {
      if (is_array($this->items)) {
        foreach ($this->items as $i=>$item) {
          $path = isset($item["path"]) ? $item["path"] : false;
          if (is_string($path) && is_dir($path) && file_exists($path)) {
            $files = scandir($path);
            if (is_array($files)) {
              $this->items[$i]["files"] = array();
              foreach ($files as $f=>$file) {
                if (!in_array($file, array(".",".."))) {
                  unset($this->items[$i]["length"]);
                  $this->items[$i]["files"][] = $file;
                }
              }
            }
          }
        }
      }
    }

    function load() {
      $ok = false;
      if (file_exists(self::path)) {
        $content = file_get_contents(self::path);
        if (is_string($content)) {
          $this->items = json_decode($content, true);
          $this->updateFiles();
          $ok = true;
        }
      }
      return $ok;
    }

    function save($content) {
      $content = $content ? $content : json_encode($this->items);
      $size = file_put_contents(self::path, $content);
      return $size!==false && $size === strlen($content);
    }

    function saveLevel($gameId, $gameFolder, $levelNumber, $levelContent) {
      $game = $this->getGameById($gameId);
      $levelZeros = strZero($levelNumber, 3);
      $gamePath =$game['path'];
      $levelPath = "$gamePath/$levelZeros";
      $len = file_put_contents($levelPath, $levelContent);
      return $len!==false && $len===strlen($levelContent);
    }

    function loadLevel($levelPath) {
      $levelContent = false;
      if (file_exists($levelPath)) {
        $levelContent = file_get_contents($levelPath);
      }
      return $levelContent;
    }

    function getGameById($id) {
      if (is_array($this->items)) {
        foreach ($this->items as $i=>$item) {
          if (isset($item['id']) && $item['id']==$id) {
            return $item;
          }
        }
      }
      return false;
    }

    function loadLevels($gameId) {

      function callback($linha) {
        return substr(substr($linha, 1), 0, -1);
      }
  
      $game = $this->getGameById($gameId);
      $levels = array();
      if (isset($game['files']) && is_array($game['files'])) {
        foreach($game['files'] as $f=>$file) {
          if (isset($game['path'])) {
            $path = $game['path'] . (substr($game['path'],-1,0)!=="/" ? "/" : "") . $file;
            if (is_file($path) && file_exists($path)) {
              $content = file_get_contents($path);
              if ($content!==false) {
                $level = explode(PHP_EOL, $content);
                $levels[] = array_map("callback", $level);
              }
              else {
                return false;
              }
            }
            else {
              return false;
            }
          }
          else {
            return false;
          }
        }
      }
      else {
        return false;
      }
      return $levels;
    }

    function deleteLevel($gameId, $levelFile) {
      $ok = false;
      $game = $this->getGameById($gameId);
      if (isset($game["path"])) {
        $levelPath = $game["path"] . (substr($game["path"],-1,1)==="/" ? "" : "/") . $levelFile;
        if (is_file($levelPath) && file_exists($levelPath)) {
          $ok = unlink($levelPath);
        }
      }
      return $ok;
    }

  }

  $ok = false;
  $message = "";
  $content = "";
  
  try {
    $function = filter_input(INPUT_POST, "function");
    
    if ($function==="loadGames") {
      $games = new Games();
      $ok = $games->load();
      if (!$ok) {
        $message = "Error on load games file";
      }
      else {
        $content = json_encode(array_values($games->items), true);
      }
    }
    else if ($function==="saveGames") {
      $gamesContent = filter_input(INPUT_POST, "games");
      $games = new Games();
      $ok = $games->save($gamesContent);
      if (!$ok) {
        $message = "Error on save games file";
      }
    }
    else if ($function==="saveLevel") {
      $gameId = filter_input(INPUT_POST, "gameId");
      $gameFolder = filter_input(INPUT_POST, "gameFolder");
      $levelNumber = filter_input(INPUT_POST, "levelNumber");
      $levelContent = filter_input(INPUT_POST, "levelContent");
      if ($levelContent) {
        $levelContent = implode(PHP_EOL, explode(",", substr($levelContent,1,strlen($levelContent)-2)));
      }
      
      $games = new Games();
      $games->load();
      $ok = $games->saveLevel($gameId, $gameFolder, $levelNumber, $levelContent);
      if (!$ok) {
        $message = "Erro ao salvar level";
      }
    }
    else if ($function==="loadLevel") {
      $levelPath = filter_input(INPUT_POST, "levelPath");
      $games = new Games();
      $content = $games->loadLevel($levelPath);
      $ok = $content!==false;
      if (!$ok) {
        $message = "Erro ao carregar level";
      }
    }
    else if ($function==="loadLevels") {
      $gameId = filter_input(INPUT_POST, "gameId");
      $games = new Games();
      $games->load();
      $levels = $games->loadLevels($gameId);
      $ok = is_array($levels);
      if (!$ok) {
        $message = "Error on load levels";
      }
      else {
        $content = $levels;
      }     
    }
    else if ($function==="deleteLevel") {
      $gameId = filter_input(INPUT_POST, "gameId");
      $levelFile = filter_input(INPUT_POST, "levelFile");
      $games = new Games();
      $games->load();
      $ok = $games->deleteLevel($gameId, $levelFile);
      if (!$ok) {
        $message = "Error on delete level file";
      }
    }
    else {
      $message = "invalid function";
    }
  }
  catch (Exception $ex) {
    $message = $ex->getMessage();
  }
  $output = ob_get_clean();
  $result = array("ok"=>$ok, "content"=>$content, "message"=>$message, "ouput"=>$output);
  $json = json_encode($result);
  echo $json;
