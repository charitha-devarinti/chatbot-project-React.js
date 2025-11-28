import { useState} from 'react'
import SpinnerGif from '../assets/image.png'
import {Chatbot} from 'supersimpledev'
import './ChatInput.css'
export function ChatInput({ chatMessages, setChatMessages }) {

    const [inputText, setInputText] = useState('')

    function saveInputText(event) {
        setInputText(event.target.value);
    }
    async function sendMessage() {
        // We can put this at the top of the function or
        // after the first setChatMessages(). Both work.
        setInputText('');

        const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: 'user',
                id: crypto.randomUUID()
            }
        ]

        //  setChatMessages(newChatMessages);

        setChatMessages([
            ...newChatMessages,
            // This creates a temporary Loading... message.
            // Because we don't save this message in newChatMessages,
            // it will be remove later, when we add the response.
            {
                message: <img src={SpinnerGif} className="loading-spinner" />,
                sender: 'robot',
                id: crypto.randomUUID()
            }
        ])


        const response = await Chatbot.getResponseAsync(inputText);

        setChatMessages([
            ...newChatMessages,
            {
                message: response,
                sender: 'robot',
                id: crypto.randomUUID()
            }
        ]);


        //  setInputText('')

    }

    function handleKeydown(event) {
        if (event.key === 'Enter') {
            sendMessage()
        } else if (event.key === 'Escape') {
            setInputText('')
        }
    }


    return (
        <div className="chat-input-container">
            <input placeholder=" Send a message to Chatbot" size="30" onChange={saveInputText} value={inputText} onKeyDown={handleKeydown} className='chat-input' />
            <button onClick={sendMessage} className="send-button"> Send</button>
        </div>
    )
}