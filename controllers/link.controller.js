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

        if(!link) return res.status(404).json({ status: false, message: "El link no existe"})

        if(!link.uid.equals(req.uid)) return res.status(401).json({ status: false, message: "No esta autorizado"});

        return res.status(200).json({ status: true, message: "Peticion Exitosa", link});
    } catch (error) {
        if(error.kind === "ObjectId") {
            return res.status(403).json({status: false, message: "Formato incorrecto"})
        }

        return res.status(500).json({status: false, message: error.message})
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

export const removeLinkById = async (req, res) => {
    try {
        const { linkId } = req.params;

        const link = await Link.findById(linkId);

        if(!link) return res.status(404).json({ status: false, message: "El link no existe"})
        
        if(!link.uid.equals(req.uid)) return res.status(401).json({ status: false, message: "No esta autorizado"});
        await link.remove();

        return res.status(200).json({ status: true, message: "Link eliminado correctamente"});
    } catch (error) {
        if(error.kind === "ObjectId") {
            return res.status(403).json({status: false, message: "Formato incorrecto"})
        }

        return res.status(500).json({status: false, message: error.message})
    }
}