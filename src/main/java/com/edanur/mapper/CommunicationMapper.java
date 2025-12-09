package com.edanur.mapper;

import com.edanur.dto.DtoCommunication;
import com.edanur.dto.DtoCommunicationIU;
import com.edanur.entity.Communication;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommunicationMapper {
    Communication toEntity (DtoCommunicationIU dtoCommunicationIU);
    DtoCommunication toDto (Communication communication);
}
