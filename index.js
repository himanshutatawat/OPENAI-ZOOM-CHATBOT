//Required for running the server

const puppeteer = require('puppeteer');
const { spawn } = require('child_process');


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

  
//Change the meetingUrl to your meeting link
  const meetingUrl = 'your_zoom_meeting_link';
//Call the bot function
  bot(meetingUrl);
  