exports.userSignupValidator = (req, res, next) => {
    req.check('name', "Имя обязательно").notEmpty();
    req.check("email", "Адрес электронной почты должен быть от 3 до 32 символов")
        .matches(/.+\@.+\..+/)
        .withMessage("Неверный адрес электронной почты")
        .isLength({
            min: 4,
            max: 32
        });
    req.check("password", "Пароль обязательное поле").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Пароль должен содержать не менее 6 символов")
        .matches(/\d/)
        .withMessage("Пароль должен содержать хоть одну цифру");
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};