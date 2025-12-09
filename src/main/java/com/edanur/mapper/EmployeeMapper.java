package com.edanur.mapper;

import com.edanur.dto.DtoEmployee;
import com.edanur.dto.DtoEmployeeIU;
import com.edanur.entity.Employee;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {
    Employee toEntity (DtoEmployeeIU dtoEmployeeIU);
    DtoEmployee toDto (Employee employee);
}
