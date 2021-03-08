<?php
  include_once("database.php");
  $result = mysqli_query($mysqli, "SELECT * FROM category WHERE parent_id IS NULL");
  $rows = array();
  while($row = mysqli_fetch_assoc($result)){
    $rows[] = $row;
  }
  echo json_encode($rows);
?>
