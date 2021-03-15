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
    $search = $_GET['searchVal'];
    $page = 1;
    $showRows = $_GET['selectedRows'];
    $start = $showRows*($page-1);
    if($search!=''){
      $stmt = $mysqli->prepare("SELECT * FROM category WHERE parent_id IS NULL
      AND status<>'inactive' AND (category_name LIKE concat('%','$search','%')
      OR code LIKE concat('%','$search','%'))  LIMIT $start, $showRows");
    }else{
        $stmt = $mysqli->prepare("SELECT * FROM category WHERE parent_id IS NULL AND status<>'inactive' LIMIT $start, $showRows");
    }
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
    $page = 1;
    $showRows = $_GET['selectedRows'];
    $start = $showRows*($page-1);
    $search = $_GET['searchVal'];
    if($search!=''){
      $stmt = $mysqli->prepare("SELECT A.category_name, A.code, B.category_name AS parent_category
      FROM category A, category B
      WHERE A.parent_id=B.id
      AND A.parent_id IS NOT NULL
      AND A.status<>'inactive'
      AND (A.category_name LIKE concat('%','$search','%')
      OR A.code LIKE concat('%','$search','%')
      OR B.category_name LIKE concat('%','$search','%')) LIMIT $start, $showRows");
    }else{
        $stmt = $mysqli->prepare("SELECT A.category_name, A.code, B.category_name AS parent_category
        FROM category A, category B
        WHERE A.parent_id=B.id
        AND A.parent_id IS NOT NULL
        AND A.status<>'inactive'
        LIMIT $start, $showRows");
    }
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
    $page = 1;
    $showRows = $_GET['selectedRows'];
    $start = $showRows*($page-1);
    $search = $_GET['searchVal'];
    if($search!=''){
      $stmt = $mysqli->prepare("SELECT product.id, product.prod_name, category.category_name, product.price, product.product_image
      FROM product
      INNER JOIN category ON category.id = product.category_id
      WHERE product.status<>'inactive'
      AND (product.id LIKE concat('%','$search','%')
      OR product.prod_name LIKE concat('%','$search','%')
      OR product.price LIKE concat('%','$search','%')
      OR category.category_name LIKE concat('%','$search','%'))  LIMIT $start, $showRows");
    }else{
        $stmt = $mysqli->prepare("SELECT product.id, product.prod_name, category.category_name, product.price, product.product_image
        FROM product
        INNER JOIN category ON category.id = product.category_id
        WHERE product.status<>'inactive'
        LIMIT $start, $showRows");
    }
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = array();
    while($row = $result->fetch_assoc()){
      $rows[] = $row;
    }
    echo json_encode($rows);
  }
?>
