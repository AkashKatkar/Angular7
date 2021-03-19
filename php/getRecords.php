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
    global $mysqli;
    $stmt = $mysqli->prepare("SELECT id, category_name, code, parent_id
                              FROM category
                              WHERE parent_id IS NULL
                              AND status<>'inactive'");
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = array();
    while($row = $result->fetch_assoc()){
      $rows[] = $row;
    }
    echo json_encode($rows);
  }

  function sub_category() {
    global $mysqli;
    $stmt = $mysqli->prepare("SELECT A.category_name, A.code, B.category_name AS parent_category
                              FROM category A, category B
                              WHERE A.parent_id=B.id
                              AND A.parent_id IS NOT NULL
                              AND A.status<>'inactive'");
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = array();
    while($row = $result->fetch_assoc()){
      $rows[] = $row;
    }
    echo json_encode($rows);
  }

  function product() {
    global $mysqli;
    $stmt = $mysqli->prepare("SELECT product.id, product.prod_name, category.category_name, product.price, product.product_image
                              FROM product
                              INNER JOIN category ON category.id = product.category_id
                              WHERE product.status<>'inactive'");
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = array();
    while($row = $result->fetch_assoc()){
      $rows[] = $row;
    }
    echo json_encode($rows);
  }
?>
