import { FastifyInstance } from "fastify";
import "dotenv/config";
import { ProductCategory } from "../model/ProductCategory";
const fs = require("fs");
const path = require("path");

export const getAllProductCategories = async (app: FastifyInstance) => {
    app.get("/getAllProductCategories", async (req, res) => {
        try {
            const model = new ProductCategory();

            const response = await model.getAllProductCategories();

            return res
                .status(response.status)
                .send({ message: response.message, data: response.data });
        } catch (error) {
            return res.status(500).send({
                message:
                    "Erro ao buscar categorias. Tente novamente mais tarde",
            });
        }
    });
};
export const getCategoryImage = async (app: FastifyInstance) => {
    app.get("/getCategoryImage", async (req, res) => {
        try {
            const { picture_path }: any = req.query;
            
            const filePath = path.resolve('./src', picture_path)

            const stream = fs.createReadStream(filePath);

            res.header("Content-Type", "application/octet-stream");

            return res.status(200).send(stream);
        } catch (error) {

            console.log(error);

            return res.status(500).send({
                message:
                    "Erro ao buscar imagem da categoria. Tente novamente mais tarde",
            });
        }

    });
};
