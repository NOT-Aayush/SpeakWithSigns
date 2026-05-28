import { getFaceService } from "../models/userModel.js";
import { findMatchingFace } from "../calculation/faceComparison.js";

export const getFace = async (req, res) => {

    try {

        const { descriptor } = req.body;

        if (!descriptor || descriptor.length === 0) {
            return res.status(400).json({ success: false, message: "No descriptor provided" });
        }
        
        const allPersons = await getFaceService();

        const match = await findMatchingFace( descriptor, allPersons );

        return res.status(200).json({ success: true, match });

    } catch (error) {

        console.log(error);

        return res.status(500).json({ success: false, message: "Server error" });
    }
};