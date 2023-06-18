

// Import required modules  
const { Configuration, OpenAIApi } = require("openai");
const { SpeechClient } = require('@google-cloud/speech');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
// Google Cloud Speech-to-Text configuration
const speechClient = new SpeechClient({
  projectId: 'your_project_id',
  keyFilename: 'path/to/service-account-key.json',
});

// Google Cloud Text-to-Speech configuration
const textToSpeechClient = new TextToSpeechClient({
  projectId: 'your_project_id',
  keyFilename: 'path/to/service-account-key.json',
});

// OpenAI GPT-3 configuration
const openAiApiKey = 'your_openai_api_key';

const configuration = new Configuration({
  apiKey: openAiApiKey,
});
const openai = new OpenAIApi(configuration);

// Process audio stream and convert speech to text
async function convertSpeechToText(audioStream) {
  const audio = {
    content: audioStream,
  };

  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  };

  const request = {
    audio: audio,
    config: config,
  };

  const [response] = await speechClient.recognize(request);
  const transcription = response.results.map((result) => result.alternatives[0].transcript).join('\n');

  return transcription;
}

// Generate GPT-3 response



// Generate GPT-3 response

async function generateGpt3Response(text) {
  const prompt = `You: Hi bot how are you? ${text}\nAI:`;

  try {
    const requestBody = {
      model: "text-davinci-002",
      prompt,
      temperature: 0.6,
      max_tokens: 100,
    };

    const response = await openai.createCompletion(requestBody);
    const gpt3Response = response.choices[0].text.trim();

    return gpt3Response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

  
  
  

// Convert text to speech
async function convertTextToSpeech(text) {
  const request = {
    input: { text },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await textToSpeechClient.synthesizeSpeech(request);
  return response.audioContent;
}





// Join a Zoom meeting
async function joinZoomMeeting(meetingLink) {
    try {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
  
      await page.goto(meetingLink);
  
      await page.waitForTimeout(15000);
  
      await page.click('a[download]');
  
      await page.waitForTimeout(15000);
  
      await page.click('a[web_client]');
  
      await page.waitForTimeout(13000);
  
      // Find the input field for entering the name
      const nameInputSelector = '#input-for-name';

      // Enter your bot name by changing Your Name to your bot name
      await page.type(nameInputSelector, 'Your Name');
  
      // Click the "Unmute" button and allow access to the microphone
      await page.click('button[aria-label="Join Audio"]');
  
      console.log('Waiting for microphone permission prompt...');
  
      // Wait for the microphone permission dialog to appear
      await page.waitForSelector('dialog', { timeout: 30000 }).then(async () => {
        // Simulate user interaction to grant permission
        await page.evaluate(() => {
          const dialog = document.querySelector('dialog');
          dialog.querySelector('button[value="allow"]').click();
        });
        console.log('Microphone access granted.');
      }).catch((error) => {
        console.error('Failed to grant microphone access:', error);
      });
  
      await page.waitForTimeout(15000); // Adjust the wait time if needed
  
      // Join the meeting by clicking the "Join" button
      await page.click('button.preview-join-button:not(.disabled)');
  
      await page.waitForTimeout(10000);
  
      console.log('Joined Zoom meeting successfully!');
  
      // Return the browser and page instances
      return { browser, page };
    } catch (error) {
      console.error('Failed to join Zoom meeting:', error);
    }
  }
  
  
  
  // Main function to control the bot flow
  async function bot(meetingLink) {
      let browser;
      try {
        const meeting = await joinZoomMeeting(meetingLink);
        console.log('Bot successfully joined the meeting.');
    
        const { browser: botBrowser, page } = meeting; // Destructure the browser and page instances
        browser = botBrowser; // Assign the browser instance to the outer scope
    
        // Wait for some time to allow conversation to happen
        await page.waitForTimeout(60000);
    
        // Call the Python script to start the chatbot
        const pythonProcess = spawn('python', ['chatbot.py']);
    
        // Handle output from the Python process
        pythonProcess.stdout.on('data', (data) => {
          console.log(`Python stdout: ${data}`);
          // Perform any actions with the output, such as sending it to Zoom or processing it further
          // For example, you can use the output as input for the text-to-speech conversion and send it to Zoom
        });
    
        // Handle errors from the Python process
        pythonProcess.stderr.on('data', (data) => {
          console.error(`Python stderr: ${data}`);
        });
    
        // Handle the Python process exit event
        pythonProcess.on('close', (code) => {
          console.log(`Python process exited with code ${code}`);
          // Perform any cleanup or post-processing tasks here
    
          // Close the browser after the Python program has exited
          browser.close().then(() => {
            console.log('Browser closed.');
          }).catch((error) => {
            console.error('Failed to close the browser:', error);
          });
        });
    
        // Wait for some time before ending the meeting
        await page.waitForTimeout(30000);
    
        console.log('Meeting ended.');
      } catch (error) {
        console.error('Bot execution failed:', error);
        if (browser) {
          browser.close().then(() => {
            console.log('Browser closed.');
          }).catch((error) => {
            console.error('Failed to close the browser:', error);
          });
        }
      }
    }


    // Function to handle form submission
async function handleSubmit(event) {
  event.preventDefault();

  // Get the input value from the text box
  const meetingLinkInput = document.getElementById('meeting-link');
  const meetingLink = meetingLinkInput.value;

  // Call the bot function with the meeting link
  bot(meetingLink);
}

  
// Attach form submission event listener
const form = document.getElementById('meeting-form');
form.addEventListener('submit', handleSubmit);
