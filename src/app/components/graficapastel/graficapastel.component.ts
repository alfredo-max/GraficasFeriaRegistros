import { Component, OnInit } from '@angular/core';
import { FirestoreserviceService } from 'src/app/services/firestoreservice.service';
import { ScaleType } from '@swimlane/ngx-charts';
import { ExportExcelService } from 'src/app/services/export-excel.service';

export interface PostuladoElement {
  fecha:string,
  opcion_elegida:string,
  opcion_propuesta:string,
 }
export interface PeriodicElement {
  name: string;
  value: number;
}
@Component({
  selector: 'app-graficapastel',
  templateUrl: './graficapastel.component.html',
  styleUrls: ['./graficapastel.component.css']
})
export class GraficapastelComponent implements OnInit {
  //Variables Graficas 
  // view: [number, number] = [containerRef.offsetWidth, 400];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  colorScheme = {
    domain: ['#FF9D1C', '#2F80B7', '#FA2D26', '#AAAAAA'], group: ScaleType.Ordinal, name: "colores", selectable: true
  }
  //Variables contadoras
  numeropostulados=0;
  OpcionesElegidas_Data: PeriodicElement[] = [];
  sedeUni=0;
  sedeAdmin=0;
  CentroEmp=0;
  InstitutoForm=0;


   //Excel
   lista_datos: any[] =[];
  constructor(
    private _FirestoreserviceService: FirestoreserviceService,
    private _ExportarexcelService: ExportExcelService
    ) { }

  ngOnInit(): void {
    this.obtenerRegistros()
  }
  obtenerRegistros() {
    this._FirestoreserviceService.getDatos().subscribe(data => {
      if(this.numeropostulados>0){
        this.resetVariables();
      }
      this.numeropostulados=data.length;
      data.forEach((element: any) => {

        const registro: PostuladoElement={
          fecha:element.payload.doc.data().fecha,
          opcion_elegida:element.payload.doc.data().opcion_elegida,
          opcion_propuesta:element.payload.doc.data().opcion_propuesta,
        }

        this.lista_datos.push(registro);

        //Modalidad 
        switch (registro.opcion_elegida) {
          case "Sede Universitaria del Centro Cambia":
                 this.sedeUni+=1;
            break;
          case "Sede Administrativa de la Gobernacion del Magdalena":
                this.sedeAdmin+=1
          break;
          case "Centro de Emprendimiento":
                this.CentroEmp+=1;
          break;
          case "Instituto de Formación para el Trabajo":
            this.InstitutoForm+=1;
          break;
        }

      })

      this.OpcionesElegidas_Data=[
        {
          name: "Sede Universitaria del Centro Cambia",
          value: this.sedeUni
        },
        {
          name: "Sede Administrativa de la Gobernacion del Magdalena",
          value: this.sedeAdmin
        },
        {
          name: "Centro de Emprendimiento",
          value: this.CentroEmp
        },
        {
          name: "Instituto de Formación para el Trabajo",
          value: this.InstitutoForm
        }
      ]
    })
  }
  onSelect(data: any): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  //Para redondear los porcentajes en las graficas , se pasa en solo 1
  percentageFormatting(c:any) {
    return Math.round(c);
  }
  descargarexcel(){
    this._ExportarexcelService.exportToExcel(this.lista_datos, 'Registros Postulados')
  }

  resetVariables(){
    this.numeropostulados=0;
    this.lista_datos=[];
    this.sedeUni=0;
    this.sedeAdmin=0;
    this.CentroEmp=0;
    this.InstitutoForm=0;
    this.OpcionesElegidas_Data=[]
  }
}
