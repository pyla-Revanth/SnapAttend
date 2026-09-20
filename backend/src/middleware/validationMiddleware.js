import { body, validationResult } from "express-validator";

const handleValidationErrors = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });

    }

    next();

};

export const validateRegister = [

    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required.")
        .isLength({ min: 3, max: 20 })
        .withMessage("Username must be between 3 and 20 characters."),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long."),

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required.")
        .isLength({ min: 3, max: 50 })
        .withMessage("Name must be between 3 and 50 characters."),

    handleValidationErrors,

];

export const validateLogin = [

    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required."),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required."),

    handleValidationErrors,

];

export const validateCreateSubject = [
    body("subjectCode")
        .trim()
        .notEmpty()
        .withMessage("Subject code is required.")
        .isLength({ min: 2, max: 20 })
        .withMessage("Subject code must be between 2 and 20 characters."),

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Subject name is required.")
        .isLength({ min: 2, max: 100 })
        .withMessage("Subject name must be between 2 and 100 characters."),

    body("section")
        .trim()
        .notEmpty()
        .withMessage("Section is required.")
        .isLength({ min: 1, max: 20 })
        .withMessage("Section must be between 1 and 20 characters."),

    handleValidationErrors,
];