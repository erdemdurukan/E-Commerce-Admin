package com.example.proje1.Entities;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="UrunlerResimli")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int Id;
    @Column(name = "type")
    String type;

    @Column(name = "name")
    String name;
    @Column(name = "price")
    double price;
    @Column(name = "count")
    int count;//stokta kac tane var

    @Lob
    @Column(name = "imageData" )
    byte[] imageData;

    @ManyToOne(targetEntity = Category.class)
    Category category;

}
