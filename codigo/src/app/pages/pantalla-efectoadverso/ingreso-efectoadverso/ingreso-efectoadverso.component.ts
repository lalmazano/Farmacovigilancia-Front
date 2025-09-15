import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators,
  AbstractControl, ValidatorFn
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Medicamento, MedicamentoService } from 'src/app/services/api';
import { EfectoAdversoService } from 'src/app/services/api/open-services/efectoAdverso.service';
import { EfectoAdverso } from 'src/app/services/api/model/efectoAdverso';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CrearEfectoAdversoPayload } from './../../../services/api/model/CrearEfectoAdversoPayload';
export const ES_DDMMYYYY = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'dd/MM/yyyy',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-ingreso-efectoadverso',
  templateUrl: './ingreso-efectoadverso.component.html',
  styleUrls: ['./ingreso-efectoadverso.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-GT' },
    { provide: MAT_DATE_FORMATS, useValue: ES_DDMMYYYY },
  ]
})
export class IngresoEfectoadversoComponent implements OnInit {
  isLinear = true;
  
  medicamentos: Medicamento[] = [];
  patientInfoForm!: FormGroup;
  medicationInfoForm!: FormGroup;
  adverseEffectInfoForm!: FormGroup;
  trackMed = (_: number, m: Medicamento) => m.idMedicamento ?? _;
  

  // Límites de calendario
  today = this.startOfDay(new Date());

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private efectoAdversoService: EfectoAdversoService,
    private medicamentoService: MedicamentoService
  ) {}

  ngOnInit(): void {
    this.patientInfoForm = this.fb.group({
      id_paciente: [null, [Validators.required, Validators.min(1)]],
    });

    this.medicationInfoForm = this.fb.group({
      id_medicamento: [null, [Validators.required]],
      dosis: ['', [Validators.required]],
      lote: ['', [Validators.required]],
      laboratorio: ['', [Validators.required]],
      registro_sanitario: ['', [Validators.required]],
      fecha_vencimiento: [null, [Validators.required, this.minDate(this.today)]], // vencimiento >= hoy
      via_administracion: [null, [Validators.required]],
    });

    this.adverseEffectInfoForm = this.fb.group({
      fecha_reporte: [null, [Validators.required, this.maxDate(this.today)]], // reporte <= hoy
      descripcion: ['', [Validators.required]],
      gravedad: [null, [Validators.required]],
      fecha_inicio_efecto: [null, [Validators.required]],
      fecha_fin_efecto: [undefined],      // opcional, pero >= inicio
      medidas_tomadas: ['', [Validators.required]],
      suspension: [false],
      fecha_suspension: [undefined],      // opcional, pero >= inicio
      ajuste_dosis: [false],
      dosis_actual: [''],
    }, {
      validators: [
        this.dateBAfterDateA('fecha_inicio_efecto', 'fecha_fin_efecto', 'finMenorQueInicio', true),
        this.dateBAfterDateA('fecha_inicio_efecto', 'fecha_suspension', 'suspMenorQueInicio', true),
      ]
    });

    this.loadMedicamentos();
  }

  // ---------- VALIDADORES/HELPERS DE FECHAS ----------
  private startOfDay(d: Date): Date {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  }
  private asDate(v: any): Date | null {
    if (!v) return null;
    const d = v instanceof Date ? v : new Date(v);
    return isNaN(d.getTime()) ? null : d;
  }
  private minDate = (min: Date): ValidatorFn => {
    const min0 = this.startOfDay(min).getTime();
    return (c: AbstractControl) => {
      const d = this.asDate(c.value);
      if (!d) return null;
      return this.startOfDay(d).getTime() >= min0 ? null : { minDate: true };
    };
  };
  private maxDate = (max: Date): ValidatorFn => {
    const max0 = this.startOfDay(max).getTime();
    return (c: AbstractControl) => {
      const d = this.asDate(c.value);
      if (!d) return null;
      return this.startOfDay(d).getTime() <= max0 ? null : { maxDate: true };
    };
  };
  /** Valida que controlB sea >= controlA. */
  private dateBAfterDateA(controlA: string, controlB: string, errorKey: string, optionalB = false): ValidatorFn {
    return (group: AbstractControl) => {
      const a = this.asDate(group.get(controlA)?.value);
      const bCtrl = group.get(controlB);
      const b = this.asDate(bCtrl?.value);

      // limpiar error previo
      if (bCtrl?.hasError(errorKey)) {
        const { [errorKey]: _, ...rest } = bCtrl.errors || {};
        bCtrl.setErrors(Object.keys(rest).length ? rest : null);
      }
      if (optionalB && !b) return null;
      if (!a || !b) return null;

      if (this.startOfDay(b).getTime() < this.startOfDay(a).getTime()) {
        bCtrl?.setErrors({ ...(bCtrl.errors || {}), [errorKey]: true });
      }
      return null;
    };
  }

  // ---------- CARGA DE DATOS ----------
