import * as Yup from 'yup';

export const validate = Yup.object().shape({
  emailInput: Yup.string()
    .email('Veuillez entrer une adresse e-mail valide')
    .max(30, "L'email est limité à 30 caractères maximum")
    .required("L'adresse e-mail est obligatoire")
});
