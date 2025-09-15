# Guía de Uso

## Contenido
- [Preparación Entorno](#preparación-entorno)
- [Estructura General](#estructura-general)
- [Estructura Componentes](#estructura-componentes)
- [Estructura Rutas](#estructura-rutas)
- [Estándares y Diseño](#estándares-y-diseño)
- [Integración Backend](#integración-backend)
- [Reportes](#reportes)

## Preparación entorno

### Versiones
```
Angular CLI: 14.2.5
Node: 16.17.1
Package Manager: npm 8.19.2
```

[Instalador NodeJS](https://nodejs.org/download/release/v16.2.0/)

### Actualización Angular
```
npm install -g npm@8.19.2
npm cache clean --force
npm set audit false
npm uninstall -g angular-cli
npm uninstall -g @angular/cli
npm cache clean --force
npm install -g @angular/cli@14.2.5
```
### Ejecución Proyecto

1. Clonar repositorio y dirigirse a la rama corresponidente.
```
git clone <url>
git checkout <rama>
```
2. Instalar Dependencias. 
```
cd codigo
npm install
```
3. Dentro de la carpeta del proyecto correr cualquiera de las comandos siguientees para iniciar:
```
npm start 
ng serve
```

### Nombre del Sistema

Dentro del archivo `codigo/src/app/components/others/project-legend/project-legend.html` podrá personalizar el nombre y siglas del sistema al que pertenecerá el proyecto.

## Estructura General

El proyecto esta dividido en una serie de carpetas para mantener un orden lógico para la creación de módulos, componentes y servicios según sea necesario, la estructura básica se presenta a continuación y se detalle en los posteriores apartados disponibles:

- `cicd/`: dentro de esta carpeta se deberá colocar todos los compilados que se generen posterior a la revisión del correcto funcionamiento del proyecto al hacer la integración de ramas trabajadas.
```
cd codigo
ng build
```
- `codigo/src/app`
    - `/auth`: se generan todos los componentes cuyas rutas no necesitan proteección por medio de autenticación de usuario (ej. login, registro o creación de usuarios).
    - `/components`: se generan todos los componentes que serán reutilizados a lo largo del proyecto (considerar clasificación).
    - `/guards`: se generan todos los archivos que servirán para protección de rutas por autenticación y roles.
    - `/models`: se generan todos los archivos que serviran para tipado y mapeo de datos.
    - `/pages`: se generan todos los componentes que serán utilizados como páginas de contenido (verificar estructuración de rutas).
    - `/services`: 
        - `/api`: see generan todos los seervicios necesarios para integración con backend.
        - `/utils`: se generan todos los servicios necesarios para funciones generales compartidas (helpers).
    - `/shared`: se generan todos los módulos o componentes que serán compartidos a nivel global.
-`documentos/`: dentro de esta carpeta se colocará cualquier tipo de documentación que facilite la comprensión y mantenimiento del proyecto.

## Estructura Componentes

Para reutilizar componentes se creo un módulo específico que puede encotrarse en `src/app/components/components.module.ts`

Para generar un nuevo componente reutilizable considerar su clasificación segpun las carpetas proporcionadas:

- Dialogos (Angular Material proporciona componentes para generación de [diálogos](https://material.angular.io/components/dialog/overview))
- Campos (ej. catálogos para realizar lógica de petición y selección e un solo componente, calendarios de selección de fechas)
- Vistas (ej. tablas reutilizables, plantillas para crear, visualizar y editar objetos que poseen los mismo campos.)
- Otros (cualquiero componente que no se clasifique en las categorías anteriores.)

posterior a la clasificación entonces se genera el componente dentro del proyecto:

```
cd codigo
ng g c components/<clasificacion>/<nombre-componente>
```
*NOTA: al generar el componente éste será importado y declarado dentro del módulo mecionado anteriormente, pero para poder utilizar el componente desde otras vistas se deberá exportar.*
``` ts
...
  exports: [
    <ComponenteGenerado>,
  ],
...
```
*NOTA: en cada nuevo módulo de páginas (ver [estructura de rutas](#estructura-rutas)) se deberá importar el módulo de componentes compartidos.*

``` ts
import { ComponentsModule } from '../components/components.module';

  imports: [
    ComponentsModule,
    ...
``` 

## Estructura Rutas

El archivo principal para organización de rutas se encuentra en `src/app/app-routing.module.ts`. 
- En éste archivo se mapean los componentes a las rutas según sea necesario.
- También es posible cargar enrutadores hijos que poseen su propio listado de rutas mapeadas a componentes, esta facilitará la protección de rutas por autenticación y roles a demás de proporcionar una mejor organización al escalar el proyecto.
- Si se desea crear una nueva página ésta debera ser creada según la ruta en que pueda clasificar, si es una funcionalidad que necesita protección de rutas por autenticaciób irá al enrutador de pages `src/app/pages/pages-routing.module.ts`. Éste enrutador puede ser padre de otros enrutadores importando y declarando los enrutadores según corresponday siguiendo la misma estructura de creación: 
    - pages/carpeta/componentes/ 
    - pages/carpeta/enrutador 
    - pages/carpeta/modulo.
- Si se desea crear una nueva página que no necesita protección de rutas deberá ir al enrutador de auth `src/app/auth/auth-routing.module.ts`

```ts
//Rutas externas que no necesitan protección. 
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

// Rutas hijas protegidas por autenticación.
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },

// Mapeo de rutas a página no encontrada o acceso denegado
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', component: PageNotFoundComponent },

// Rutas hijas protegidas por rol de usuario.
  {
  path:'rol1',
  canActivate:[RolExampleGuard],
  component: RolComponent
  },

```


## Estándares y Diseño

### Estándares 

Todas las variables deberán ser declaradas al inicio del componente e inicializadas en el constructor, para evitar excepciones por campos  indefinidos.
``` ts
  public test: TestModel;

  constructor(
    private _sictService: SictService,
  ) {
    this.test = new TestModel();
   }
``` 

*NOTA: se recomienda el uso de modelos para tipado dónde se considere apropiado para facilitar el manejo de datos. (Evitar el uso de tipo de dato **any**) *
`src/app/models/test.model.ts`
 ``` ts
export class TestModel {

    public text: string;
    public num: number;
    public list: [];

    constructor() {
        this.text = '';
        this.num = 0;
        this.list = [];
    }

}
``` 

para formatear campos de fecha se recomienda el uso de DatePipe:
 ``` ts
import { DatePipe } from '@angular/common';
...
@Component({
  ...
  providers: [DatePipe],
})

constructor(
    private _datepipe: DatePipe,
  ) {}
 ... 
   public formatoFecha(Date fecha) {
      fecha_formato = this._datepipe.transform(fecha, 'dd/MM/yyyy').toString();
   }
...
``` 


### Diseño 
El dieseño esta basado en Material Design, a través de componentes de [Angular Material](https://material.angular.io/components/categories) para estandarizar y facilitar el diseño.

También se integró el uso de [bootstrap](https://getbootstrap.com/docs/5.0/forms/layout/) para facilitar el manejo de layouts y diseño responsive.

#### Componentes

Para facilitar la reutilización de componentes y el [paso de datos entre padres e hijos y viceversa](https://angular.io/guide/inputs-outputs) se recomienda el uso de `@Input` y `@output`. 

Para crear nuevos componentes:
1. Importar el componente que desea utilizar en el archivo `src/app/shared/material-design/material-design.module.ts`
``` ts
import { MatButtonModule } from '@angular/material/button';
...
  exports: [
    MatButtonModule,
    ...
  imports: [
    MatButtonModule,
    ...
```
2. Seguir el ejemplo de uso del sitio sugerido.

*NOTA No.1: Mientras se mantenga el uso de componentes de angular material el tema oscuro se aplicará de forma automática.*

*NOTA No.2: en cada nuevo módulo de páginas (ver [estructura de rutas](#estructura-rutas)) se deberá importar el módulo de componentes de material design.*

``` ts
import { MaterialDesignModule } from '../shared/material-design/material-design.module';

  imports: [
    MaterialDesignModule,
    ...
``` 

#### Tema

Dentro del archivo `src/custom-theme.scss` se encuentran definidas las paletas de colores representativas del IGSS en base a los 3 colores principales que define Material design, y la tipografía aplicada a todo el proyecto.

- [Herramienta de colores material esign](https://m2.material.io/resources/color/#!/?view.left=0&view.right=0)
- [Generador de paletas en base a colores](https://m2.material.io/design/color/the-color-system.html#tools-for-picking-colors)


#### Alertas

Para las alertas se utilizará [sweet alert](https://sweetalert2.github.io/), en el enlace se encuentran distitntos ejemplos para alertas de advertencia, éxito, error, confirmación, etc. 

###

## Integración Backend


### Instalación de OpenApi

Requisitos: 
- Instalar Java previamente.

```
npm install @openapitools/openapi-generator-cli -g

openapi-generator-cli version-manager set 5.3.0
```
### Generación de Servicios

La url para consulta de la api se encuentra dentro de la ruta `src/environments/environment.<entorno>.ts`
``` ts
export const environment = {
  production: true,
  apiUrl: 'https://<host>:<port>',
};
```

 1. Crear una nueva carpeta (ajena al proyecto).
 2. Instalar dependencias.

 ```
 npm install @openapitools/openapi-generator-cli -D
 ```
3. Descargar archivo swagger.json que genera el backend y colocarlo dentro de la carpeta creada.
4. Correr el siguiente comando para generar los nuevos servicios creados dentro de otra `carpeta`.

```
npx @openapitools/openapi-generator-cli generate -i swagger.json -g typescript-angular -o carpeta
 ```
 5. Copiar el archivo del nuevo servicio generado dentro de la ruta: `carpeta/api`
 6. Pegar el archivo dentro del proyecto de frontend en la ruta: `src/app/services/api/open-services`
 7. Realizar modificaciones al archivo.

``` ts
...
export class SictService {

    protected basePath = 'http://localhost';
...
```

``` ts
import { environment } from 'src/environments/environment';

...
export class SictService {

    protected basePath = environment.apiUrl;
...
```
*NOTA: Para peticiones post deberá agregar el cuerpo a los servicios.*

ANTES
``` ts
 
    public apiEndpointPost( ...parametros): Observable<any>;
    public apiDespachoRecetaPost(...parametros): Observable<HttpResponse<any>>;
    public apiDespachoRecetaPost(...parametros): Observable<HttpEvent<any>>;
    public apiDespachoRecetaPost(...parametros): Observable<any> 
    
    ...
    
    return this.httpClient.post<any>(`${this.configuration.basePath}/api/Endpoint`,
    null,
    {
        ...
    }

```
DESPUÉS
``` ts
 
    public apiEndpointPost(cuerpo:TipoDato, ...parametros): Observable<any>;
    public apiDespachoRecetaPost(cuerpo:TipoDato, ...parametros): Observable<HttpResponse<any>>;
    public apiDespachoRecetaPost(cuerpo:TipoDato, ...parametros): Observable<HttpEvent<any>>;
    public apiDespachoRecetaPost(cuerpo:TipoDato, ...parametros): Observable<any> 
    
    ...

    return this.httpClient.post<any>(`${this.configuration.basePath}/api/Endpoint`,
    cuerpo, //
    {
        ...
    }

```

### Peticiones 

Para poder utilizar los servicios generados deberá:

1. importarlos y declararlos en el componente que los necesite:

``` ts

import { SictService } from 'src/app/services/api/open-services/sict.service';
...

  constructor(private _sictService: SictService,)
  {
    ...
   }
...
```
2. posteriormente crear los métodos correspondientes para obtención/envio de datos.
``` ts
    this._sictService.apiSictPruebaGet('field1', 2).subscribe({
      next: (data) => this.test = data,
      error: (err) => console.log(err),
      complete: () => console.log('Complete')
    })
``` 

*NOTA: Se recomienda el uso de modelos para facilitar el mapeo de datos que las peticiones traigan como respuesta desde el backend.*

`src/app/models/test.model.ts`
 ``` ts
export class TestModel {

    public text: string;
    public num: number;
    public list: [];

    constructor() {
        this.text = '';
        this.num = 0;
        this.list = [];
    }

}
``` 

## Reportes

En la ubicacion `src/components/reports` se pueden adjuntar los componentes que son reportes y vayan a ser utilizados en cualquier parte de la aplicación.

### Hoja de Vida 

Si se desea utilizar el reporte de la hoja de vida en algún otro componente, bastará con realizar lo siguiente.

1. Importar el componente.
```ts
import { HojaVidaComponent } from '../../components/reports/hoja-vida/hoja-vida.component';
```

2. Mandar como parámetro en el constructor.
```ts
constructor (public cvReporte : HojaVidaComponent)
{}
```

3. Utilizar método `generarCv` en donde se necesite utilizar.
```ts
// Por ejemplo: método utilizado para evento de botón.
metodoBoton() 
{
  /* es obligatorio mandar como parámetro el número de la solicitud del CV que se desea generar */
  const seq_solicitud : number = 19;
  this.cvReporte.generarCv(seq_solicitud);
}
```