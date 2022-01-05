import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreserviceService {

  constructor(private firestore:AngularFirestore) { }

  getDatos():Observable<any>{
    return this.firestore.collection('postulados').snapshotChanges();
  }
}
