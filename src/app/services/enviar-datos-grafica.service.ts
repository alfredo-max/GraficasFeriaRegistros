import { Injectable, Output,EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviarDatosGraficaService {
  @Output() disparadorEnviarDatosaGraficas:EventEmitter<any> = new EventEmitter();
  constructor() { }
}
