import { nanoid } from "nanoid";
import { Link } from "../models/Link.js";

export const getLinks = async(req, res) => {
    try {
        const links = await Link.find({ uid: req.uid })

        return res.json({links});        
    } catch (error) {
        return res.status(500).json({ status: false, message: "error"})
    }
}

export const createLink = async (req, res) => {
    try {
        const { longLink } = req.body

        const link = new Link({ longLink, nanoLink: nanoid(6), uid: req.uid })
        await link.save();

        return res.status(201).json({ link })
    } catch (error) {
        return res.status(500).json({status: false, message: "Error de servidor"})
    }
}