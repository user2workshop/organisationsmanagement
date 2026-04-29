package de.conciso.orgmgmt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class OrganisationsmanagementApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrganisationsmanagementApplication.class, args);
    }
}
