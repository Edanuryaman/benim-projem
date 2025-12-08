package com.edanur.services.impl;

import com.edanur.dto.DtoCommunication;
import com.edanur.dto.DtoCommunicationIU;
import com.edanur.entity.Communication;
import com.edanur.repository.CommunicationRepository;
import com.edanur.services.ICommunicationService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommunicationServiceImpl implements ICommunicationService {

    @Autowired
    private CommunicationRepository communicationRepository;

    @Override
    public DtoCommunication save(DtoCommunicationIU dtoCommunicationIU) {
        DtoCommunication dtoCommunication = new DtoCommunication();
        Communication communication = new Communication();
        BeanUtils.copyProperties(dtoCommunicationIU,communication);
        Communication dbCommunication = communicationRepository.save(communication);
        BeanUtils.copyProperties(dbCommunication,dtoCommunication);
        return dtoCommunication;
    }
}
