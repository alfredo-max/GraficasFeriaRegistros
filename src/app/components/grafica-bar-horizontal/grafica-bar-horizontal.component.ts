import { Component, Input, OnInit } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';
import {EnviarDatosGraficaService} from 'src/app/services/enviar-datos-grafica.service'

@Component({
  selector: 'app-grafica-bar-horizontal',
  templateUrl: './grafica-bar-horizontal.component.html',
  styleUrls: ['./grafica-bar-horizontal.component.css']
})
export class GraficaBarHorizontalComponent implements OnInit {

  // @Input() listaMunicipios:object[]=[];
  view:[number,number] = [400, 300];
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
    domain: ['#FF670A', '#FFAD7C', '#AAAAAA'],group: ScaleType.Ordinal,name:"colores",selectable:true
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
