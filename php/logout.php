<?php
  include_once("database.php");

  if(extract($_POST)){
    $stmt = $mysqli->prepare("UPDATE login SET token='logout' WHERE id=?");
    $stmt->bind_param("i", $_POST['id']);
    $stmt->execute();
  }
?>
