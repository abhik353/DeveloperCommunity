const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateExperienceInput(data) {
    let errors = {}
    
    data.university = !isEmpty(data.university) ? data.university : ''
    data.degree = !isEmpty(data.degree) ? data.degree : ''
    data.specialization = !isEmpty(data.specialization) ? data.specialization : ''
    data.from = !isEmpty(data.from) ? data.from : ''


    
    if(Validator.isEmpty(data.university)){
        errors.university = 'University name is required'
    }

    if(Validator.isEmpty(data.degree)){
        errors.degree = 'degree is required'
    }

    if(Validator.isEmpty(data.specialization)){
        errors.specialization = 'degree is required'
    }

    if(Validator.isEmpty(data.from)){
        errors.from = 'from date is required'
    }



   

    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}