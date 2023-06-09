package com.codestates.domain.trashcan;

import com.codestates.domain.vote.Vote;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "trash_cans")
@Getter
@Setter
@JsonIgnoreProperties({"설치위치"})
public class TrashCan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("Latitude")
    @Column(nullable = false)
    private Double latitude;

    @JsonProperty("Longitude")
    @Column(nullable = false)
    private Double longitude;

    @JsonProperty("Address")
    @Column(nullable = false)
    private String location;

    @JsonProperty("canType")
    private String canType;

    private int likeCount;

    private int dislikeCount;

    // 일
    @OneToMany(mappedBy = "trashCan", cascade = CascadeType.ALL)
    private List<Vote> votes = new ArrayList<>();

}
