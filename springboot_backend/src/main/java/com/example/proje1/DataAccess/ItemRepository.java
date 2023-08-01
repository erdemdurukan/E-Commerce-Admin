package com.example.proje1.DataAccess;

import com.example.proje1.Entities.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item,Integer> {
    Optional<Item>findByName(String fileName);

}
