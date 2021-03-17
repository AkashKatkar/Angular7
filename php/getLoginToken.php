<?php
  include_once("database.php");

  if(extract($_POST)){
    $stmt = $mysqli->prepare("SELECT token FROM login WHERE id=?");
    $stmt->bind_param("i", $_POST['id']);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    if(mysqli_num_rows($result)){
      echo json_encode($row['token']);
    }else{
      echo json_encode('0');
    }
  }
?>
