import { create } from 'zustand';
import { produce } from 'immer';

// Define an interface for your state
interface MessageState {
  allChatMessages: any[];
  currentChatMessage: string;
  setAllChatMessages: (value: any[]) => void;
  currentUser: string;
  setCurrentUser: (value: string) => void;
  setCurrentChatMessage: (value: string) => void;
  addMessage: (message: any) => void;
}

// Use the interface in your create function
export const useMessageStore = create<MessageState>(set => ({
  allChatMessages: [],
  currentChatMessage: '',
  currentUser: "",
  setCurrentUser: (value) => set(state => ({ currentUser: value })),
  setAllChatMessages: (value) => set(state => ({ allChatMessages: value })),
  setCurrentChatMessage: (value) => set(state => ({ currentChatMessage: value })),
  addMessage: (message) =>
    set(
      produce(state => {
        state.allChatMessages.push(message);
      }),
    ),
}));
