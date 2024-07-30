package com.example.server.controller;

import com.example.server.model.userModel;
import com.example.server.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class userController {

    @Autowired
    private userService userService;

    @GetMapping
    public List<userModel> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public userModel getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public userModel saveUser(@RequestBody userModel user) {
        return userService.saveUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
