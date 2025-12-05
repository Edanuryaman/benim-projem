package com.edanur.services;

import com.edanur.dto.DtoEmployee;

import java.util.List;

public interface IEmployeeService {
    public List<DtoEmployee> getAllEmployees();
}
