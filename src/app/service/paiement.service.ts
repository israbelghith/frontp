import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facture } from '../Model/Facture';
import { Paiement } from '../Model/Paiement';
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
  }listerPaiements(numS: number): Observable<Paiement[]>{
    return this.http.get<Paiement[]>(this.apiURL+'/paiement/listerPaiement/'+numS);
    }

ajouterPaiement( paiement: Paiement):Observable<Paiement>{
    return this.http.post<Paiement>(this.apiURL+'/paiementAvecFacture/ajouterPaiement', paiement, httpOptions);
    }
    saisirAvance( paiement: PaiementSansFacture):Observable<PaiementSansFacture>{
      return this.http.post<PaiementSansFacture>(this.apiURL+'/paiementSansFacture/saisirAvance', paiement, httpOptions);
      }

  PayerFacture(factures : Facture[]) {
    const url = `${this.apiURL}/paiementAvecFacture/payer`;
    return this.http.put(url, factures, httpOptions);
    }
AnnulerPaiement(factures : Facture[]):Observable<Paiement> {
        const url = `${this.apiURL}/paiementAvecFacture/annuler`;
        return this.http.put<Paiement>(url, factures, httpOptions);
        }


}
