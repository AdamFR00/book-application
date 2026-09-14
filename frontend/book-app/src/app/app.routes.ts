import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Home } from './components/home/home';
import { Books } from './components/books/books';
import { Quotes } from './components/quotes/quotes';
import { authGuard } from './guards/auth-guard';
import { rootRedirectGuard } from './guards/root-redirect-guard';




export const routes: Routes = [
    {
        path: '',
        canActivate: [rootRedirectGuard],
        children: [],
        pathMatch: 'full',
    },
    {
        path: 'login',
        component:Login,
    },
    {
        path: 'register',
        component: Register,
    },
    {
        path: 'home',
        component: Home,
        canActivate: [authGuard],
        children:[
                {path: 'books', component: Books},
                {path: 'quotes', component: Quotes}
        ],
        
    }
];