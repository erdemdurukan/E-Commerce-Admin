package com.example.proje1.webapi;

import com.example.proje1.Business.Abstracts.CategoryService;
import com.example.proje1.Entities.Category;
import com.example.proje1.Entities.Item;
import lombok.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin("*")
//@CrossOrigin(origins = {"http://localhost:3000", "http://example.com"})
@RequestMapping(path="/api")
public class CategoryController {
    private CategoryService categoryService;

    @GetMapping("/categories")
    public List<Category> getAllCategories(){
        return categoryService.getAllCategories();
    }
    @GetMapping("/categories/HowMany/{catId}")
    public int getNumberOfItems(@PathVariable("catId") int catId){
        return categoryService.getNumberOfItems( catId);
    }

    @DeleteMapping("/categories/DeleteCategory/{catId}")
    public int deleteCategoryById(@PathVariable("catId") int catId){
        return categoryService.deleteCategoryById( catId);
    }
    @PostMapping("/categories/create")
    public Category createCategory(@RequestBody Category category){return  categoryService.createCategory(category);}

    @PutMapping("/categories/update/{Id1}")
    public void updateCategoryTypesName(@PathVariable("Id1") int Id1,String name){
          categoryService.updateCategoryTypesName(Id1,name);
    }
}


