const Joi = require("joi");

const dataSchema = Joi.object({
  Clients: Joi.object({
    Client: Joi.array().items(
      Joi.object({
        Account: Joi.object({
          ExistenceofCarer: Joi.string(),
          AccountName: Joi.string(),
          AccountType: Joi.string().allow(""),
          // Birthdate: Joi.date().format("dd-mm-yyyy"),
          Birthdate: Joi.string(),

          Gender: Joi.string(),
          CountryofBirth: Joi.string(),
          PrimaryLanguage: Joi.string(),
          ATSIOrigin: Joi.string(),
          Disability: Joi.string(),
          AccommodationType: Joi.string(),
          HouseholdComposition: Joi.string(),
          DVACardStatus: Joi.string(),
          ServiceCharge: Joi.object({}).allow(""),
        }),
        // Date: Joi.date().format("dd-mm-yyyy"),
        Date: Joi.string(),

        Type: Joi.string(),
        Hours: Joi.string()
          .regex(
            /(^([0-9]|[0-1][0-9]|[2][0-3]):([0-5][0-9])$)|(^([0-9]|[1][0-9]|[2][0-3])$)/
          ) // Accepts Hour in format HH:MM / HH / H
          .allow(""),
        ConsultType: Joi.string(),
        Address: Joi.string(),
      })
    ),
  }),
});

module.exports = { dataSchema };
