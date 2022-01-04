import * as Yup from 'yup';

export const validate = Yup.object().shape({
  email: Yup.string()
    .email('Veuillez entrer une adresse e-mail valide')
    .required("L'adresse e-mail est obligatoire"),
  lastName: Yup.string()
    .max(15, 'Le nom est limité à 15 caractères maximum')
    .required('Le nom est obligatoire'),
  firstName: Yup.string()
    .max(15, 'Le prénom est limité à 15 caractères maximum')
    .required('Le prénom est obligatoire'),
  password: Yup.string()
    .min(6, 'Le mot de passe doit avoir 6 caractères minimum')
    .required('Le mot de passe est obligatoire'),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('password'), null],
      'Les mots de passe ne correspondent pas'
    )
    .required('Le mot de passe est obligatoire')
});
