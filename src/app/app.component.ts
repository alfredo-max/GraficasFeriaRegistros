import { Component, OnInit,ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MunicipiosService} from 'src/app/services/municipios.service';
import {ScaleType } from '@swimlane/ngx-charts';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  series:object[];
}
 const MUNICIPIOS_DATA: PeriodicElement[] =[];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //tabla material
  displayedColumns: string[] = ['select', 'position', 'name'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.getMunicipiosData());
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  ////////////////////////////////////
  title = 'grafica3';
  municipios: any[]=[];
  Jsonmunicipios: any=[]=[];
  
  
  view:[number,number] = [650, 450];
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
     domain: ['#0A84FF', '#FFE50A', '#AAAAAA'],group: ScaleType.Ordinal,name:"colores",selectable:true
   }
 
   //tabla material
   
   constructor(private _municipioservice: MunicipiosService,private elem: ElementRef) { }
   ngOnInit(): void { }
   ngAfterViewInit():void{  
    this.dataSource.paginator = this.paginator;
   }
   listaMunicipios=[];
   mostrar=false;
   cargandodatos=true;//para el spinner
  VerMunicipios(){
    this.dataSource.data=MUNICIPIOS_DATA;
    this.cargandodatos=false;
  }
  VerGraficas(){
    this.municipios=[];
    for (let item of this.selection.selected ){
      this.municipios.push({
                name:item.name,
                series:item.series
              })
    }
       this.Jsonmunicipios=JSON.stringify(this.selection.selected);
       this.listaMunicipios=JSON.parse(this.Jsonmunicipios);
       this.mostrar=true;
  }

   onSelect( e: Event) {
    //  console.log(e);
   }
  

  getMunicipiosData(){
  
    this._municipioservice.getMunicipios().subscribe(data=>{
      var i=1;
      data.forEach((element:any) => {
           const municipio: PeriodicElement={
            position: i,
            name:element.payload.doc.data().name,
            series:element.payload.doc.data().series
           }
           MUNICIPIOS_DATA.push(municipio); 
          i++;
        } 
                
       );
    })
    setTimeout(() => {
      this.VerMunicipios()
     }, 3000);
      return MUNICIPIOS_DATA;
  }
}
