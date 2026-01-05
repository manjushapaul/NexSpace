'use client'

import React, { useEffect } from 'react';

const ChatWidget = () => {
  useEffect(() => {
    // Check if script is already loaded to prevent duplicates
    const existingScript = document.querySelector('script[src="https://ai-chatbot-saas-vert.vercel.app/chat.js"]');
    if (existingScript) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://ai-chatbot-saas-vert.vercel.app/chat.js';
    script.setAttribute('data-widget-id', '8ad8a258e51e40f2a3fb78cfcfb75a63');
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[src="https://ai-chatbot-saas-vert.vercel.app/chat.js"]');
      if (scriptToRemove && scriptToRemove.parentNode) {
        scriptToRemove.parentNode.removeChild(scriptToRemove);
      }
    };
  }, []);

  return null;
};

export default ChatWidget;

