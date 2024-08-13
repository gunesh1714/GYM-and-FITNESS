package com.example.server.controller;

import com.example.server.model.meetingModel;
import com.example.server.service.meetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meetings")
@CrossOrigin(origins = "http://localhost:3000")
public class meetingController {

    @Autowired
    private meetingService meetingService;

    @GetMapping
    public ResponseEntity<List<meetingModel>> getAllMeetings() {
        List<meetingModel> meetings = meetingService.getAllMeetings();
        return ResponseEntity.ok(meetings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<meetingModel> getMeetingById(@PathVariable Long id) {
        meetingModel meeting = meetingService.getMeetingById(id);
        if (meeting != null) {
            return ResponseEntity.ok(meeting);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<meetingModel> saveMeeting(@RequestBody meetingModel meeting) {
        meetingModel savedMeeting = meetingService.saveMeeting(meeting);
        return ResponseEntity.ok(savedMeeting);
    }

    @PutMapping("/{id}")
    public ResponseEntity<meetingModel> updateMeeting(@PathVariable Long id, @RequestBody meetingModel updatedMeeting) {
        meetingModel meeting = meetingService.updateMeeting(id, updatedMeeting);
        if (meeting != null) {
            return ResponseEntity.ok(meeting);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeeting(@PathVariable Long id) {
        meetingService.deleteMeeting(id);
        return ResponseEntity.noContent().build();
    }
}
