<?php
namespace Controllers;
require_once __DIR__ . '/../services/AiService.php';
use Services\AiService;

class AiController
{
    private $aiService;

    public function __construct()
    {
        $this->aiService = new AiService();
    }

    public function processInput()
    {
        header('Content-Type: text/event-stream');
        header('Cache-Control: no-cache');
        header('Connection: keep-alive');

        // Prevent buffer issues
        if (ob_get_level())
            ob_end_clean();

        $input = $_GET['input'] ?? '';  // Changed from POST to GET

        if (empty($input)) {
            $this->sendSSEMessage('error', 'No input provided');
            exit;
        }

        try {
            $aiService = new \Services\AiService();

            // Start the stream
            $this->sendSSEMessage('start', 'Starting response generation');

            // Get AI response
            $response = $aiService->searchOpenAiStream($input);

            if ($response['status'] === 'success') {
                // Send the response in chunks
                $chunks = str_split($response['res'], 10); // Split into smaller chunks
                foreach ($chunks as $chunk) {
                    $this->sendSSEMessage('chunk', $chunk);
                    flush();
                    usleep(50000); // Add a small delay between chunks
                }

                // Send completion message
                $this->sendSSEMessage('complete', 'Response complete');
            } else {
                $this->sendSSEMessage('error', $response['res']);
            }
        } catch (\Exception $e) {
            $this->sendSSEMessage('error', $e->getMessage());
        }

        exit;
    }

    private function sendSSEMessage($event, $data)
    {
        echo "event: {$event}\n";
        echo "data: " . json_encode($data) . "\n\n";
        flush();
    }

    public function index()
    {
        return ['success' => true, 'response' => "Default method for AiController."];
    }
}
