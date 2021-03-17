<?php
  include_once("database.php");

  switch($_POST["func"]){
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
    try{
      global $mysqli;
      $stmt = $mysqli->prepare("CALL incative_delete_active_category(?, ?);");
      $stmt->bind_param("ss", $_POST["operation"], $_POST["code"]);
      if($stmt->execute())
      {
        echo json_encode("Successfully Permanent Delete");
      }else{
        echo json_encode("Something Went Wrong");
      }
    }catch(Throwable $tr){
      echo json_encode("Something Went Wrong");
    }
  }

  function sub_category() {
    try{
      global $mysqli;
      $stmt = $mysqli->prepare("DELETE FROM category WHERE code=?");
      $stmt->bind_param("s", $_POST["code"]);
      if($stmt->execute())
      {
        echo json_encode("Successfully Permanent Delete");
      }else{
        echo json_encode("Something Went Wrong");
      }
    }catch(Throwable $tr){
      echo json_encode("Something Went Wrong");
    }
  }

  function product() {
    try{
      global $mysqli;
      $stmt = $mysqli->prepare("DELETE FROM product WHERE id=?");
      $stmt->bind_param("s", $_POST["id"]);
      if($stmt->execute())
      {
        echo json_encode("Successfully Permanent Delete");
      }else{
        echo json_encode("Something Went Wrong");
      }
    }catch(Throwable $tr){
      echo json_encode("Something Went Wrong");
    }
  }
?>
