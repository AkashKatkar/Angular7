<?php
  include_once("database.php");
  $stmt = $mysqli->prepare("SELECT category_name FROM category WHERE parent_id IS NOT NULL");
  $stmt->execute();
  $result = $stmt->get_result();
  $arr = array();
  while($row = $result->fetch_assoc()){
    $arr[] = $row["category_name"];

  }
  echo json_encode($arr);
?>
