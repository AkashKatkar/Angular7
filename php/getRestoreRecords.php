<?php
  include_once("database.php");
  switch ($_GET['func']) {
    case 'category':
      $stmt = $mysqli->prepare("SELECT category_name AS name, code FROM category WHERE parent_id IS NULL AND status='inactive'");
      break;

    case 'sub_category':
      $stmt = $mysqli->prepare("SELECT c2.category_name AS name, c2.code FROM category c1, category c2
                      WHERE c1.id=(SELECT c2.parent_id FROM category WHERE c2.parent_id IS NOT NULL AND c2.status='inactive' LIMIT 0,1)
                      AND c1.status='active'
                      AND c1.parent_id IS NULL");
      break;

    default:
      $stmt = $mysqli->prepare("SELECT product.prod_name AS name, product.id AS id
                      FROM product
                      INNER JOIN category ON category.id=product.category_id
                      WHERE product.status='inactive' AND category.status<>'inactive'");
      break;
  }
  $stmt->execute();
  $data = Array();
  $result = $stmt->get_result();
  while($row = $result->fetch_assoc()){
    $data[] = $row;
  }
  echo json_encode($data);
?>
