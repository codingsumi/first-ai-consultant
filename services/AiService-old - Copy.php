<?php
namespace Services;

class AiService
{
    private $openAIKey;
    public function __construct()
    {
        $this->openAIKey = getenv('OPENAI_API_KEY') ?: '';
    }
    public function getAiResponse($input)
    {
        // Replace with actual API logic
        return "AI says: You said '$input'. How can I help?";
    }

    public function searchOpenAiStream($content, $ai_model = 'gpt-4o-mini')
    {

        try {

            // $prompt = 'You are trusted navigator here at Health Universe. You are designed for healthcare professionals.
            //            Plese provide the response in HTML and make sure <html> <title> and <body> should be excluded in response.
            //            Here is user message: '.$content;
            $prompt = 'You are the trusted navigator here at Health Universe. You are designed for healthcare professionals. Please provide your response in HTML format, making sure to exclude the <html>, <title>, and <body> tags in your response. Ensure the information is clear, accurate, and helpful for healthcare professionals seeking guidance. Be concise and relevant to the healthcare field. 

                       Here is user message: ' . $content;


            $data = array(
                'model' => $ai_model,
                'messages' => array(
                    array(
                        'role' => 'user',
                        'content' => array(
                            array(
                                'type' => 'text',
                                'text' => $prompt
                            ),

                        )
                    ),
                ),

                'max_tokens' => 500
            );

            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, 'https://api.openai.com/v1/chat/completions');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

            $headers = array(
                'Content-Type: application/json',
                'Authorization: Bearer ' . $this->openAIKey
            );

            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

            $result = curl_exec($ch);
            if (curl_errno($ch)) {
                echo 'Error:' . curl_error($ch);
            }
            curl_close($ch);

            $jsonData = json_decode($result, true);
            $final_output = @$jsonData['choices'][0]['message']['content'];
            if (empty($final_output)) {
                $final_output = $jsonData['error']['message'];
            }
            return array('status' => 'success', 'res' => $final_output);

        } catch (\Exception $e) {
            return $e->getMessage();
        }

    }
}
?>
