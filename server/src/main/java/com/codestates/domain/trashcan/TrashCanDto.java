package com.codestates.domain.trashcan;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class TrashCanDto {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class CreateRequest {
        @JsonProperty("Latitude")
        private Double latitude;

        @JsonProperty("Longitude")
        private Double longitude;

        @JsonProperty("Address")
        private String location;

        @JsonProperty("canType")
        private String canType;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class UpdateRequest {
        private Long id;

        @JsonProperty("Latitude")
        private Double latitude;

        @JsonProperty("Longitude")
        private Double longitude;

        @JsonProperty("Address")
        private String location;

        @JsonProperty("canType")
        private String canType;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response {
        private Long id;

        @JsonProperty("Latitude")
        private Double latitude;

        @JsonProperty("Longitude")
        private Double longitude;

        @JsonProperty("Address")
        private String location;

        @JsonProperty("canType")
        private String canType;

        private int likeCount;

        private int dislikeCount;
    }
}

