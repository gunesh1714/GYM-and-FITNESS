package com.example.server.service;

import com.example.server.model.adminModel;
import com.example.server.repository.adminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class adminService {

    @Autowired
    private adminRepository adminRepository;

    public List<adminModel> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<adminModel> getAdminById(Long id) {
        return adminRepository.findById(id);
    }

    public adminModel saveAdmin(adminModel admin) {
        return adminRepository.save(admin);
    }

    public adminModel updateAdmin(Long id, adminModel updatedAdmin) {
        return adminRepository.findById(id).map(admin -> {
            admin.setEmail(updatedAdmin.getEmail());
            admin.setPassword(updatedAdmin.getPassword());
            return adminRepository.save(admin);
        }).orElse(null);
    }

    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }

    public adminModel findByEmail(String email) {
        return adminRepository.findByEmail(email);
    }
}
