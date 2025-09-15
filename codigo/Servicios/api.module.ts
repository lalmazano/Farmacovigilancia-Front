import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { APIService } from './api/aPI.service';
import { DetalleRecetaService } from './api/detalleReceta.service';
import { EfectoAdversoService } from './api/efectoAdverso.service';
import { HistorialMedicoService } from './api/historialMedico.service';
import { LoginService } from './api/login.service';
import { MedicamentoService } from './api/medicamento.service';
import { PacienteService } from './api/paciente.service';
import { RecetaService } from './api/receta.service';
import { RolService } from './api/rol.service';
import { UserRolService } from './api/userRol.service';
import { UsuariosService } from './api/usuarios.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
