<?php
  include_once("database.php");

  switch($_GET["func"]){
    case "category":
      category();
      break;

    case "sub_category":
      sub_category();
      break;

    default:
      product();
      break;
  }

  function category() {
    global $mysqli;
    $stmt = $mysqli->prepare("CALL incative_delete_active_category(?, ?);");
    $stmt->bind_param("ss", $_GET["operation"], $_GET["code"]);
    if($stmt->execute())
    {
      http_response_code(204);
    }else{
      http_response_code(422);
    }
  }

  function sub_category() {
    global $mysqli;
    $stmt = $mysqli->prepare("UPDATE category SET status='inactive' WHERE code=?");
    $stmt->bind_param("s", $_GET["code"]);
    if($stmt->execute())
    {
      http_response_code(204);
    }else{
      http_response_code(422);
    }
  }

  function product() {
    global $mysqli;
    $stmt = $mysqli->prepare("UPDATE product SET status='inactive' WHERE id=?");
    $stmt->bind_param("s", $_GET["id"]);
    if($stmt->execute())
    {
      http_response_code(204);
    }else{
      http_response_code(422);
    }
  }
?>
