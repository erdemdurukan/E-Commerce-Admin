package com.example.proje1.Business.Abstracts;

import com.example.proje1.Entities.Category;

import java.util.List;


public interface CategoryService {
    List<Category> getAllCategories();

    Category createCategory(Category category);

    int getNumberOfItems(int catId);

    int deleteCategoryById(int catId);

    void updateCategoryTypesName(int catId1, String name);
}
