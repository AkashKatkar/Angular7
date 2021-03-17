<?php
  include_once("database.php");

  switch($_POST['func']){
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
      $stmt = $mysqli->prepare("UPDATE category SET category_name=?, code=? WHERE code=?");
      $stmt->bind_param("sss", $_POST['categ_name'], $_POST['categ_code'], $_POST['oldCode']);
      if($stmt->execute())
      {
        echo json_encode("Data Successfully Edit");
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
      $stmt = $mysqli->prepare("UPDATE category SET category_name=?, code=?,
                                parent_id=(SELECT id FROM category WHERE category_name=?) WHERE code=?");
      $stmt->bind_param("ssss", $_POST['categ_name'], $_POST['categ_code'], $_POST['parentName'], $_POST['oldCode']);
      if($stmt->execute())
      {
        echo json_encode("Data Successfully Edit");
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
      $file = $_FILES["productImage".$_POST["id"]];
      if(basename($file["name"]) != '' || basename($file["name"]) != NULL){
          if(file_exists("C:/xampp/htdocs/ecommerceWebsite/images/".basename($file["name"])) == 1){
              for($i=0;$i<=$i;$i++){
                  if(file_exists("images/".$i.basename($file["name"])) != 1){
                      $file_name = "images/".$i.basename($file["name"]);
                      move_uploaded_file($file["tmp_name"], "C:/xampp/htdocs/ecommerceWebsite/images/".$i. basename($file["name"]));
                      break;
                  }
              }
          }else{
              $file_name = "images/".basename($file["name"]);
              move_uploaded_file($file["tmp_name"], "C:/xampp/htdocs/ecommerceWebsite/images/" . basename($file["name"]));
          }
      }else{
          $file_name = $_POST['productImageName'];
      }
      $stmt = $mysqli->prepare("UPDATE product SET prod_name=?, category_id=(SELECT id FROM category WHERE category_name=?), price=?, product_image=? WHERE id=?");
      $stmt->bind_param("sssss", $_POST["prod_name"], $_POST["prodCategory"], $_POST["prod_price"], $file_name, $_POST["id"]);
      if($stmt->execute())
      {
        echo json_encode("Data Successfully Edit");
      }else{
        echo json_encode("Something Went Wrong");
      }
    }catch(Throwable $tr){
      echo json_encode("Something Went Wrong");
    }
  }
?>
