<?php

// Autoload required files
require_once __DIR__ . '/controllers/AiController.php';
use Controllers\AiController;

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'processInput') {
    $aiController = new AiController();
    $aiController->processInput();
}

// $action = $_REQUEST['action'];
// if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($action)) {
//     $aiController = new AiController();
//     switch ($action) {
//         case 'processInput':
//             $aiController->processInput();
//             break;
//         default:
//             echo 'Invalid action';
//     }
// }