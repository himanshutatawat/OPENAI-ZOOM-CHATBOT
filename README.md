# OPENAI ZOOM CHATBOT

This project demonstrates an integration of a chatbot with a Zoom meeting using Python, Puppeteer, and OpenAI GPT-3.5 model. The chatbot can join a Zoom meeting, interact with participants, convert speech to text, generate responses using GPT-3, and convert text to speech.

## Prerequisites

- Node.js and npm installed on your system.
- Python 3.x installed on your system.
- Access to the OpenAI API (requires an API key).
- Google Cloud Platform (GCP) account with Speech-to-Text and Text-to-Speech APIs enabled.
- Google Cloud SDK installed on your system.
- Google Chrome browser installed.

## Installation

1. Clone the repository: `git clone https://github.com/himanshutatawat/OPENAI-ZOOM-CHATBOT.git`
2. Navigate to the project directory: `cd OPENAI-ZOOM-CHATBOT`
3. Install the required Node.js dependencies: `npm install`
4. Install the required Python dependencies: `pip install -r requirements.txt`
   - Make sure you have activated your Python virtual environment if you're using one.
   - Note: You may need to manually install Puppeteer's dependencies. Refer to the Puppeteer documentation for more information.
5. Set up Google Cloud credentials:
   - Create a service account key in your GCP project and download the JSON key file.
   - Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the path of the downloaded key file.

## Usage

1. Set up the OpenAI API key:
   - Replace `your_openai_api_key` with your actual OpenAI API key in `index.js`.
2. Set up the Google Cloud project and API credentials:
   - Replace `your_project_id` and `path/to/service-account-key.json` with your actual project ID and path to the service account key file in `index.js`.
3. Modify the `meetingUrl` variable in `index.js` to your Zoom meeting link.
4. Start the Zoom meeting chatbot by running: `npm run dev`
5. Open your web browser and navigate to the provided URL (usually http://localhost:3000).
6. Enter the Zoom meeting link in the text box and submit the form.
7. The chatbot will join the Zoom meeting, interact with participants, and generate responses using the OpenAI GPT-3.5 model.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to open a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
