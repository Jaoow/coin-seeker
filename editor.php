<?php
  ob_start();

  function StrZero($num, $len) {
    return str_pad($num, $len, "0", STR_PAD_LEFT);
  }

  class Games {
    const path = "./editor/levels/games.json";

    public $items;

    function load() {
      $ok = false;
      if (file_exists(self::path)) {
        $content = file_get_contents(self::path);
        if (is_string($content)) {
          $this->items = json_decode($content, true);
          $ok = true;
        }
      }
      return $ok;
    }

    function save() {
      $content = json_encode($this->items);
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

  }

  $ok = false;
  $message = "";
  $content = null;
  
  try {
    $function = filter_input(INPUT_POST, "function");
    
    if ($function==="saveLevel") {
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
    else {
      $message = "ivalid function";
    }
  }
  catch (Exception $ex) {
    $message = $ex->getMessage();
  }

  $result = array("ok"=>$ok, "content"=>$content, "message"=>$message, "ouput"=>ob_get_clean());
  $json = json_encode($result);
  echo $json;
