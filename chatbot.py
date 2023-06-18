import speech_recognition as sr
import win32com.client
import openai

# Create a speaker object using the win32com.client module
speaker = win32com.client.Dispatch("SAPI.SpVoice")

# Set the initial prompt for the AI chatbot
s = "Hello, I am an AI chatbot"

# Define the function for the AI chatbot
def ai(prompt):
    # Set the OpenAI API key
    openai.api_key = "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"
    
    # Set the text variable to store the response
    text = f"OpenAI response for Prompt: {prompt}\n****************************************\n\n"
    
    # Use the OpenAI Chat Completion API to generate a response
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are in a Zoom meeting and give a response of about 30 words."},
            {"role": "user", "content": prompt}
        ]
    )
    
    # Extract the generated response from the API response
    text += response["choices"][0]["message"]["content"]
    print(text)
    
    # Speak the response using the speaker object
    speaker.Speak(text)

# Define a function to take user voice input
def takeCommand():
    # Create a recognizer object from the speech_recognition module
    r = sr.Recognizer()
    
    # Use the microphone as the audio source
    with sr.Microphone() as source:
        # Set the pause threshold for speech recognition
        r.pause_threshold = 1
        
        # Listen to the audio input from the microphone
        audio = r.listen(source)
        
        try:
            # Use Google Speech Recognition to convert speech to text
            query = r.recognize_google(audio, language="en-in")
            print(f"User said: {query}")
            return query
        
        except sr.UnknownValueError:
            print("Speech recognition could not understand audio.")
            return "Voice not recognizable. Please try again."
        
        except sr.RequestError as e:
            print(f"Could not request results from Google Speech Recognition service; {e}")
            return "Could not request results from Google Speech Recognition service. Please try again."

# Main program execution
if __name__ == '__main__':
    print('Pycharm')
    
    # Speak the initial prompt
    speaker.Speak(s)
    
    while True:
        print("Listening...")
        
        # Take voice input from the user
        query = takeCommand().lower()
        
        if query == "voice not recognizable. please try again.":
            # If voice recognition fails, speak the error message and continue listening
            speaker.Speak(query)
            continue
        
        if query == "exit":
            # If the user says "exit", speak the exit message and break out of the loop
            speaker.Speak("Exiting the program. Goodbye!")
            break
        
        else:
            # Pass the user's input to the AI chatbot function
            ai(prompt=query)
