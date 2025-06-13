// Mock student info
const student = {
  id: "2205157",
  name: "Abu Russel",
  levelTerms: ["Level 1 - Term I", "Level 1 - Term II"],
  grades: {
    "Level 1 - Term I": [
      { courseId: "CSE101", title: "Introduction to Computing", credit: 3.0, gpa: 3.75 },
      { courseId: "MAT101", title: "Calculus I", credit: 3.0, gpa: 3.5 },
      { courseId: "PHY101", title: "Physics I", credit: 3.0, gpa: 3.25 },
      { courseId: "CSE102", title: "Structured programming language sessional", credit: 3.0, gpa: 3.75 },
      { courseId: "CSE105", title: "Discrete Mathematcis", credit: 3.0, gpa: 3.5 },
      { courseId: "EEE101", title: "Introduction to EEE", credit: 3.0, gpa: 3.25 }
    ],
    "Level 1 - Term II": [
      { courseId: "CSE102", title: "Data Structures", credit: 3.0, gpa: 3.9 },
      { courseId: "MAT102", title: "Linear Algebra", credit: 3.0, gpa: 3.7 },
      { courseId: "ENG101", title: "English Language", credit: 2.0, gpa: 4.0 },
      { courseId: "CHEM113", title: "Inorganic chemistry", credit: 3.0, gpa: 3.75}
    ]
  }
};

const levelTermSelect = document.getElementById("levelTermSelect");
student.levelTerms.forEach(term => {
  const option = document.createElement("option");
  option.value = term;
  option.textContent = term;
  levelTermSelect.appendChild(option);
});

levelTermSelect.addEventListener("change", function () {
  const selectedTerm = this.value;
  const courses = student.grades[selectedTerm];

  document.getElementById("gradesheet").style.display = "block";

  document.getElementById("studentId").textContent = student.id;
  document.getElementById("studentName").textContent = student.name;
  document.getElementById("selectedLevelTerm").textContent = selectedTerm;

  const tbody = document.getElementById("gradesheetBody");
  tbody.innerHTML = "";

  let totalCredit = 0;
  let weightedGPA = 0;

  courses.forEach((course, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${course.courseId}</td>
      <td>${course.title}</td>
      <td>${course.credit}</td>
      <td>${course.gpa.toFixed(2)}</td>
    `;

    tbody.appendChild(row);

    totalCredit += course.credit;
    weightedGPA += course.credit * course.gpa;
  });

  const termGPA = weightedGPA / totalCredit;

  document.getElementById("termGPA").textContent = termGPA.toFixed(2);

  let totalCreditsTillNow = 0;
  let weightedSum = 0;

  for (const term of student.levelTerms) {
    const termCourses = student.grades[term];
    termCourses.forEach(c => {
      totalCreditsTillNow += c.credit;
      weightedSum += c.credit * c.gpa;
    });
  }

  const totalCGPA = weightedSum / totalCreditsTillNow;

  document.getElementById("totalCredits").textContent = totalCreditsTillNow.toFixed(1);
  document.getElementById("totalCGPA").textContent = totalCGPA.toFixed(2);
});
