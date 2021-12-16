package com.example.backend.helpers;

import org.apache.commons.codec.digest.DigestUtils;

public class Helpers {
    public static String getSha256(String inputString) {
        return DigestUtils.sha256Hex(inputString);
    }
}
