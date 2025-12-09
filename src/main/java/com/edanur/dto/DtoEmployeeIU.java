package com.edanur.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class DtoEmployeeIU {
    private String firstName;

    private String lastName;

    private String profilePhoto;

    private String cv_resume;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date dateOfBirth;

    private Long departmentId;

    private DtoCommunicationIU communication;
}
