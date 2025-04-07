import {create} from 'zustand'
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios"
import { useAuthstore } from './useAuthstore'


export const useChatstore=create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,

    getUsers:async () => {
        set({isUsersLoading:true})
        try {
            const res=await axiosInstance.get("/message/user")
            set({users:res.data})
        } catch (error) {
            toast.error("Error in getting users")
        }finally{
            set({isUsersLoading:false})
        }
    },

    getMessages:async (userId) => {
        set({isMessagesLoading:true})
        try {
            const res=await axiosInstance.get(`/message/${userId}`)
            set({messages:res.data})
        } catch (error) {
            toast.error("Error in getting messages")
        }finally{
            set({isMessagesLoading:false})
        }
    },
    sendMessage:async (messageData) => {
        const {selectedUser,messages} = get()
        try {
            const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData)
            set({messages:[...messages,res.data]})
        } catch (error) {
            toast.error("Error in sending messages")
        }
    },

    subscribeToMessages: () => {
        const {selectedUser}=get()
        if (!selectedUser) {
            return;
        }

        const socket = useAuthstore.getState().socket;

        socket.on("NewMessage",(newMessage)=>{
            if (newMessage.senderId !== selectedUser._id) {
                return;
            }
            set({
                messages:[...get().messages,newMessage],
            })
        })
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthstore.getState().socket;;
        socket.off("NewMessage")
    },

    setSelectedUser: (selectedUser) => {
        set({selectedUser})
    },
}))