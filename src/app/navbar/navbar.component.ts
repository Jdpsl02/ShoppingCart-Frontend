import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { StorageService } from '../services/storage.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  private roles: string[] = [];
  isLoggedIn = false;
  showAddProducts = false;
  showProducts = false;
  showCart = false;
  username!: string;
  searchTerm:string ='';
  typeData!:any;
  clickCart:boolean = false;

  constructor(private storageService:StorageService,
              private router:Router,
              private cartService:CartService,
              private productService:ProductService){

  }
  ngOnInit(): void {
    this.isLoggedIn = !!this.storageService.getToken();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAddProducts = this.roles.includes('ROLE_ADMIN');
      this.showProducts = this.roles.includes('ROLE_ADMIN');
      this.showCart = this.roles.includes('ROLE_USER');

      this.username = user.username;
    }
  }

  onLogout(){
    this.storageService.signOut();
    alert('You have logged out successfully');
    this.router.navigate(['login']).then(()=>{
      window.location.reload();
    });
  }
  
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

  filter(productType:any){
    this.productService.getProductsByType(productType).subscribe(data=>{
      console.log(data);
      this.productService.type.next(data);
    })   
  }

  getAll(){
    this.productService.getAllProduct().subscribe(data=>{
      console.log(data);
      this.productService.type.next(data);
    })
  }

  onClickCart(){
    this.clickCart = true;
    this.router.navigate(['/cart']);
  }

  onClickElectronicShopping(){
    this.router.navigate(['/home']).then(()=>{
      window.location.reload();
    });
  }
}
