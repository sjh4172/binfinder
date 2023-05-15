package com.codestates.trashcan;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final TrashCanRepository trashCanRepository;

    @Autowired
    public DataLoader(TrashCanRepository trashCanRepository) {
        this.trashCanRepository = trashCanRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        loadAndSave();
    }

    public void loadAndSave() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        InputStream inputStream = getClass().getResourceAsStream("/abcd.json");
        List<TrashCan> trashCanList = mapper.readValue(inputStream, new TypeReference<List<TrashCan>>(){});
        trashCanRepository.saveAll(trashCanList);
    }
}

