package com.example.server.service;

import com.example.server.model.userModel;
import com.example.server.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class userService {

    @Autowired
    private userRepository userRepository;

    public List<userModel> getAllUsers() {
        return userRepository.findAll();
    }

    public userModel getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public userModel saveUser(userModel user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
