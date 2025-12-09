package com.edanur.mapper;

import com.edanur.dto.DtoDepartment;
import com.edanur.dto.DtoDepartmentIU;
import com.edanur.entity.Department;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DepartmentMapper {
    Department toEntity(DtoDepartmentIU dtoDepartmentIU);
    DtoDepartment toDto(Department department);
}
