import { Chat, Channel, ChannelHeader, Thread, Window } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

// Initialize Stream Chat client
const apiKey = '3yn5a69b8y7f';
const client = StreamChat.getInstance(apiKey);

function LiveChat() {
    return (
      <Chat client={client} theme="messaging light">
        <Channel>
          <Window>
            <ChannelHeader />
            <Thread />
          </Window>
        </Channel>
      </Chat>
    );
  }
  
export default LiveChat;