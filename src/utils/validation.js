const validate = require("validator");

const validateSignUpData = (data) => {
    let errors = {};

    if (validate.isEmpty(data.firstName || "")) {
        errors.firstName = "First Name must not be empty";
    }

    if (validate.isEmpty(data.lastName || "")) {
        errors.lastName = "Last Name must not be empty";
    }

    if (validate.isEmpty(data.email || "")) {
        errors.email = "Email must not be empty";
    } else if (!validate.isEmail(data.email || "")) {
        errors.email = "Must be a valid email address";
    }

    if (validate.isEmpty(data.password || "")) {
        errors.password = "Password must not be empty";
    } else if (!validate.isStrongPassword(data.password || "")) {
        errors.password = "Password must be strong. It should contain at least 8 characters, including uppercase, lowercase, number, and symbol.";
    }
    if (Object.keys(errors).length === 0) {
        return;
    } else {
        throw new Error("Error: " + JSON.stringify(errors));
    }
};
module.exports = { validateSignUpData };