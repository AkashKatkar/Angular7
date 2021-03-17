<?php
    include_once('database.php');
    switch ($_POST['func']) {
      case 'category':
        addCategory();
        break;

      case 'sub_category':
        addSubCategory();
        break;

      default:
        addProduct();
        break;
    }

  function getLastCategoryId() {
    global $mysqli, $id;
    $stmt = $mysqli->prepare("SELECT id FROM category ORDER BY id DESC LIMIT 0, 1");
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $id=$row["id"]+1;
  }

  function addCategory(){
    try {
      getLastCategoryId();
      global $mysqli, $id;

      $stmt = $mysqli->prepare("INSERT INTO category(id, category_name, code) VALUES(?, ?, ?)");
      $stmt->bind_param("iss", $id, $_POST["name"], $_POST["code"]);
      if($stmt->execute()){
        echo json_encode('Data has been added successfully');
      } else{
        echo json_encode('Something Went Wrong');
      }
    } catch (Throwable $th) {
      echo json_encode('Something Went Wrongp');
    }
  }

  function addSubCategory(){
    try {
      getLastCategoryId();
      global $mysqli, $id;

      $stmt = $mysqli->prepare("SELECT id FROM category ORDER BY id DESC LIMIT 0, 1");
      $stmt->execute();
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      $id=$row["id"]+1;

      $stmt = $mysqli->prepare("SELECT id FROM category WHERE category_name=?");
      $stmt->bind_param("s", $_POST["category"]);
      $stmt->execute();
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();

      $stmt = $mysqli->prepare("INSERT INTO category(id, category_name, code, parent_id) VALUES(?,?,?,?)");
      $stmt->bind_param("issi", $id, $_POST["name"], $_POST["code"], $row["id"]);
      if($stmt->execute()){
        echo json_encode('Data has been added successfully');
      } else{
        echo json_encode('Something Went Wrong');
      }
    } catch (Throwable $th) {
      echo json_encode('Something Went Wrong');
    }
  }

  function addProduct(){
    try {
      global $mysqli;
      echo json_encode("sa");
      $stmt = $mysqli->prepare("SELECT id FROM category WHERE category_name=?");
      $stmt->bind_param("s", $_POST["subCategory"]);
      $stmt->execute();
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      $categ_id = $row['id'];

      $stmt = $mysqli->prepare("SELECT id FROM product ORDER BY id DESC LIMIT 0, 1");
      $stmt->execute();
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      $id = $row["id"]+1;

      $file = $_FILES['image'];
      $file_location = "images/".basename($file["name"]);
      $price = '₹'.$_POST["price"];

      $stmt->prepare("INSERT INTO product VALUES(?,?,?,?,?,'active')");
      $stmt->bind_param("isiss", $id, $_POST["name"], $categ_id, $price, $file_location);
      if($stmt->execute()){
        echo json_encode('Data has been added successfully');
      } else{
        echo json_encode('Something Went Wrong');
      }
      move_uploaded_file($file["tmp_name"], "C:/xampp/htdocs/ecommerceWebsite/images/" . basename($file["name"]));
    } catch (Throwable $th) {
      echo json_encode('Something Went Wrong');
    }
  }
?>
