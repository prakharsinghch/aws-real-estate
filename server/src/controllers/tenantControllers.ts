import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";

const prisma = new PrismaClient

export const getTenant = async(req : Request, res: Response) : Promise<void> => {
    try{
        const { cognitoId } = req.params;
        const tenant = await prisma.tenant.findUnique({
            where : {cognitoId},
            include: {
                favorites: true
            }
        });

        if(tenant){ 
            res.json(tenant)
        }else {
            res.status(404).json({message: "Tenant not found"});
        }
    } catch(error : any) {
        res.status(500).json({message: `Error fetching tenant: ${error.message}`});
    }
};

export const createTenant = async(req : Request, res: Response) : Promise<void> => {
    try{
        const {cognitoId, name, email, phoneNumber} = req.body;

        const tenant = await prisma.tenant.create({
            data : {
                cognitoId,
                name,
                email,
                phoneNumber
            },
        })

        res.status(201).json(tenant);

    } catch(error : any) {
        res.status(500).json({message: `Error creating tenant: ${error.message}`});
    }
};

export const updateTenant = async(req : Request, res: Response) : Promise<void> => {
    try{
        
        const { cognitoId } = req.params;

        const { name, email, phoneNumber} = req.body;

        const updateTenant = await prisma.tenant.update({
            where: { cognitoId },
            data : {
                name,
                email,
                phoneNumber
            },
        })

        res.status(201).json(updateTenant);

    } catch(error : any) {
        res.status(500).json({message: `Error updating tenant: ${error.message}`});
    }
}

export const getCurrentResidences = async (req: Request, res: Response): Promise<void> => {
            try {
    
                const {cognitoId} = req.params;

                const properties = await prisma.property.findMany({
                    where : {tenants : {some : {cognitoId}}},
                    include : {
                        location: true
                    }
                })

                const residencesWithFormatLocation = await Promise.all(
                    properties.map(async (property) => {
                        const coordinates : {cooridnates : string}[] =
                        await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates from "Location" where id=${property.location.id}`;
    
                        const geoJSON : any = wktToGeoJSON(coordinates[0]?.cooridnates || "");
                        const longitude = geoJSON.coordinates[0];
                        const latitude = geoJSON.coordinates[1];
    
                        return {
                            ...property,
                            location: {
                                ...property.location,
                                coordinates: {
                                    longitude,
                                    latitude
                                },
                            },
                        };

                    })
                )
                        
                res.json(residencesWithFormatLocation);
    
    
            } catch(err: any){
                    res
                    .status(500)
                    .json({message : `Error retrieving tenant properties : ${err.message }`});
            }
}

export const addFavouriteProperty = async(req : Request, res: Response) : Promise<void> => {
    try{

        const {cognitoId , propertyId} = req.params;
        const tenant = await prisma.tenant.findUnique({
            where: {cognitoId},
            include: {favorites : true},
        });

        const propertyIdNumber = Number(propertyId);
        const existingFavourites = tenant?.favorites || [];

        if(!existingFavourites.some((fav) => fav.id === propertyIdNumber)){
            const updatedTenant = await prisma.tenant.update({
                where: {cognitoId},
                data: {
                    favorites : {
                        connect : {id : propertyIdNumber}
                    }
                },
                include : {favorites : true}
            })

            res.json(updateTenant);
        }else{
            res.status(409).json({message: "Property Already added as favourite"});
        }

 
    } catch(err: any){
                    res
                    .status(500)
                    .json({message : `Error adding fav properties : ${err.message }`});
            }
}

export const removeFavouriteProperty = async(req : Request, res: Response) : Promise<void> => {
    try{

        const {cognitoId , propertyId} = req.params;
        const propertyIdNumber = Number(propertyId);

        const updatedTenant = await prisma.tenant.update({
            where : {cognitoId},
            data: {
                    favorites : {
                        disconnect : {id : propertyIdNumber}
                    }
            },
            include : {favorites: true}
        });

        res.json(updateTenant);
       
    } catch(err: any){
                    res
                    .status(500)
                    .json({message : `Error removing fav properties : ${err.message }`});
            }
}
