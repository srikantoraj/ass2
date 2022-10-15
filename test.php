<?php  
$mysqli = new mysqli('localhost', 'root', "@Sayef01674928470", 'assignment2');
        
        if (mysqli_connect_errno()) {
                printf("Connect failed: %s\n", mysqli_connect_error());
                exit();
            }
            $sql= "select * from products";
            $result=$mysqli->query($sql);
 	        $arr = array ();
            while($row = $result->fetch_array(MYSQLI_ASSOC))
            {
                $id =   $row['id'];
                $name = $row['product_name'];
                $price =$row['price'];
                $details=$row['details'];
                $image =$row['image'];
		        $belongsTo=$row['belongs_to'];
                $temp =  array( "id"=>$id,"name"=>$name,"price"=>$price,"details"=>$details,"image"=>$image,"belongs_to"=>$belongsTo);
                array_push($arr,$temp);
            }
 
// Function to convert array into JSON
header('Access-Control-Allow-Origin: *'); 
header("Content-Type: application/json");
echo json_encode($arr);
   
