function createEmployeeRecord(values) {
  const record = {
    firstName: values[0],
    familyName: values[1],
    title: values[2],
    payPerHour: values[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return record;
}

function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, event) {
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    date: event.slice(0, 10),
    hour: parseInt(event.slice(-4)),
  });
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, event) {
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    date: event.slice(0, 10),
    hour: parseInt(event.slice(-4)),
  });
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeIn = employeeRecord.timeInEvents.find((event) => event.date === date, ).hour;
  const timeOut = employeeRecord.timeOutEvents.find((event) => event.date === date, ).hour;
  return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
  return employeeRecord.timeInEvents.reduce((allWages, timeInEvents) => {
    return allWages + wagesEarnedOnDate(employeeRecord, timeInEvents.date);
  }, 0);
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((grandTotal, employee) => {
    return grandTotal + allWagesFor(employee);
  }, 0);
}
