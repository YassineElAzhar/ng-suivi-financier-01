import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(public authService: AuthService, public router: Router) { }
  
    ngOnInit(): void {
        /*
        this.authService.testLogin("test","test").subscribe((response: boolean) => {
            console.log(response);
        });
        */
    }

    
    @Input() error: string | null;
    @Input() info: string | null;
    
    @Output() loginStatus = new EventEmitter();

    form: FormGroup = new FormGroup({
        //(admin/C£©!€$ʈ1W0t2P^s$ɘ)
        username: new FormControl(''),
        password: new FormControl(''),
    });



    login() {
        //Nous allons encoder les infos en base64
        var userNameB64:string = btoa(unescape(encodeURIComponent(this.form.value["username"])));
        var passwordB64:string = btoa(unescape(encodeURIComponent(this.form.value["password"])));
        
        if (this.form.valid) {
            this.info = "Tentative de connexion en cours...";
            this.authService.login(userNameB64, passwordB64).subscribe(() => {
                this.loginStatus.emit(true);
                this.setMessage();
                if (this.authService.isLoggedIn) {
                    // Récupère l'URL de redirection depuis le service d'authentification
                    // Si aucune redirection n'a été définis, redirige l'utilisateur vers la liste des pokemons.
                    let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
                    // Redirige l'utilisateur
                    this.router.navigate([redirect]);
                    document.location.href = "/home";
                }
            });
        }
    }
  
    // Déconnecte l'utilisateur
    logout() {
        this.authService.logout();
        this.setMessage();
    }
    

    // Informe l'utilisateur sur son authentfication.
    setMessage() {
        this.info = "";
        this.error = this.authService.isLoggedIn ?
            'Vous êtes connecté.' : 'Identifiant ou mot de passe incorrect.';
    }




}
