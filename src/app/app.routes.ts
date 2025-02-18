import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BoxComponent } from './box/box.component';
import { MessageComponent } from './message/message.component';
import { SentComponent } from './sent/sent.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { AccountComponent } from './account/account.component';
import { ChatComponent } from './chat/chat.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path: "", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {
        path: "box", 
        component: BoxComponent,
        canActivate: [authGuard],
        children: [
            {path: "messages", component: MessageComponent, canActivate: [authGuard]},
            {path: "sent", component: SentComponent, canActivate: [authGuard]},
            {path: "favorites", component: FavoriteComponent, canActivate: [authGuard]},
            {path: "account",  component: AccountComponent, canActivate: [authGuard]},
            {path: "messages/:id", component: ChatComponent, canActivate: [authGuard]}
        ]
    }
];
