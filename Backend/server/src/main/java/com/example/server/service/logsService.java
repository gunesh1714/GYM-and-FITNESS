package com.example.server.service;

import com.example.server.model.logsModel;
import com.example.server.repository.logsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class logsService {

    @Autowired
    private logsRepository logsRepository;

    public List<logsModel> getAllLogs() {
        return logsRepository.findAll();
    }

    public logsModel getLogById(Long id) {
        return logsRepository.findById(id).orElse(null);
    }

    public logsModel saveLog(logsModel log) {
        return logsRepository.save(log);
    }

    public logsModel updateLog(Long id, logsModel updatedLog) {
        return logsRepository.findById(id)
                .map(log -> {
                    log.setTimeStamp(updatedLog.getTimeStamp());
                    log.setEvent(updatedLog.getEvent());
                    log.setUserName(updatedLog.getUserName());
                    log.setStatus(updatedLog.getStatus());
                    return logsRepository.save(log);
                })
                .orElse(null);
    }

    public void deleteLog(Long id) {
        logsRepository.deleteById(id);
    }
}
