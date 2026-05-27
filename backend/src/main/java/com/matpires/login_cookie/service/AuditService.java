package com.matpires.login_cookie.service;

import com.matpires.login_cookie.entity.AuditLog;
import com.matpires.login_cookie.repository.AuditLogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuditService {

    private final AuditLogRepository repository;

    public AuditService(AuditLogRepository repository) {
        this.repository = repository;
    }

    public void log(String action,
                    String endpoint,
                    String method,
                    String ip,
                    boolean success) {
        log.info("Logging action: {}", action);

        AuditLog log = new AuditLog();
        log.setAction(action);
        log.setEndpoint(endpoint);
        log.setMethod(method);
        log.setIp(ip);
        log.setSuccess(success);

        repository.save(log);
    }
}
