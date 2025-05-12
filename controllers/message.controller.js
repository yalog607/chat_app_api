import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async(req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUserId = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        return res.status(200).json(filteredUserId);
    } catch (error) {
        console.log("Error in getUsersForSidebar controller", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const getMessages = async(req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        }) 
        return res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const sendMessage = async(req, res) => {
    try {
        const {id: receiverId} = req.params;
        const {text, image} = req.body;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        await newMessage.save();
        return res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}