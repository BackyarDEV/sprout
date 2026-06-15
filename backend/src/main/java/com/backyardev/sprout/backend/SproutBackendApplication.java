package com.backyardev.sprout.backend;

import org.h2.tools.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.SQLException;

@SpringBootApplication
public class SproutBackendApplication {

    static void main(String[] args) throws SQLException {
        // Start H2 TCP server before Spring context initializes so the DataSource can connect to it
        var tcpServer = Server.createTcpServer("-tcp", "-tcpAllowOthers", "-tcpPort", "9092").start();
        Runtime.getRuntime().addShutdownHook(new Thread(tcpServer::stop));

        SpringApplication.run(SproutBackendApplication.class, args);
    }

}
