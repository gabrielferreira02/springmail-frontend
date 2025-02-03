import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BoxComponent } from './box/box.component';
import { MessageComponent } from './message/message.component';

export const routes: Routes = [
    {path: "", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {
        path: "box", 
        component: BoxComponent,
        children: [
            {path: "", component: MessageComponent}
        ]
    }
];
