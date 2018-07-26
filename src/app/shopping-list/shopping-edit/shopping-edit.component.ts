import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from "@angular/forms";
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  editMode = false;
  editedItemIndex:number;
 subscription = new Subscription;
 editItem : Ingredient;
 @ViewChild('f') slForm:NgForm;
  constructor(private slService : ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index:number)=>{
        this.editedItemIndex = index;
        this.editMode = true;
        this.editItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name:this.editItem.name,
          amount:this.editItem.amount
        });
      }
    );
  }
  onAddItem(form: NgForm){
     const value = form.value;
     const newIngredient = new Ingredient(value.name,value.amount);
     
     if(this.editMode){
       this.slService.updateIngredient(this.editedItemIndex,newIngredient);
     }else{
      this.slService.addIngredient(newIngredient);
     }
     //this.ingredientAdded.emit(newIngredient);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
