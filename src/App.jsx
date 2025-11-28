import { useState,useRef,useEffect } from 'react'
import {Chatbot} from 'supersimpledev'
import './App.css'


 

function ChatInput({chatMessages,setChatMessages}){

        const [inputText,setInputText]=useState('')

        function saveInputText(event){
            setInputText(event.target.value);
         }
   
         async function sendMessage(){
            // We can put this at the top of the function or
          // after the first setChatMessages(). Both work.
          setInputText('');

            const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: 'user',
                id:crypto.randomUUID()
            }
         ]

           //  setChatMessages(newChatMessages);

           setChatMessages([
            ...newChatMessages,
            // This creates a temporary Loading... message.
            // Because we don't save this message in newChatMessages,
            // it will be remove later, when we add the response.
            {
                message:<img src="loading-spinner.gif" className="loading-spinner"/>,
                sender:'robot',
                id:crypto.randomUUID()
            }
           ])
             
      
         const response=await Chatbot.getResponseAsync(inputText);
           
            setChatMessages([
            ...newChatMessages,
            {
                message: response,
                sender: 'robot',
                id:crypto.randomUUID()
            }
         ]);
             

        //  setInputText('')

         }
   
         function handleKeydown(event){
              if(event.key==='Enter'){
                sendMessage()
              }else if(event.key==='Escape'){
                setInputText('')
              }
         }
        

        return(
            <div className="chat-input-container">
              <input  placeholder=" Send a message to Chatbot" size="30" onChange={saveInputText} value={inputText} onKeyDown={handleKeydown} className='chat-input'/>
               <button onClick={sendMessage} className="send-button"> Send</button>
            </div>
        )
    }


   function ChatMessage({message,sender}){
    // const message=props.message;
    // const sender=props.sender;
   
   //const {message,sender}=props; // descturing --> we can further make this shorter by paasing this directly in ptops place in compennet
/*
    if(sender==='robot'){
        return(
            <div>
          
            <img src="robot.png" width="50" height="50"/>
              {message}
            </div>
        )
    }
    */
        // shortcut for this using && in JSX
      
    return(
        <div className={sender==='user'?'chat-message-user':'chat-message-robot'}>
        {sender === 'robot'&&  <img src="robot.png" className="chat-message-profile"/>}

        <div className="chat-message-text">
         {message}
         </div>

       { sender==='user' && <img src="user.png" className="chat-message-profile"/> } 
        </div>
    )
   }

    // To use a function as a hook, the function name must
      // start with "use".
   function useAutoScroll(dependencies){
        // It's highly recommend to rename this to something
        // more generic like containerRef. This will make the
        // code make more sense if we ever reuse this code in
        // other components.

            
        const containerRef=useRef(null);

        //here we used useRef and useEffect for to autoscroll when user entered the input

         useEffect(()=>{
            const containerElem = containerRef.current;
            if(containerElem){
               containerElem.scrollTop=containerElem.scrollHeight;
            }
         },dependencies);
         
         return containerRef;
   }


function ChatMessages({chatMessages}){
   
   const chatMessagesRef= useAutoScroll([chatMessages])
    return(
        <div className='chat-messages-container' ref={chatMessagesRef}>

         {chatMessages.map((chatMessage)=>{
             return(  
               <ChatMessage 
               message= {chatMessage.message}
               sender={chatMessage.sender}
               key ={chatMessage.id}
              
              />
        )       
    })
}
  
        </div>
    )
}
 


function App(){

     const [chatMessages,setChatMessages] = useState([])

     
    
   // the above desctruing is shorcut for below line

   // const [chatMessages,setChatMessages]=array

    //the baove is shortcut for below 2 lines
   //const chatMessages= array[0];
   //const setChatMessages=array[1];

        return(
             <div className='app-container'>
               {chatMessages.length === 0 && (
                <p className="welcome-message">Welcome to the chatbot project! Send a message using the textbox below</p>
            )}
           
            <ChatMessages 
            chatMessages={chatMessages}/>

             <ChatInput
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            />
                     
        </div>
    
        )

    }
       
export default App
