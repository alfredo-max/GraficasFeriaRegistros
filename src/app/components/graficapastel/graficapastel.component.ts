import { Component, OnInit } from '@angular/core';
import { FirestoreserviceService } from 'src/app/services/firestoreservice.service';
import { ScaleType } from '@swimlane/ngx-charts';
import { ExportExcelService } from 'src/app/services/export-excel.service';

export interface PostuladoElement {
  tipo_de_identificacion:string,
  numero_de_identificacion:number,
  nombres:string,
  apellidos:string,
  telefono: number,
  email:string,
  genero:string,
  sexo:string,
  pais:string,
  departamento:string,
  municipio:string,
  direccion:string,
  descri:string,
  modalidad:string,
  tipo:string,
  nombreEquipo:string,
  eps:string, 
  facebook:string,
  instagram:string,
  twitter:string,
  fecha:string,
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
  Modalidad_Data: PeriodicElement[] = [];
  ruta=0;
  hibridamtb=0;
  hibrida=0;

  Tipo_Data: PeriodicElement[] = [];
  individual=0;
  equipo=0;

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
      this.numeropostulados=data.length;
      data.forEach((element: any) => {

        const registro: PostuladoElement={
          tipo_de_identificacion:element.payload.doc.data().tipo_de_identificacion,
          numero_de_identificacion:element.payload.doc.data().numero_de_identificacion,

          nombres:element.payload.doc.data().nombre,
          apellidos:element.payload.doc.data().apellido,

          telefono: element.payload.doc.data().telefono,
          email:element.payload.doc.data().email,

          genero:element.payload.doc.data().genero,
          sexo:element.payload.doc.data().sexo,

          pais:element.payload.doc.data().pais,
          departamento:element.payload.doc.data().departamento,

          direccion:element.payload.doc.data().direccion,
          municipio:element.payload.doc.data().ciudad,

          descri:element.payload.doc.data().descripcion_bicicleta,
          modalidad:element.payload.doc.data().modalidad,

          tipo:element.payload.doc.data().tipo_de_participacion,
          nombreEquipo:element.payload.doc.data().nombreEquipo,

          eps:element.payload.doc.data().eps,
          fecha:element.payload.doc.data().fecha,

          facebook:element.payload.doc.data().facebook,
          instagram:element.payload.doc.data().instagram,
          twitter:element.payload.doc.data().twitter,
        }

        this.lista_datos.push(registro);

        //Modalidad 
        switch (registro.modalidad) {
          case "Ruta":
                 this.ruta+=1;
            break;
          case "Híbrida MTB":
                this.hibridamtb+=1
          break;
          case "Híbrida":
                this.hibrida+=1;
          break;
        }
        switch (registro.tipo) {
          case "Individual":
                 this.individual+=1;
            break;
          case "Equipo":
                this.equipo+=1
          break;
        }

      })

      this.Modalidad_Data=[
        {
          name: "Ruta",
          value: this.ruta
        },
        {
          name: "Híbrida MTB",
          value: this.hibridamtb
        },
        {
          name: "Híbrida",
          value: this.hibrida
        }
      ]

      this.Tipo_Data=[
        {
          name: "Individual",
          value: this.individual
        },
        {
          name: "Equipo",
          value: this.equipo
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
}
