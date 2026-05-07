import { pool } from "../db/index.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";



const addSchool = asyncHandler(async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        // Validation
        if (!name || !address || latitude == null || longitude == null)
            throw new ApiError(
                400,
                "all fields are required"
            )

        // Insert query
        const [result] = await pool.query(
            `INSERT INTO schools 
            (name, address, latitude, longitude)
            VALUES (?, ?, ?, ?)`,
            [
                name,
                address,
                latitude,
                longitude,
            ]
        );

        return res.status(201).json(
            new ApiResponse(
                201,
                {
                    schoolId: result.insertId
                },
                "School added successfully"
            )
        );
    } 
    catch (error) {
        console.log("Create school table error ",error);
        throw new ApiError(
            500,
            error?.message || "internal server error"
        );
    }
});




const listSchools = asyncHandler(async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (latitude == null || longitude == null)
            throw new ApiError(
                400, 
                "User latitude and longitude required"
            );

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        const [schools] = await pool.query(`SELECT * FROM schools`);

        // Haversine formula
        const getDistance = (lat1, lon1, lat2, lon2) => {
            const toRad = (value) => (value * Math.PI) / 180;

            const R = 6371; // km
            const dLat = toRad(lat2 - lat1);
            const dLon = toRad(lon2 - lon1);

            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) *
                    Math.cos(toRad(lat2)) *
                    Math.sin(dLon / 2) *
                    Math.sin(dLon / 2);

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            return R * c;
        };

        const sortedSchools = schools.map((school) => {
                const distance = getDistance(
                    userLat,
                    userLon,
                    school.latitude,
                    school.longitude
                );

                return { ...school, distance };
            })
            .sort((a, b) => a.distance - b.distance);

        return res.status(200).json(
            new ApiResponse(
                200,
                sortedSchools,
                "Schools fetched successfully"
            )
        );
    } 
    catch (error) {
        console.log("List school error", error);
        throw new ApiError(
            500,
            error?.message || "internal server error"
        );
    }
});



export {addSchool,listSchools};