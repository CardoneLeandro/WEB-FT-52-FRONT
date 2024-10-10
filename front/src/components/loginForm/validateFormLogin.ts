

export function validateLoginForm(value: ILoginUser): ILoginError {
    const error: ILoginError = {};

    if (value.email) {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(value.email)) {
            error.email = "Dirección de correo electrónico inválida";
        }
    } else {
        error.email = "El correo electrónico es requerido";
    }

    if (!value.password) {
        error.password = "La contraseña es requerida";
    } else if (value.password.length < 8) {
        error.password = "La contraseña debe tener al menos 8 caracteres";
    }

    return error;
}
