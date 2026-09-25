# Health Universe AI Consultant

A lightweight PHP chatbot interface for healthcare professionals. The app serves a chat UI, sends user messages to a PHP controller, and returns AI-generated medical guidance from the OpenAI API.

## Features

- PHP-based chat interface
- Server-Sent Events response streaming
- OpenAI API integration
- Voice input button and chat controls
- Healthcare-focused prompt formatting

## Project Structure

```text
.
├── controllers/
│   └── AiController.php
├── css/
│   └── styles.css
├── images/
├── js/
│   └── script.js
├── services/
│   └── AiService.php
├── index.php
└── routes.php
```

## Requirements

- PHP 7.4 or newer
- XAMPP, Apache, or another PHP-capable web server
- OpenAI API key
- PHP cURL extension enabled

## Setup

1. Clone the repository into your web server directory.

   ```bash
   git clone https://github.com/codingsumi/first-ai-consultant.git
   ```

2. Create a local environment file from the example.

   ```bash
   cp .env.example .env
   ```

3. Add your OpenAI API key to `.env`.

   ```text
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Make sure the environment variable is available to PHP.

   For local terminal-based PHP servers:

   ```bash
   export OPENAI_API_KEY="your_openai_api_key_here"
   ```

   For XAMPP/Apache, configure the variable in your Apache/PHP environment or load it before starting Apache.

5. Open the app in your browser.

   ```text
   http://localhost/ai-consultant/
   ```

## API Route

The app uses `routes.php` for AI requests:

```text
GET /routes.php?action=processInput&input=your-message
```

Responses are returned as Server-Sent Events.

## Security

Do not commit real API keys. Keep local secrets in `.env` or your server environment. The repository includes `.gitignore` rules to keep `.env` files out of Git.
