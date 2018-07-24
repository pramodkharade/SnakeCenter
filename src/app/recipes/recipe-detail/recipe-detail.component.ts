import { Component, OnInit,Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
@Injectable()
export class RecipeDetailComponent implements OnInit {
 recipe:Recipe;
 id:number;
  constructor(private recipeService : RecipeService,private route:ActivatedRoute,private slService:ShoppingListService) { }

  ngOnInit() {
    //const id = this.route.snapshot.params['id'];
    this.route.params
    .subscribe(
      (params:Params)=>{
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }
  onAddToShoppingList(){
     this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

}
