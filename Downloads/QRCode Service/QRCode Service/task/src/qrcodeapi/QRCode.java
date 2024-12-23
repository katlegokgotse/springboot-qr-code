package qrcodeapi;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.BufferedImageHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@RestController
public class QRCode{
    @GetMapping(path = "/api/qrcode")
    public ResponseEntity<byte[]> getCode() throws IOException {
        int width = 250;
        int height = 250;
        BufferedImage bufferedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics2D = bufferedImage.createGraphics();
        graphics2D.setColor(Color.WHITE);
        graphics2D.fillRect(0, 0, width, height);
       try(var baos = new ByteArrayOutputStream()){
           ImageIO.write(bufferedImage, "png", baos); //writes the image in png format
           byte[] bytes = baos.toByteArray();
           return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(bytes);
       } catch (Exception e) {
           return new ResponseEntity<>(HttpStatusCode.valueOf(500));
       } finally {

       }

    }
    @Bean
    public HttpMessageConverter<BufferedImage> bufferedImageHttpMessageConverter() {
        return new BufferedImageHttpMessageConverter();
    }
}