private loadMedicamentos(): void {
  this.medicamentoService.apiMedicamentoGet().subscribe({
    next: (data: Medicamento[]) => {
      this.medicamentos = data ?? [];

      // opcional: preseleccionar el primero para evitar NaN
      const ctrl = this.medicationInfoForm.get('id_medicamento');
      if (this.medicamentos.length && !ctrl?.value) {
        ctrl?.setValue(this.medicamentos[0].idMedicamento);
      }
    },
    error: err => console.error('Error al cargar medicamentos:', err)
  });
}


  // ---------- GETTERS PARA MIN EN PLANTILLA ----------
  get minFinEfecto(): Date | null {
    const ini = this.asDate(this.adverseEffectInfoForm.get('fecha_inicio_efecto')?.value);
    return ini ? this.startOfDay(ini) : null;
  }

  // ---------- HELPERS DE PAYLOAD ----------
  private toISOReq(v: any): string {
    return new Date(v).toISOString();
  }
  private toISOOpt(v: any): string | null {
    return v ? new Date(v).toISOString() : null;
  }
  private toCharBool(v: any): string {
    return v ? 'S' : 'N';
  }
  private async parseServerError(err: any): Promise<string> {
    if (!err) return 'Sin detalle';
    if (err.error instanceof Blob) {
      try { return (await err.error.text()) || 'Sin detalle (blob vacío)'; }
      catch { return 'No se pudo leer el error (blob)'; }
    }
    if (typeof err.error === 'object') return JSON.stringify(err.error, null, 2);
    if (typeof err.error === 'string') return err.error;
    return 'Sin detalle';
  }

  // ---------- SUBMIT ----------
async submitEffect(): Promise<void> {
  this.patientInfoForm.markAllAsTouched();
  this.medicationInfoForm.markAllAsTouched();
  this.adverseEffectInfoForm.markAllAsTouched();

  if (this.patientInfoForm.invalid || this.medicationInfoForm.invalid || this.adverseEffectInfoForm.invalid) {
    alert('Por favor, completa todos los campos requeridos.');
    return;
  }

  const f1 = this.patientInfoForm.value;
  const f2 = this.medicationInfoForm.value;
  const f3 = this.adverseEffectInfoForm.value;

  const idPaciente = Number(f1.id_paciente);
  const idMedicamento = Number(this.medicationInfoForm.value.id_medicamento);
  if (!Number.isFinite(idMedicamento)) {
    alert('Selecciona un medicamento válido.');
    return;
  }

  const payload: CrearEfectoAdversoPayload = {
    idPaciente,
    idMedicamento,
    fechaReporte: this.toISOReq(f3.fecha_reporte),
    descripcion: (f3.descripcion ?? '').trim(),
    gravedad: f3.gravedad ?? null,
    lote: (f2.lote ?? '').trim(),
    laboratorio: (f2.laboratorio ?? '').trim(),
    registroSanitario: (f2.registro_sanitario ?? '').trim() || null,
    fechaVencimiento: this.toISOReq(f2.fecha_vencimiento),
    dosis: (f2.dosis ?? '').trim() || null,
    fechaInicioEfecto: this.toISOOpt(f3.fecha_inicio_efecto),
    fechaFinEfecto: this.toISOOpt(f3.fecha_fin_efecto),
    viaAdministracion: f2.via_administracion || null,
    medidasTomadas: (f3.medidas_tomadas ?? '').trim() || null,
    suspension: this.toCharBool(f3.suspension),   // "S" | "N"
    fechaSuspension: this.toISOOpt(f3.fecha_suspension),
    ajusteDosis: this.toCharBool(f3.ajuste_dosis),// "S" | "N"
    dosisActual: (f3.dosis_actual ?? '').trim() || null
  };

  console.log('Payload PLANO que se enviará:', payload);

  // ✅ Enviar PLANO, sin wrapper
  this.efectoAdversoService.apiEfectoAdversoPost(payload as any).subscribe({
    next: () => {
      alert('Efecto adverso registrado exitosamente');
      this.patientInfoForm.reset();
      this.medicationInfoForm.reset();
      this.adverseEffectInfoForm.reset();
    },
    error: async (error) => {
      const detail = await this.parseServerError(error);
      console.error('Error al crear efecto adverso:', error, '\nDetalle:', detail);
      alert(`Error al registrar el efecto adverso\nStatus: ${error?.status}\n${detail}`);
    }
  });
}
}
