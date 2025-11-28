import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png'
import './ChatMessage.css'


export function ChatMessage({ message, sender }) {
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

    return (
        <div className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'

        }>
            {sender === 'robot' && (
                <img src={RobotProfileImage} className="chat-message-profile" />
            )}

            <div className="chat-message-text">
                {message}
            </div>

            {sender === 'user' && (
                <img src={UserProfileImage} className="chat-message-profile" />
            )}
        </div>
    )
}
