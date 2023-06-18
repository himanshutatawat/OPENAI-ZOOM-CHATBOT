# OPENAI ZOOM CHATBOT

This project demonstrates an integration of a chatbot with a Zoom meeting using Python and Puppeteer. The chatbot uses the OpenAI GPT-3.5 model for generating responses.

## Prerequisites

- Node.js and npm installed on your system.
- Python 3.x installed on your system.
- Access to the OpenAI API (requires an API key).
- Google Chrome browser installed.

## Installation

1. Clone the repository: `git clone https://github.com/your-username/zoom-meeting-chatbot.git`
2. Navigate to the project directory: `cd zoom-meeting-chatbot`
3. Install the required Node.js dependencies: `npm install`
4. Install the required Python dependencies: `pip install -r requirements.txt`
   - Make sure you have activated your Python virtual environment, if you're using one.
   - Note: You may need to manually install Puppeteer's dependencies. Refer to the Puppeteer documentation for more information.
5. Set the OpenAI API key: Replace `YOUR_API_KEY` in `chatbot.py` with your actual API key.

## Usage

1. Modify the `meetingUrl` variable in `index.js` to your Zoom meeting link.
2. Start the Zoom meeting chatbot by running: `node index.js`
3. The chatbot will join the Zoom meeting, interact with participants, and generate responses using the OpenAI GPT-3.5 model.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to open a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
