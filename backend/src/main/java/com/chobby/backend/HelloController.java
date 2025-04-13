package com.chobby.backend;
import org.springframework.boot.autoconfigure.*;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableAutoConfiguration
public class HelloController {

@RequestMapping("/")
    String home() {
        return "Hello World!";
    }
}
