import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { APIService } from './open-services/aPI.service';
import { DetalleRecetaService } from './open-services/detalleReceta.service';
import { EfectoAdversoService } from './open-services/efectoAdverso.service';
import { HistorialMedicoService } from './open-services/historialMedico.service';
import { LoginService } from './open-services/login.service';
import { MedicamentoService } from './open-services/medicamento.service';
import { PacienteService } from './open-services/paciente.service';
import { RecetaService } from './open-services/receta.service';
import { RolService } from './open-services/rol.service';
import { UserRolService } from './open-services/userRol.service';
import { UsuariosService } from './open-services/usuarios.service';

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
