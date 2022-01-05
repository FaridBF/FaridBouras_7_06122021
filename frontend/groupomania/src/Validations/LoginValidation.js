import * as Yup from 'yup';

export const validateLogin = Yup.object().shape({
  email: Yup.string()
    .email('Veuillez entrer une adresse e-mail valide')
    .required("L'adresse e-mail est obligatoire"),
  password: Yup.string()
    .min(6, 'Le mot de passe doit avoir 6 caractères minimum')
    .required('Le mot de passe est obligatoire')
});
