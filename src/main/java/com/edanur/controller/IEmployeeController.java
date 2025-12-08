package com.edanur.controller;

import com.edanur.dto.DtoEmployee;
import com.edanur.dto.DtoEmployeeIU;

import java.util.List;

public interface IEmployeeController {
    public List<DtoEmployee> getEmployeeList();
    public DtoEmployee getEmployeeById(long id);
    public DtoEmployee saveEmployee(DtoEmployeeIU dtoEmployeeIU);
}
