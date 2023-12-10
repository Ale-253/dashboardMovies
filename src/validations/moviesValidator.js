export const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = 'El título es requerido';
    } 

    if (!values.rating) {
        errors.rating = 'El rating es requerido';
    } else if (values.rating.length > 20) {
        errors.rating = 'Must be 20 characters or less';
    }

    if (!values.awards) {
        errors.awards = 'Los premios son requeridos';
    }

    if (!values.length) {
        errors.length = 'La duración es requerida';
    }

    if (!values.genre_id) {
        errors.genre_id = 'El género es requerido';
    }

    if (!values.release_date) {
        errors.release_date = 'La fecha es requerida';
    }

    return errors;
};