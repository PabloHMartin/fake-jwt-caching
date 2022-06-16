import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$: Observable<any> = this.products.products$;

  constructor(private products: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  navigateBack(){
    this.router.navigateByUrl('home')
  }


}
