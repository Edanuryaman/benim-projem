package com.edanur.services.impl;

import com.edanur.dto.DtoCommunication;
import com.edanur.dto.DtoDepartment;
import com.edanur.dto.DtoEmployee;
import com.edanur.entity.Communication;
import com.edanur.entity.Department;
import com.edanur.entity.Employee;
import com.edanur.repository.EmployeeRepository;
import com.edanur.services.IEmployeeService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements IEmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public List<DtoEmployee> getAllEmployees() {
        List<Employee> employeeList = employeeRepository.findAll();
        List<DtoEmployee> dtoEmployeeList = new ArrayList<>();
        if (employeeList.isEmpty()) {
            return null;
        }
        for (Employee employee : employeeList) {
            DtoEmployee dtoEmployee = new DtoEmployee();
            DtoCommunication dtoCommunication = new DtoCommunication();
            BeanUtils.copyProperties(employee, dtoEmployee);
            Communication communication = employee.getCommunication();
            BeanUtils.copyProperties(communication, dtoCommunication);
            dtoEmployee.setDepartment(new DtoDepartment(employee.getDepartment().getId(), employee.getDepartment().getName()));
            dtoEmployee.setCommunication(dtoCommunication);
            dtoEmployeeList.add(dtoEmployee);
        }
        return dtoEmployeeList;
    }

    @Override
    public DtoEmployee getEmployeeById(long id) {
        Optional<Employee> optional = employeeRepository.findById(id);
        if (optional.isEmpty()) {
            return null;
        }
        Employee employee = optional.get();

        DtoEmployee dtoEmployee = new DtoEmployee();
        DtoCommunication dtoCommunication = new DtoCommunication();
        DtoDepartment dtoDepartment = new DtoDepartment();

        BeanUtils.copyProperties(employee, dtoEmployee);

        if (employee.getCommunication() != null) {
            BeanUtils.copyProperties(employee.getCommunication(), dtoCommunication);
            dtoEmployee.setCommunication(dtoCommunication);
        }

        if (employee.getDepartment() != null) {
            BeanUtils.copyProperties(employee.getDepartment(), dtoDepartment);
            dtoEmployee.setDepartment(dtoDepartment);
        }

        return dtoEmployee;
    }
}
