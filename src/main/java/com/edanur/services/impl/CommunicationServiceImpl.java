package com.edanur.services.impl;

import com.edanur.dto.DtoCommunication;
import com.edanur.dto.DtoCommunicationIU;
import com.edanur.entity.Communication;
import com.edanur.mapper.CommunicationMapper;
import com.edanur.repository.CommunicationRepository;
import com.edanur.services.ICommunicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommunicationServiceImpl implements ICommunicationService {

    @Autowired
    private CommunicationRepository communicationRepository;
    @Autowired
    private CommunicationMapper communicationMapper;

    @Override
    public DtoCommunication save(DtoCommunicationIU dtoCommunicationIU) {
        Communication communication = communicationMapper.toEntity(dtoCommunicationIU);
        Communication dbCommunication = communicationRepository.save(communication);
        return communicationMapper.toDto(dbCommunication);
    }
}
