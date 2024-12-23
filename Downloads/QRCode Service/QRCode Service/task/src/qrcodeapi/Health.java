package qrcodeapi;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Health {
    @GetMapping(path = "/api/health")
    public static void getHealth(){
        new ResponseEntity<>(HttpStatusCode.valueOf(200));
    }
}
