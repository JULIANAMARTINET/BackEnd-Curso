import joi from "joi";

const product = joi.object({
  nombre: joi.string().min(3).max(45).required(),
  descripcion: joi.string().min(5).max(60).required(),
  codigo: joi.string().min(3).max(8).required(),
  foto: joi.string().min(5).max(180).required(),
  precio: joi.number().required(),
  stock: joi.number().required(),
});

export const JOI_VALIDATOR = {
  product,
};
