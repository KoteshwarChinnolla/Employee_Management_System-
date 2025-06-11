// package koti.ems.springPostgress.mapper;

// import koti.ems.springPostgress.dto.EmployeeDto;
// import koti.ems.springPostgress.dto.EmployeeDtoGen;
// import koti.ems.springPostgress.entity.Employee;

// public class EmployeeMapper {
//     public static EmployeeDto toEmployeeDto(Employee employee) {
//         return new EmployeeDto(
//             employee.getId(),
//             employee.getName(),
//             employee.getEmail(),
//             employee.getEmployeeTeam()
//         );
//     }

//     public static EmployeeDtoGen toEmployeeDtoGen(Employee employee) {
//         return new EmployeeDtoGen(
//             employee.getId(),
//             employee.getName(),
//             employee.getEmail(),
//             employee.getPosition(),
//             employee.getEmployeeTeam().getTeamName()
//         );
//     }
// }
