import { Component, OnInit,Input } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';
import {EnviarDatosGraficaService} from 'src/app/services/enviar-datos-grafica.service'

@Component({
  selector: 'app-grafica-bar-vertical',
  templateUrl: './grafica-bar-vertical.component.html',
  styleUrls: ['./grafica-bar-vertical.component.css']
})
export class GraficaBarVerticalComponent implements OnInit {
 // @Input() listaMunicipios:object[]=[];
  view:[number,number] = [500, 450];
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  legendTitle:string="Dias";
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Municipios';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Registros';
  animations: boolean = true;
  
  colorScheme = {
    domain: ['#FFFFFF', '#fcac7c'],group: ScaleType.Ordinal,name:"colores",selectable:true
  }
  constructor(private _EnviarDatosGraficaService : EnviarDatosGraficaService) { }
  listaMunicipios=[];
  ngOnInit(): void {
    this._EnviarDatosGraficaService.disparadorEnviarDatosaGraficas.subscribe(data => {
           this.listaMunicipios=data.data;
    })
  }
  onSelect( e: Event) {
    //  console.log(e);
   }
  

}
