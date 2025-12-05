package com.edanur.controller;

import com.edanur.dto.DtoEmployee;

import java.util.List;

public interface IEmployeeController {
    public List<DtoEmployee> getEmployeeList();
}
