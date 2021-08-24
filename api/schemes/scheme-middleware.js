const Schemes = require('./scheme-model')
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
      const {scheme_id} = req.params;

      try{
          const scheme = await Schemes.findById(id);
          if(!scheme){
            res.status(404).json({message: `scheme with scheme_id ${id} not found`})
          } else{
            next();
          }
      }
      catch(err){
        res.status(500).json(err)
      }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
      const {scheme_name} = req.body;
      if(!scheme_name || scheme_name.length === 0 || typeof shceme_name !== "string"){
        res.status(400).json({message: "invalid scheme_name"})
      } else{
        next();
      }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
      const {step_number, instructions} = req.body;
      if(!instructions || instructions.length === 0 || typeof instructions !== "string" || step_number < 1 || typeof step_number !== "number"){
          res.status(400).json({message: "invalid step"})
      } else{
        next();
      }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
