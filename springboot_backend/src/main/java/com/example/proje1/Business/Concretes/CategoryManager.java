package com.example.proje1.Business.Concretes;

import com.example.proje1.Business.Abstracts.CategoryService;
import com.example.proje1.DataAccess.CategoryRepository;
import com.example.proje1.DataAccess.ItemRepository;
import com.example.proje1.Entities.Category;
import com.example.proje1.Entities.Item;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@AllArgsConstructor
@Service
public class CategoryManager implements CategoryService {
    private CategoryRepository categoryRepository;
    private ItemRepository itemRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public int getNumberOfItems(int catId) {
        int var1=0;
        for (Item item : itemRepository.findAll()) {
            if(item.getCategory().getId()==catId){
                var1++;
            }
        }

        return var1;
    }

    @Override
    public int deleteCategoryById(int catId) {
        categoryRepository.deleteById(catId);
        return catId;
    }

    @Override
    public void updateCategoryTypesName(int catId1, String name) {


        var category1 = categoryRepository.findById(catId1).orElseThrow();
        category1.setType(name);
        categoryRepository.save(category1);


        for (Item item : itemRepository.findAll()) {
            if(item.getCategory().getId()==catId1){
                item.setType(name);
                itemRepository.save(item);
            }
        }





    }


}
