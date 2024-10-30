<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>registro</title>
    <style type="text/css">
      
      table {
        text-align: center;
        align-content: center;
        align-items: center;
        border: solid 2px #7e7c7c;
        border-collapse: collapse;
                      
      }
      
      th, h1 {
        text-align: center;
        align-content: center;
        background-color: #edf797;
      }

      td,
      th {
        text-align: center;
        align-content: center;
        border: solid 1px #7e7c7c;
        padding: 2px;
        text-align: center;
      }


    </style>
</head>



<body>
    
</body>
</html>
<center>


<?php
//validamos datos del servidor
$user = "root";
$pass = "";
$host = "localhost";

//conetamos al base datos
$connection = mysqli_connect($host, $user, $pass);

//hacemos llamado al imput de formuario
$cedula = $_POST["cedula"] ;
$usuario = $_POST["usuario"] ;
$fecha = $_POST["fecha"] ;
$hora = $_POST["hora"] ;
$motivo = $_POST["motivo"] ;

//verificamos la conexion a base datos 
if(!$connection) 
        {
            echo "No se ha podido conectar con el servidor" . mysql_error();
        }
  else
        {
            echo "<b><h3>Su Cita se ha registrado exitosamente</h3></b>" ;
        }
        //indicamos el nombre de la base datos
        $datab = "controlvet";
        //indicamos selecionar ala base datos
        $db = mysqli_select_db($connection,$datab);

        if (!$db)
        {
        echo "No se ha podido encontrar la Tabla";
        }
        else
        {
        echo "<h3>Gracias</h3>" ;
        
        echo'<a href="aggcita.php" class="btn btn-primary">Volver </a>'; 
        header("location:  ../controlvet/mensaje.html") ;
        
        
        
        ;
        
        }
        //insertamos datos de registro al mysql xamp, indicando nombre de la tabla y sus atributos
        $instruccion_SQL = "INSERT INTO formulariosdecitas (cedula, usuario, fecha, hora, motivo)
                              VALUES ('$cedula','$usuario','$fecha','$hora','$motivo')";
                            
                            
        $resultado = mysqli_query($connection,$instruccion_SQL);


        
$result = mysqli_query($connection,$consulta);
if(!$result) 
{
    echo "No se ha podido realizar la consulta";
}
else

mysqli_close( $connection );

   //echo "Fuera " ;

    

    ?>





