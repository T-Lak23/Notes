import Joi from "joi";
export const createNoteSchema = Joi.object({
  title: Joi.string().max(200).required(),
  content: Joi.string().max(600).optional(),
  tags: Joi.array().items(Joi.string().trim()).default([]),
  isPinned: Joi.boolean().required(),
});
