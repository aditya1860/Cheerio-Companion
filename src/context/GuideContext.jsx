import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { templates } from '../data/mockData';

const GuideContext = createContext(null);

const INITIAL_STATE = {
  isOpen: false,
  currentView: 'HELP_TOPICS',
  activeTemplate: null,
  messages: [],
  editedSuggestion: '',
  demoMode: null,
  notifyPreference: { whatsapp: true, email: false },
  campaignScheduled: false,
  toast: null,
  feedbackGiven: null,
};

function guideReducer(state, action) {
  switch (action.type) {
    case 'OPEN_GUIDE': {
      const template = action.payload || null;
      const diwaliTemplate = templates.find((t) => t.id === 'diwali_offer_v1');
      let view = 'HELP_TOPICS';
      let activeTemplate = template;

      if (state.demoMode === 'EMPTY') {
        view = 'HELP_TOPICS';
        activeTemplate = null;
      } else if (state.demoMode === 'LOADING') {
        view = 'LOADING';
        activeTemplate = template || diwaliTemplate;
      } else if (state.demoMode === 'LOW_CONFIDENCE') {
        view = 'LOW_CONFIDENCE';
        activeTemplate = template || diwaliTemplate;
      } else if (template) {
        view = 'CONVERSATION';
        activeTemplate = template;
      }

      return {
        ...state,
        isOpen: true,
        currentView: view,
        activeTemplate,
        editedSuggestion: activeTemplate?.suggestedBody || '',
        messages: [],
        feedbackGiven: null,
        campaignScheduled: false,
      };
    }

    case 'CLOSE_GUIDE':
      return { ...state, isOpen: false };

    case 'SET_VIEW':
      return { ...state, currentView: action.payload };

    case 'SET_DEMO_MODE':
      return { ...state, demoMode: action.payload };

    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };

    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };

    case 'SET_EDITED_SUGGESTION':
      return { ...state, editedSuggestion: action.payload };

    case 'SET_ACTIVE_TEMPLATE':
      return {
        ...state,
        activeTemplate: action.payload,
        editedSuggestion: action.payload?.suggestedBody || '',
      };

    case 'SET_NOTIFY_PREFERENCE':
      return {
        ...state,
        notifyPreference: { ...state.notifyPreference, ...action.payload },
      };

    case 'SET_CAMPAIGN_SCHEDULED':
      return { ...state, campaignScheduled: action.payload };

    case 'SET_FEEDBACK':
      return { ...state, feedbackGiven: action.payload };

    case 'SHOW_TOAST':
      return { ...state, toast: { message: action.payload.message, type: action.payload.type } };

    case 'DISMISS_TOAST':
      return { ...state, toast: null };

    case 'RESET':
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}

export function GuideProvider({ children }) {
  const [state, dispatch] = useReducer(guideReducer, INITIAL_STATE);

  const openGuide = useCallback((template) => {
    dispatch({ type: 'OPEN_GUIDE', payload: template || null });
  }, []);

  const closeGuide = useCallback(() => {
    dispatch({ type: 'CLOSE_GUIDE' });
  }, []);

  const setView = useCallback((view) => {
    dispatch({ type: 'SET_VIEW', payload: view });
  }, []);

  const setDemoMode = useCallback((mode) => {
    dispatch({ type: 'SET_DEMO_MODE', payload: mode });
  }, []);

  const addMessage = useCallback((msg) => {
    dispatch({ type: 'ADD_MESSAGE', payload: msg });
  }, []);

  const setMessages = useCallback((msgs) => {
    dispatch({ type: 'SET_MESSAGES', payload: msgs });
  }, []);

  const setEditedSuggestion = useCallback((text) => {
    dispatch({ type: 'SET_EDITED_SUGGESTION', payload: text });
  }, []);

  const setActiveTemplate = useCallback((template) => {
    dispatch({ type: 'SET_ACTIVE_TEMPLATE', payload: template });
  }, []);

  const setNotifyPreference = useCallback((pref) => {
    dispatch({ type: 'SET_NOTIFY_PREFERENCE', payload: pref });
  }, []);

  const setCampaignScheduled = useCallback((val) => {
    dispatch({ type: 'SET_CAMPAIGN_SCHEDULED', payload: val });
  }, []);

  const setFeedback = useCallback((val) => {
    dispatch({ type: 'SET_FEEDBACK', payload: val });
  }, []);

  const showToast = useCallback((message, type = 'info') => {
    dispatch({ type: 'SHOW_TOAST', payload: { message, type } });
    setTimeout(() => {
      dispatch({ type: 'DISMISS_TOAST' });
    }, 4500);
  }, []);

  const dismissToast = useCallback(() => {
    dispatch({ type: 'DISMISS_TOAST' });
  }, []);

  const resetGuide = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const value = {
    ...state,
    openGuide,
    closeGuide,
    setView,
    setDemoMode,
    addMessage,
    setMessages,
    setEditedSuggestion,
    setActiveTemplate,
    setNotifyPreference,
    setCampaignScheduled,
    setFeedback,
    showToast,
    dismissToast,
    resetGuide,
  };

  return <GuideContext.Provider value={value}>{children}</GuideContext.Provider>;
}

export function useGuide() {
  const ctx = useContext(GuideContext);
  if (!ctx) throw new Error('useGuide must be used within a GuideProvider');
  return ctx;
}

export default GuideContext;
