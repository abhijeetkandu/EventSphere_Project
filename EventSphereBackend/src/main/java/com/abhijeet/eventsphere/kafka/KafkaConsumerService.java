//package com.abhijeet.eventsphere.kafka;
//
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.stereotype.Service;
//
//@Service
//public class KafkaConsumerService {
//
//    @KafkaListener(topics = "event-topic", groupId = "eventsphere-group")
//    public void consume(String message){
//        System.out.println("====================================");
//        System.out.println("Kafka Message Received : " + message);
//        System.out.println("====================================");
//    }
//}
