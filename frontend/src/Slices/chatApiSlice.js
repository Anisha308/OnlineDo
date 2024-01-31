import { apiSlice } from "./apiSlice";

const CHAT_URL = "/api/chat";
const MESSAGE_URL = "/api/message";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: (data) => ({
        url: `${CHAT_URL}/createChat`,
        method: "POST",
        body: data,
      }),
    }),
    userChats: builder.mutation({
      query: (userId) => ({
        url: `${CHAT_URL}/${userId}`,
        method: "GET",
      }),
    }),
    getMessages: builder.mutation({
      query: (chatId) => ({
        url: `${MESSAGE_URL}/${chatId}`,
        method: "GET",
      }),
    }),
    addMessages: builder.mutation({
      query: (data) => ({
        url: `${MESSAGE_URL}/addMessage`,
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.mutation({
      query: (userId) => ({
        url: `${CHAT_URL}/getUser/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateChatMutation,
  useUserChatsMutation,
  useGetMessagesMutation,
  useAddMessagesMutation,
  useGetUserMutation,
} = chatApiSlice;
