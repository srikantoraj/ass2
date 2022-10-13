<?php
header('Access-Control-Allow-Origin: *'); 
if($_SERVER["REQUEST_METHOD"] == "POST"){
   

   $username = $_POST['name'];
   $password = $_POST['password'];
    $email = $_POST['email'];
       

          $mysqli = new mysqli('localhost', 'root', "@Sayef01674928470", 'assignment2');
        
        
        if (mysqli_connect_errno()) {
                printf("Connect failed: %s\n", mysqli_connect_error());
                exit();
            }
        
    $sql = "INSERT INTO `users`(`id`, `name`, `password`, `email`,`balance`) VALUES (null,'$username','$password','$email',null)";
    $result=$mysqli->query($sql);

    if($result){
        
	header("Content-Type: application/json");



$sql2= "select * from users";
$result2=$mysqli->query($sql2);

while($row = $result2->fetch_array(MYSQLI_ASSOC))
            {
                    if($row["name"]==$username)
                    $arr = array("id"=>$row['id'],"name"=>$row['name'],"balance"=>$row['balance'];
            }
echo json_encode($arr);


    }
}
    
?>