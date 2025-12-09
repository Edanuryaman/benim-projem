package com.edanur.services.impl;

import com.edanur.dto.DtoCommunication;
import com.edanur.dto.DtoDepartment;
import com.edanur.dto.DtoEmployee;
import com.edanur.dto.DtoEmployeeIU;
import com.edanur.entity.Communication;
import com.edanur.entity.Department;
import com.edanur.entity.Employee;
import com.edanur.mapper.CommunicationMapper;
import com.edanur.mapper.DepartmentMapper;
import com.edanur.mapper.EmployeeMapper;
import com.edanur.repository.CommunicationRepository;
import com.edanur.repository.DepartmentRepository;
import com.edanur.repository.EmployeeRepository;
import com.edanur.services.IEmployeeService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.*;

@Service
public class EmployeeServiceImpl implements IEmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CommunicationRepository communicationRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private EmployeeMapper employeeMapper;

    @Autowired
    private DepartmentMapper departmentMapper;

    @Autowired
    private CommunicationMapper communicationMapper;

    @Override
    public List<DtoEmployee> getAllEmployees() {
        List<Employee> employeeList = employeeRepository.findAll();
        List<DtoEmployee> dtoEmployeeList = new ArrayList<>();
        if (employeeList.isEmpty()) {
            return null;
        }
        for (Employee employee : employeeList) {
            DtoEmployee dtoEmployee = employeeMapper.toDto(employee);
            DtoCommunication dtoCommunication = communicationMapper.toDto(employee.getCommunication());

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

        DtoEmployee dtoEmployee = employeeMapper.toDto(employee);

        if (employee.getCommunication() != null) {
            DtoCommunication dtoCommunication = communicationMapper.toDto(employee.getCommunication());
            dtoEmployee.setCommunication(dtoCommunication);
        }

        if (employee.getDepartment() != null) {
            DtoDepartment dtoDepartment = departmentMapper.toDto(employee.getDepartment());
            dtoEmployee.setDepartment(dtoDepartment);
        }
        return dtoEmployee;
    }

    @Override
    @Transactional
    public Boolean saveEmployee(DtoEmployeeIU dto) {

        Department department = departmentRepository
                .findById(dto.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found"));

        Communication communication = communicationRepository
                .findById(dto.getCommunicationId())
                .orElseThrow(() -> new RuntimeException("Communication not found"));

        String username = generateUsername(dto.getFirstName(), dto.getLastName(), dto.getDateOfBirth());

        Employee employee = employeeMapper.toEntity(dto);

        employee.setUsername(username);
        employee.setDepartment(department);
        employee.setCommunication(communication);

        employeeRepository.save(employee);

        return true;
    }


    public String generateUsername(String firstName, String lastName, Date dateOfBirth) {
        String normalizedFirst = Normalizer.normalize(firstName, Normalizer.Form.NFD)
                .replaceAll("[^\\p{ASCII}]", "")
                .toLowerCase()
                .replace(" ", "_"); // boşluk → _

        String normalizedLast = Normalizer.normalize(lastName, Normalizer.Form.NFD)
                .replaceAll("[^\\p{ASCII}]", "")
                .toLowerCase()
                .replace(" ", "_"); // soyadında da boşluk olabilir

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(dateOfBirth);

        int month = calendar.get(Calendar.MONTH) + 1;
        int year = calendar.get(Calendar.YEAR) % 100;

        String monthStr = String.format("%02d", month);
        String yearStr = String.format("%02d", year);

        // Format: firstname.lastnameMMYY
        return normalizedFirst + "." + normalizedLast + monthStr + yearStr;
    }

}
