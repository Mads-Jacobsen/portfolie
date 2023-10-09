<?php
$modtager_email = "mail@mads-jacobsen.dk";

// Tjek om formularen blev indsendt
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Indsamle formdata fra POST-anmodningen
    $navn = $_POST["navn"];
    $email = $_POST["email"];
    $besked = $_POST["besked"];

    // Validering på serversiden (eksempel: alle felter er påkrævet)
    $fejl = array();
    if (empty($navn)) {
        $fejl[] = "Navn skal udfyldes.";
    }
    if (empty($email)) {
        $fejl[] = "Email skal udfyldes.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $fejl[] = "Ugyldig e-mail-adresse.";
    }
    if (empty($besked)) {
        $fejl[] = "Besked skal udfyldes.";
    }

    // Hvis der ikke er nogen fejl, send e-mailen
    if (empty($fejl)) {
        $emne = "Besked fra kontaktformular";
        $besked_indhold = "Navn: $navn\n";
        $besked_indhold .= "Email: $email\n";
        $besked_indhold .= "Besked:\n$besked\n";

        // Send e-mailen
        if (mail($modtager_email, $emne, $besked_indhold)) {
            $respons = array("success" => true, "besked" => "Din besked er blevet sendt. Jeg vender tilbage hurtigst muligt!.");
            echo json_encode($respons);
        } else {
            $respons = array("success" => false, "besked" => "Der opstod en fejl under afsendelse af din besked. Prøv igen senere.");
            echo json_encode($respons);
        }
    } else {
        // Hvis der er fejl, send en fejlbesked tilbage
        $respons = array("success" => false, "fejl" => $fejl);
        echo json_encode($respons);
    }
}
?>
