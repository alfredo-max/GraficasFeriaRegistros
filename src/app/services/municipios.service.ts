import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {

  constructor(private firestore:AngularFirestore) { }

  getMunicipio(id:string):Observable<any>{
    return this.firestore.collection('municipios').doc(id).snapshotChanges();   
  }
  getMunicipios():Observable<any>{
    return this.firestore.collection('municipios').snapshotChanges();
    
  }
}
