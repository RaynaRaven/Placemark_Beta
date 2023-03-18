import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
    .keys({
        email: Joi.string().email().example("homer@simpson.com").required(),
        password: Joi.string().example("secret").required(),
    })
    .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const LocationSpec = Joi.object()
    .keys({
        name: Joi.string().required().example("Jaspers"),
        description: Joi.string().optional().example("Jasper’s restaurant located in the heart of Monck Street in the electric and vibrant Crown Quarter brings a new dimension to local cuisine in Wexford."),
        location: Joi.string().allow("").optional().example(12),
        categoryId: IdSpec,
    })
    .label("Location");

export const LocationSpecPlus = LocationSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("LocationPlus");

export const LocationArraySpec = Joi.array().items(LocationSpecPlus).label("LocationArray");

export const CategorySpec = Joi.object()
    .keys({
        title: Joi.string().required().example("Fine Dining"),
        userid: IdSpec,
        locations: LocationArraySpec,
    })
    .label("Category");

export const CategorySpecPlus = CategorySpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("CategoryPlus");

export const CategoryArraySpec = Joi.array().items(CategorySpecPlus).label("CategoryArray");

export const JwtAuth = Joi.object()
    .keys({
        success: Joi.boolean().example("true").required(),
        token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
    })
    .label("JwtAuth");