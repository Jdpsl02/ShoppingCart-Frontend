import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl='http://localhost:4926/users';

  public type = new BehaviorSubject<any>("");
  
  constructor(private httpClient:HttpClient) { }

  getAllProduct():Observable<Product[]>{ 
     return this.httpClient.get<Product[]>('http://localhost:8082/product/products')
  }
  
  getProductsByType(productType:any):Observable<Product[]>{
    return this.httpClient.get<Product[]>('http://localhost:8082/product/findByType/'+productType);
  }

}
