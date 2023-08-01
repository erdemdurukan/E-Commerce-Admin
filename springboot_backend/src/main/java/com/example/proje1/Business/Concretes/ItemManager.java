package com.example.proje1.Business.Concretes;

import com.example.proje1.Business.Abstracts.ItemService;
import com.example.proje1.DataAccess.CategoryRepository;
import com.example.proje1.DataAccess.ItemRepository;
import com.example.proje1.Entities.Category;
import com.example.proje1.Entities.Item;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@Service
public class ItemManager implements ItemService {
    private ItemRepository itemRepository;
    private CategoryRepository categoryRepository;

    @Override
    public void update(int degistirilecekItem) {
        //stoku bir azaltma

        var item = itemRepository.findById(degistirilecekItem).orElseThrow();
        item.setCount(item.getCount() - 1);
        itemRepository.save(item);

        System.out.println(itemRepository.findById(degistirilecekItem).get().getCount());

    }

    @Override
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @Override
    public Item getItemsById(int itemId) {
        return itemRepository.findById(itemId).get();
    }

   /* @Override
    public List<Item> getItemsByType(String aranantype) {
        List<Item> items= itemRepository.findAll();
        ArrayList<Item> sameType= new ArrayList<>();
        for(int i=0;i<items.size();i++){
            if(items.get(i).getType().equals(aranantype)){
                sameType.add(items.get(i));
            }
        }
        return sameType;
    }

    */

    @Override
    public void delete(int itemId) {
        itemRepository.deleteById(itemId);
    }

    @Override
    public void save(Item eklenecekItem) {
        itemRepository.save(eklenecekItem);
    }

    @Override
    public String createItemWithImage(MultipartFile file, String itemName, double itemprice, int category, int itemCount) throws IOException {
        Category category1 = categoryRepository.findById(category).orElseThrow();
        Item saveData = itemRepository.save(Item.builder()
                .name(itemName)
                .category(category1) //category id
                .type(category1.getType())
                .price(itemprice)
                .count(itemCount)
                .imageData(file.getBytes()).build());

        if (saveData != null) {
            return "file uploaded successfully" + file.getOriginalFilename();
        }
        return null;

    }

    @Override
    public List<String> getAllItemNames() {
        ArrayList<String> names = new ArrayList<>();
        for (Item item : itemRepository.findAll()) {
            names.add(item.getName());
        }
        return names;

    }

    @Override
    public void updateAll(int Id1, String name1,int category, MultipartFile file1, int count1, double price1) throws IOException {
        Category category1 = categoryRepository.findById(category).orElseThrow();

        for (Item item : itemRepository.findAll()) {
            if (item.getId() == Id1) {
                System.out.println("here");
                item.setCategory(category1);
                item.setType(category1.getType());
                item.setCount(count1);
                item.setPrice(price1);
                item.setName(name1);
                item.setImageData(file1.getBytes());
                itemRepository.save(item);
                System.out.println(item.getType());
                System.out.println(category1.getType());

            }
        }
        for (Item item : itemRepository.findAll()) {
            System.out.println(item.getName());
            System.out.println(item.getType());
            System.out.println(item.getPrice());
        }


    }

}
