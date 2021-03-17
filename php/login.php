<?php
  include_once("database.php");

  if(extract($_POST)){
    $stmt = $mysqli->prepare("SELECT * FROM login WHERE id=?");
    $stmt->bind_param("i", $_POST['id']);
    $stmt->execute();
    $result = $stmt->get_result();
    if(mysqli_num_rows($result) > 0){
      $row = $result->fetch_assoc();
      if($row['password'] == $_POST['password']){
        $token = md5($_POST['id']);
        $stmt = $mysqli->prepare("UPDATE login SET token='$token' WHERE id=?");
        $stmt->bind_param("i", $_POST['id']);
        $stmt->execute();
        echo json_encode("yes");
      }else{
        echo json_encode("Invalid Password");
      }
    }else{
      echo json_encode("Invalid ID");
    }
  }
?>
