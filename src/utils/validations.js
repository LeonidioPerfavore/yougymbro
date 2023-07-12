const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => password.length >= 8;

const validateName = (name) => name.length >= 2;

const registrationValidationErrors = (name, email, password) => {
    if (!name) { return 'Name required'; }
    if (!validateName) { return 'Name min length 2'; }
    if (!email) { return 'Email required'; }
    if (!validateEmail(email)) { return 'Email not valid'; }
    if (!password) { return 'Password required'; }
    if (!validatePassword(password)) { return 'Password min length 8'; }
    return false;
}

const loginValidationErrors = (email, password) => {
    if (!email) { return 'Email required'; }
    if (!validateEmail(email)) { return 'Email not valid'; }
    if (!password) { return 'Password required'; }
    if (!validatePassword(password)) { return 'Password min length 8'; }
    return false;
}

const exerciseValidation = (name) => {
    if (!name) { return 'Name required'; }
    if (!validateName) { return 'Name min length 2'; }
    return false;
}

const trainingDayValidation = (exercises) => {
    // const digitsRegex = /^[0-9]+$/;
    const digitsRegex = /^[0-9]+(\.[0-9]+)?$/;

    if(exercises[0].id === ''){ return 'Add at least one exercise to create a workout'; }

    for (let i = 0; i < exercises.length; i++) {

        const exercise = exercises[i];

        for (let j = 0; j < exercise.sets.length; j++) {
            const set = exercise.sets[j];

            if (!set.reps || set.reps === '') {
                return `Добавьте повторения для упражнения ${i + 1} для сета ${j + 1}`;
            }

            if (!digitsRegex.test(set.reps)) {
                return `Неверное тип данных reps для упражнения ${i + 1} для сета ${j + 1}`;
            }

            if (set.weight && !digitsRegex.test(set.weight)) {
                return `Неверное тип данных weight для упражнения ${i + 1} для сета ${j + 1}`;
            }
        }
    }
    return false;
}

export {
    validateEmail, validateName, exerciseValidation, validatePassword, registrationValidationErrors,
    loginValidationErrors, trainingDayValidation
};
