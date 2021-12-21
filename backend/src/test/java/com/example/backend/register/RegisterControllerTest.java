package com.example.backend.register;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Calendar;

@ExtendWith(SpringExtension.class)
@WebMvcTest(RegisterController.class)
class RegisterControllerTest {
    @Autowired
    private MockMvc mvc;
    private final Logger logger = LoggerFactory.getLogger(RegisterControllerTest.class);

    @Test
    void testRegister(@RequestBody Calendar user) {
        logger.info(user.toString());
        RequestBuilder request = MockMvcRequestBuilders.get("/hello");
        MvcResult result = null;
        try {
            result = mvc.perform(request).andReturn();
            logger.info(result.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}