import { Component, OnInit,ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MunicipiosService} from 'src/app/services/municipios.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {EnviarDatosGraficaService} from 'src/app/services/enviar-datos-grafica.service'

export interface PeriodicElement {
  position: string;
  name: string;
  series:object[];
}
 const MUNICIPIOS_DATA: PeriodicElement[] =[];

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit,AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //tabla material
  displayedColumns: string[] = ['select', 'position', 'name'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.getMunicipiosData());
  selection = new SelectionModel<PeriodicElement>(true, []);
   @ViewChild(MatSort, {static: true}) sort!: MatSort;

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

  municipios: any[]=[];
  Jsonmunicipios: any=[]=[];
  
  constructor(private _municipioservice: MunicipiosService,private _EnviarDatosGraficaService : EnviarDatosGraficaService,private elem: ElementRef) { }


  ngOnInit(): void {
  }
  ngAfterViewInit():void{  
    this.dataSource.paginator = this.paginator;
     this.dataSource.sort=this.sort;
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
      this._EnviarDatosGraficaService.disparadorEnviarDatosaGraficas.emit({
        data:this.listaMunicipios           
      })
  }
  
  getMunicipiosData(){
    this._municipioservice.getMunicipios().subscribe(data=>{
      data.forEach((element:any) => {
           const municipio: PeriodicElement={
            position: element.payload.doc.id,
            name:element.payload.doc.data().name,
            series:element.payload.doc.data().series
           }
           MUNICIPIOS_DATA.push(municipio); 
        } 
                
       );
    })
    setTimeout(() => {
      this.VerMunicipios()
     }, 4000);

      return MUNICIPIOS_DATA;
  }

}
