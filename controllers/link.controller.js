import { nanoid } from "nanoid";
import { Link } from "../models/Link.js";

export const getLinks = async(req, res) => {
    try {
        const links = await Link.find({ uid: req.uid })

        return res.status(200).json({ status: true, message: "Peticion Exitosa", links});        
    } catch (error) {
        return res.status(500).json({ status: false, message: error})
    }
}

export const getLinkById = async (req, res) => {
    try {
        const { linkId } = req.params;
        const link = await Link.findById(linkId);

        return res.status(200).json({ status: true, message: "Peticion Exitosa", link});
    } catch (error) {
        return res.status(500).json({status: false, message: error})
    }
}

export const createLink = async (req, res) => {
    try {
        let { longLink } = req.body
        if(!longLink.startsWith('https://')) {
            longLink = 'https://' + longLink;
        }
        const link = new Link({ longLink, nanoLink: nanoid(6), uid: req.uid })
        await link.save();

        return res.status(201).json({ link })
    } catch (error) {
        return res.status(500).json({status: false, message: "Error de servidor"})
    }
}