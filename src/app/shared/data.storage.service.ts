import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    constructor(
        private httpClient: HttpClient,
        private recipeService: RecipeService,
    private authService: AuthService) {}

    storeRecipes() {
    //    return this.httpClient.put('https://snackrecipebook.firebaseio.com/recipes.json', this.recipeService.getRecipes(),
    //    {
    //        observe: 'body',
    //        params: new HttpParams().set('auth', token)
    //    });
    const req = new HttpRequest('PUT',
    'https://snackrecipebook.firebaseio.com/recipes.json',
    this.recipeService.getRecipes(),
    {
        reportProgress: true
    }
    );
     return this.httpClient.request(req);
    }
    getRecipes() {
        const token = this.authService.getToken();
        this.httpClient.get<Recipe[]>('https://snackrecipebook.firebaseio.com/recipes.json'
        { 
            observe: 'body',
            params: new HttpParams().set('auth', token),
            responseType: 'json'
        })
        .map((recipes) => {
            // tslint:disable-next-line:prefer-const
            for (let recipe of recipes) {
                if (!recipe['ingredients']) {
                    recipe['ingredients'] = [];
                }
            }
            return recipes;
        })
        .subscribe((recipes: Recipe[]) => {
            this.recipeService.setRecipes(recipes);
        });
    }

}
