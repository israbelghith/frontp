import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facture } from '../Model/Facture';
import { Paiement } from '../Model/Paiement';
import { PaiementAvecFacture } from '../Model/PaiementAvecFacture';
import { PaiementSansFacture } from '../Model/PaiementSansFacture';
import { AuthentifierService } from './connection.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  apiURL: string = 'http://localhost:8080/caisses';
  constructor(private http: HttpClient, private authService: AuthentifierService) {
  }


  listerPaiements(numS: number): Observable<Paiement[]>{
    return this.http.get<Paiement[]>(this.apiURL+'/paiement/listerPaiement/'+numS);
    }

  ListerTousPaiements(): Observable<Paiement[]>{
    return this.http.get<Paiement[]>(this.apiURL+'/paiement/ListerTousPaiements');
    }

  ajouterPaiement( paiement: PaiementAvecFacture):Observable<PaiementAvecFacture>{
    return this.http.post<PaiementAvecFacture>(this.apiURL+'/paiementAvecFacture/ajouterPaiement', paiement);
    }

  saisirAvance( paiement: PaiementSansFacture):Observable<PaiementSansFacture>{
    return this.http.post<PaiementSansFacture>(this.apiURL+'/paiementSansFacture/saisirAvance', paiement);
    }

  PayerFacture(factures : Facture[]) {
    const url = `${this.apiURL}/paiementAvecFacture/payer`;
    return this.http.put(url, factures);
    }

  AnnulerPaiement(factures : Facture[]):Observable<PaiementAvecFacture> {
    const url = `${this.apiURL}/paiementAvecFacture/annuler`;
    return this.http.put<PaiementAvecFacture>(url, factures);
    }

  modifierPaiements(paiements: PaiementAvecFacture[]) {
    return this.http.put("http://localhost:8095/synch/paiement/modifierPaiements",paiements);
    }

}
