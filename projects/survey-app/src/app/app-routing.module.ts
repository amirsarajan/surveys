import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectAuthorizedGuard } from './services/guards/redirect-authorized.guard';

const routes: Routes = [ 
  {
    path:'',    
    pathMatch:'full',
    redirectTo:'/public'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
