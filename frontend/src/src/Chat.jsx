import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default () => {
    const inputRef = useRef(null);
    const chatRef = useRef(null);
    const [socket, setSocket] = useState(null);
    const [chat, setChat] = useState(null);
    const roomId = 2;

    useEffect(() => {
        if (!socket) {
            setSocket(io(`ws://localhost:4000/room/${roomId}`));
        } else {
            socket.on(`${roomId}`, (data) => {
                setChat(data);
            });

            const getChats = async () => {
                const response = await fetch(
                    `http://localhost:4000/room/${roomId}`,
                    {
                        method: "get",
                        credentials: "include",
                    }
                );
                const result = await response.json();
                console.log(result);

                result.forEach((chat) => {
                    const chatDiv = document.createElement("div");
                    chatDiv.innerText = `${chat.user.nickname}: ${chat.content}`;
                    chatRef.current.appendChild(chatDiv);
                });
            };
            getChats();
        }
    }, [socket]);

    useEffect(() => {
        if (chat) {
            const chatDiv = document.createElement("div");
            chatDiv.innerText = `${chat.user.nickname}: ${chat.content}`;
            chatRef.current.appendChild(chatDiv);
        }
    }, [chat]);

    const sendMessage = () => {
        socket.emit("send-message", {
            user: {
                id: 5,
            },
            content: inputRef.current.value,
        });
        setChat({
            user: { nickname: "my message" },
            content: inputRef.current.value,
        });
    };

    return (
        <div>
            <input ref={inputRef} />
            <button onClick={sendMessage}>send message</button>
            <div ref={chatRef}></div>
        </div>
    );
};
