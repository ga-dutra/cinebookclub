import joi from "joi";

const newFilm_TvSchema = joi.object({
  medias_id: joi.number().required(),
  user_id: joi.number(),
  grade: joi.number(),
  review: joi.string(),
  api_id: joi.string().required(),
  title: joi.string().required(),
  overview: joi.string().required(),
  img: joi.string().required(),
  vote_average: joi.number().required(),
});

export { newFilm_TvSchema };
