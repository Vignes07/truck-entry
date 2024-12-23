import {Headset} from 'lucide-react'

function ChatWidget() {
    return (
        <div className="fixed bottom-5 right-5 bg-[#636ae8] p-3 rounded-full cursor-pointer">
            <div className="flex items-center justify-center">
                <span className="text-white text-xs"><Headset /></span>
            </div>
        </div>
    );
}

export default ChatWidget;