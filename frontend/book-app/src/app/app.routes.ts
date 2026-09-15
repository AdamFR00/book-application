import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Home } from './components/home/home';
import { Books } from './components/books/books';
import { Quotes } from './components/quotes/quotes';
import { authGuard } from './guards/auth-guard';
import { rootRedirectGuard } from './guards/root-redirect-guard';
import { CreateBook } from './components/createbook/createbook';
import { EditBook } from './components/editbook/editbook';
import { CreateQuote } from './components/createquote/createquote';
import { EditQuote } from './components/editquote/editquote';




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
                {
                    path: '',
                    redirectTo: 'books',
                    pathMatch: 'full'
                },
                {path: 'books', component: Books},
                {path: 'create-book', component: CreateBook},
                {path: 'edit-book/:id', component: EditBook},
                {path: 'quotes', component: Quotes},
                {path: 'create-quote', component: CreateQuote},
                {path: 'edit-quote/:id', component: EditQuote}]
        
    }
];