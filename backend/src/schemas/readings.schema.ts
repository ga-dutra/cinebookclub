import joi from "joi";

const newReadingSchema = joi.object({
  medias_id: joi.number(),
  user_id: joi.number(),
  grade: joi.number(),
  review: joi.string(),
  book_api_id: joi.string().required(),
  title: joi.string().required(),
  author: joi.string().required(),
  description: joi.string().required(),
  img: joi.string().required(),
  page_count: joi.number().required(),
});

export { newReadingSchema };
