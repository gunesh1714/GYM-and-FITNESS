package com.example.server.controller;

import com.example.server.model.adminModel;
import com.example.server.service.adminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admins")
@CrossOrigin(origins = "http://localhost:3000") // Adjust if needed
public class adminController {

    @Autowired
    private adminService adminService;

    @GetMapping
    public ResponseEntity<List<adminModel>> getAllAdmins() {
        List<adminModel> admins = adminService.getAllAdmins();
        return ResponseEntity.ok(admins);
    }

    @GetMapping("/{id}")
    public ResponseEntity<adminModel> getAdminById(@PathVariable Long id) {
        Optional<adminModel> admin = adminService.getAdminById(id);
        return admin.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<adminModel> saveAdmin(@RequestBody adminModel admin) {
        adminModel savedAdmin = adminService.saveAdmin(admin);
        return ResponseEntity.ok(savedAdmin);
    }

    @PutMapping("/{id}")
    public ResponseEntity<adminModel> updateAdmin(@PathVariable Long id, @RequestBody adminModel updatedAdmin) {
        adminModel admin = adminService.updateAdmin(id, updatedAdmin);
        return admin != null ? ResponseEntity.ok(admin) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.noContent().build();
    }
}
