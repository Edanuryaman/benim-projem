package com.edanur.controller.impl;

import com.edanur.controller.ICommunicationController;
import com.edanur.dto.DtoCommunication;
import com.edanur.dto.DtoCommunicationIU;
import com.edanur.services.ICommunicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/api/communication")
public class CommunicationControllerImpl implements ICommunicationController {

    @Autowired
    private ICommunicationService communicationService;

    @PostMapping(path = "/save")
    @Override
    public DtoCommunication save(@RequestBody DtoCommunicationIU dtoCommunicationIU) {
        return communicationService.save(dtoCommunicationIU);
    }
}
