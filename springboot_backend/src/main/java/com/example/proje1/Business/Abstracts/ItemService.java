package com.example.proje1.Business.Abstracts;

import com.example.proje1.Entities.Category;
import com.example.proje1.Entities.Item;
import jakarta.persistence.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ItemService {
    void update(int degistirilecekItem);


    List<Item> getAllItems();
    Item getItemsById(int itemId);
  //  List<Item> getItemsByType(String type);

    void delete(int itemId);

    void save(Item eklenecekItem);
    public String createItemWithImage(MultipartFile file, String itemName,  double Itemprice,int category,int count) throws IOException;


    List<String> getAllItemNames();

    void updateAll(int Id1, String name1,int category, MultipartFile file1, int count1, double price1) throws IOException;
}
