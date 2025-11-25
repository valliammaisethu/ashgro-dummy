// TODO: use proper folder structure once the code moved to separate repo

import React, { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IconClose } from "obra-icons-react";
import { Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams } from "react-router-dom";

import { ChatbotService } from "src/services/Chatbot/chatbotService.service";
import chatbotProfile from "src/assets/images/chatbotProfile.webp";
import { apiResonse, CHAT_TYPE, CHATBOT_CONSTANTS } from "./constants";
import { SlotItem } from "src/models/response.model";

import styles from "./chatbot.module.scss";

interface ChatbotMessage {
  id?: number;
  sender?: string;
  text?: string;
  slots?: SlotItem[];
  typing?: boolean;
}

const {
  idleWarning,
  placeholder,
  idleWarningTime,
  idleAutoCloseTime,
  closeEvent,
  expandEvent,
  resizeEvent,
  iconColor,
  profileAlt,
} = CHATBOT_CONSTANTS;

const { BOT, USER } = CHAT_TYPE;

const Chatbot = () => {
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [input, setInput] = useState("");
  const [sessionId] = useState(uuidv4());
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);

  const [searchParams] = useSearchParams();
  const clubId = searchParams.get("clubId") ?? "";

  const { getBotResponse, getClubProfile } = ChatbotService();
  const { mutateAsync, isPending: isTyping } = useMutation(getBotResponse());

  const { data } = useQuery(getClubProfile(clubId));

  const resetIdleTimer = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);

    idleTimer.current = setTimeout(() => {
      setMessages((prev) => [...prev, { typing: true, sender: BOT }]);

      setTimeout(() => {
        setMessages((prev) => prev.filter((m) => !m.typing));
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), sender: BOT, text: idleWarning },
        ]);
      }, 900);

      idleTimer.current = setTimeout(() => {
        setMessages([]);
        window.parent.postMessage({ type: closeEvent }, "*");
      }, idleAutoCloseTime);
    }, idleWarningTime);
  };

  const handleBotResponse = async (
    slotId?: number,
    defaultMessage?: string,
  ) => {
    setMessages((prev) => [...prev, { typing: true, sender: BOT }]);
    const { data } = await mutateAsync({
      message: input?.length ? input : defaultMessage,
      sessionId,
      clubId,
      slotId,
    });

    setMessages((prev) => prev.filter((m) => !m.typing));

    const botReply = {
      id: Date.now() + 1,
      sender: BOT,
      text: data?.response,
      slots: data?.slots,
    };

    setMessages((prev) => [...prev, botReply]);
    resetIdleTimer();

    window.parent.postMessage(
      { type: resizeEvent, value: document.body.scrollHeight },
      "*",
    );
  };

  const sendMessage = () => {
    if (!input.trim() || isTyping) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: USER, text: input.trim() },
    ]);

    setInput("");
    resetIdleTimer();
    handleBotResponse();

    window.parent.postMessage(
      { type: resizeEvent, value: document.body.scrollHeight },
      "*",
    );
  };

  const closeChat = () => {
    setMessages([]);
    window.parent.postMessage({ type: closeEvent }, "*");
  };

  const handleGreeting = async () => {
    // to use HI or Hello
    await handleBotResponse(undefined, "hi");
    resetIdleTimer();
  };

  const handleSlotTimeRange = (id?: number) => {
    resetIdleTimer();
    handleBotResponse(id, "I need to book this slot");
  };

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);

    const h = scrollRef.current?.scrollHeight || 0;
    const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(
      navigator.userAgent,
    );

    if (!isMobileDevice && h > 430) {
      window.parent.postMessage({ type: expandEvent }, "*");
    }
  }, [messages]);

  useEffect(() => {
    handleGreeting();

    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <div className={styles.headerProfile}>
          <img
            src={data?.data?.clubLogo ?? apiResonse.profileIcon}
            alt={profileAlt}
            className={styles.clubLogo}
          />
          <p className={styles.profileName}>
            {data?.data?.clubName ?? apiResonse.name}
          </p>
        </div>

        <div onClick={closeChat} className={styles.closeIcon}>
          <IconClose color={iconColor} size={24} strokeWidth={2.25} />
        </div>
      </div>

      <div className={styles.messages} ref={scrollRef}>
        {messages.map((msg, index) => {
          const isBot = msg.sender === BOT;

          return (
            <div
              key={msg.id || `typing-${index}`}
              className={isBot ? styles.botMessage : styles.userMessage}
            >
              {isBot && (
                <div className={styles.avatarWrapper}>
                  <img
                    src={chatbotProfile}
                    alt={profileAlt}
                    className={styles.avatar}
                  />
                </div>
              )}

              {msg.typing ? (
                <div className={styles.typingBubble}>
                  {[...Array(3)].map((_, i) => (
                    <span key={i}></span>
                  ))}
                </div>
              ) : (
                <div className={styles.messageTxt}>
                  <p>{msg.text}</p>

                  {Array.isArray(msg.slots) && msg.slots.length > 0 && (
                    <div className={styles.slotContainer}>
                      <div className={styles.slotGrid}>
                        {msg.slots.map((slot) => {
                          const isLast = msg === messages[messages.length - 1];

                          return (
                            <p
                              key={slot.id}
                              className={styles.slotItem}
                              onClick={() =>
                                isLast && handleSlotTimeRange(slot.id)
                              }
                            >
                              {slot.startTime} - {slot.endTime}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.inputWrapper}>
        <Input
          className={styles.chatInput}
          placeholder={placeholder}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            resetIdleTimer();
          }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          suffix={
            <div
              className={`${styles.sendBtn} ${isTyping ? styles.disabledSend : ""}`}
              onClick={sendMessage}
            >
              <SendOutlined disabled={isTyping} />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Chatbot;
