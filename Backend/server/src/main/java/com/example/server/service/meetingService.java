package com.example.server.service;

import com.example.server.model.meetingModel;
import com.example.server.repository.meetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class meetingService {

    @Autowired
    private meetingRepository meetingRepository;

    public List<meetingModel> getAllMeetings() {
        return meetingRepository.findAll();
    }

    public meetingModel getMeetingById(Long id) {
        return meetingRepository.findById(id).orElse(null);
    }

    public meetingModel saveMeeting(meetingModel meeting) {
        return meetingRepository.save(meeting);
    }

    public meetingModel updateMeeting(Long id, meetingModel updatedMeeting) {
        return meetingRepository.findById(id).map(meeting -> {
            meeting.setFullName(updatedMeeting.getFullName());
            meeting.setReason(updatedMeeting.getReason());
            meeting.setDate(updatedMeeting.getDate());
            meeting.setTime(updatedMeeting.getTime());
            meeting.setEmail(updatedMeeting.getEmail());
            return meetingRepository.save(meeting);
        }).orElse(null);
    }

    public void deleteMeeting(Long id) {
        meetingRepository.deleteById(id);
    }
}
