package com.edanur.services;

import com.edanur.dto.DtoEmployee;
import com.edanur.dto.DtoEmployeeIU;

import java.util.List;

public interface IEmployeeService {
    public List<DtoEmployee> getAllEmployees();

    public DtoEmployee getEmployeeById(long id);

    public Boolean saveEmployee(DtoEmployeeIU dtoEmployeeIU);
}
