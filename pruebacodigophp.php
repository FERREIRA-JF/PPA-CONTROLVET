<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
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
      td, th {
        text-align: center;
        align-content: center;
        border: solid 1px #7e7c7c;
        padding: 2px;
      }
    </style>
</head>
<body>
    <center>
    <?php
    // Validamos datos del servidor
    $user = "root";
    $pass = "";
    $host = "localhost";

    // Conectamos a la base de datos
    $connection = mysqli_connect($host, $user, $pass);

    // Verificamos la conexión a la base de datos
    if (!$connection) {
        die("No se ha podido conectar con el servidor: " . mysqli_connect_error());
    }

    // Indicamos el nombre de la base datos
    $datab = "controlvet";

    // Seleccionamos la base de datos
    $db = mysqli_select_db($connection, $datab);
    if (!$db) {
        die("No se ha podido encontrar la base de datos");
    }

    // Hacemos llamado al input del formulario
    $cedula = $_POST["cedula"];
    $usuario = $_POST["usuario"];
    $fecha = $_POST["fecha"];
    $hora = $_POST["hora"];
    $motivo = $_POST["motivo"];

    // Insertamos datos en la base de datos
    $instruccion_SQL = "INSERT INTO formulariosdecitas (cedula, usuario, fecha, hora, motivo) VALUES ('$cedula', '$usuario', '$fecha', '$hora', '$motivo')";

    // Ejecutamos la consulta
    if (mysqli_query($connection, $instruccion_SQL)) {
        echo "<b><h3>Su cita se ha registrado exitosamente</h3></b>";
        
        // Redireccionamos después de confirmar que se ha registrado correctamente
        header("Location: ../controlvet/mensaje.html");
        exit();
    } else {
        echo "Error al registrar la cita: " . mysqli_error($connection);
    }

    // Cerramos la conexión
    mysqli_close($connection);
    ?>
    <a href="aggcita.php" class="btn btn-primary">Volver</a>
    </center>
</body>
</html>
