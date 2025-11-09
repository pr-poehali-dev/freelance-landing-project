import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'other';
  time: string;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Здравствуйте! Я готов начать работу над вашим проектом.',
      sender: 'other',
      time: '14:30'
    },
    {
      id: 2,
      text: 'Отлично! Когда сможете начать?',
      sender: 'user',
      time: '14:32'
    }
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] glass shadow-2xl z-50 flex flex-col animate-fade-in">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                <Icon name="User" size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Алексей Иванов</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Онлайн
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-secondary"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Введите сообщение..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                size="icon"
                className="bg-primary hover:bg-primary/90"
              >
                <Icon name="Send" size={20} />
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 glow shadow-2xl z-50"
      >
        {isOpen ? <Icon name="X" size={24} /> : <Icon name="MessageCircle" size={24} />}
      </Button>
    </>
  );
};

export default ChatWidget;
