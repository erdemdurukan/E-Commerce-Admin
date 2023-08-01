package com.example.proje1.webapi;
import com.example.proje1.Business.Abstracts.ItemService;
import com.example.proje1.Entities.Category;
import com.example.proje1.Entities.Item;
import jakarta.servlet.annotation.HttpConstraint;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping(path="/api")
public class ItemController {
    private  ItemService itemService;

    @GetMapping("/items")
    public List<Item> getAllItems(){
        return itemService.getAllItems();
    }
    @GetMapping("/items/names")
    public List<String> getAllItemNames(){
        return itemService.getAllItemNames();
    }

    @GetMapping("/items/findItemById/{itemId}")
    private Item getItems(@PathVariable("itemId") int itemId)
    {
        return itemService.getItemsById(itemId);
    }


   /*
   @GetMapping("/items/{itemType}")
   private List<Item> getItems(@PathVariable("itemType") String itemType) { return itemService.getItemsByType(itemType);}
   */

    @DeleteMapping("/items/{itemId}")
    private void deleteItem(@PathVariable("itemId") int itemId)
    {
       itemService.delete(itemId);
    }

    @PostMapping("/items") // HTTP post genelde create etmek icin kullanilir.
    private int saveItem(@RequestBody Item eklenecekItem) {
        itemService.save(eklenecekItem);
        return eklenecekItem.getId();

    }

    @PutMapping("/items/changeValue/{itemId}" )  // HTTP PUT method is used to update an existing resource
    private int update(@PathVariable("itemId") int itemId) {
        itemService.update(itemId);
        System.out.println("erdem");
        return itemId;
    }
    @PostMapping("/items/CreateItem")
    private ResponseEntity<?> createNewItem(@RequestParam MultipartFile file1,
                                            @RequestParam String name1,
                                           // @RequestParam String type1,
                                            @RequestParam int catId1,
                                            @RequestParam double price1,
                                            @RequestParam int count1) throws IOException {
        String a=itemService.createItemWithImage(file1,name1,price1,catId1,count1);
        return ResponseEntity.status(HttpStatus.OK).body(a);

    }
    @PutMapping("/items/update/{Id1}")
    public void updateAll(@PathVariable("Id1") int Id1,String name1,int category,
                          MultipartFile file1,int count1,double price1) throws IOException {
        itemService.updateAll(Id1,name1,category,file1, count1, price1);
    }

}
