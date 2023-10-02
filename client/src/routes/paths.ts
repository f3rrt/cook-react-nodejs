interface Paths {
    [key: string]: string;
 }
 
 export default {
    HOME: '/home',
    REGISTRATION: '/registration',
    CREATE_RECIPE: '/add-recipe',
    RECIPES: '/recipes',
    RECIPE: '/recipe/:id',
    EDIT_RECIPE: '/edit-recipe/:id',
    LOGIN: '/log-in',
    LOGOUT: '/log-out',
    DEFAULT: '/',
    NOT_FOUND: '*',
    PROFILE: '/profile'
 } as Paths;