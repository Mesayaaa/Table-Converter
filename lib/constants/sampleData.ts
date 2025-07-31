export const sampleData = {
  csv: `Name,Age,City,Salary
John Doe,28,New York,75000
Jane Smith,32,Los Angeles,82000
Mike Johnson,25,Chicago,68000
Sarah Wilson,29,Houston,71000
David Brown,35,Phoenix,79000`,

  tsv: `Name	Age	City	Salary
John Doe	28	New York	75000
Jane Smith	32	Los Angeles	82000
Mike Johnson	25	Chicago	68000
Sarah Wilson	29	Houston	71000
David Brown	35	Phoenix	79000`,

  json: `[
  {"Name": "John Doe", "Age": 28, "City": "New York", "Salary": 75000},
  {"Name": "Jane Smith", "Age": 32, "City": "Los Angeles", "Salary": 82000},
  {"Name": "Mike Johnson", "Age": 25, "City": "Chicago", "Salary": 68000},
  {"Name": "Sarah Wilson", "Age": 29, "City": "Houston", "Salary": 71000},
  {"Name": "David Brown", "Age": 35, "City": "Phoenix", "Salary": 79000}
]`,

  html: `<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>City</th>
      <th>Salary</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>28</td>
      <td>New York</td>
      <td>75000</td>
    </tr>
    <tr>
      <td>Jane Smith</td>
      <td>32</td>
      <td>Los Angeles</td>
      <td>82000</td>
    </tr>
    <tr>
      <td>Mike Johnson</td>
      <td>25</td>
      <td>Chicago</td>
      <td>68000</td>
    </tr>
  </tbody>
</table>`,

  markdown: `| Name | Age | City | Salary |
|------|-----|------|--------|
| John Doe | 28 | New York | 75000 |
| Jane Smith | 32 | Los Angeles | 82000 |
| Mike Johnson | 25 | Chicago | 68000 |
| Sarah Wilson | 29 | Houston | 71000 |
| David Brown | 35 | Phoenix | 79000 |`,

  xml: `<?xml version="1.0" encoding="UTF-8"?>
<table>
  <row>
    <Name>John Doe</Name>
    <Age>28</Age>
    <City>New York</City>
    <Salary>75000</Salary>
  </row>
  <row>
    <Name>Jane Smith</Name>
    <Age>32</Age>
    <City>Los Angeles</City>
    <Salary>82000</Salary>
  </row>
  <row>
    <Name>Mike Johnson</Name>
    <Age>25</Age>
    <City>Chicago</City>
    <Salary>68000</Salary>
  </row>
</table>`,

  yaml: `- Name: John Doe
  Age: 28
  City: New York
  Salary: 75000
- Name: Jane Smith
  Age: 32
  City: Los Angeles
  Salary: 82000
- Name: Mike Johnson
  Age: 25
  City: Chicago
  Salary: 68000`,

  sql: `INSERT INTO employees (Name, Age, City, Salary) VALUES
('John Doe', 28, 'New York', 75000),
('Jane Smith', 32, 'Los Angeles', 82000),
('Mike Johnson', 25, 'Chicago', 68000),
('Sarah Wilson', 29, 'Houston', 71000),
('David Brown', 35, 'Phoenix', 79000);`,

  latex: `\\begin{tabular}{|l|c|l|r|}
\\hline
Name & Age & City & Salary \\\\
\\hline
John Doe & 28 & New York & 75000 \\\\
Jane Smith & 32 & Los Angeles & 82000 \\\\
Mike Johnson & 25 & Chicago & 68000 \\\\
Sarah Wilson & 29 & Houston & 71000 \\\\
David Brown & 35 & Phoenix & 79000 \\\\
\\hline
\\end{tabular}`,

  ascii: `+-------------+-----+-------------+--------+
| Name        | Age | City        | Salary |
+-------------+-----+-------------+--------+
| John Doe    | 28  | New York    | 75000  |
| Jane Smith  | 32  | Los Angeles | 82000  |
| Mike Johnson| 25  | Chicago     | 68000  |
| Sarah Wilson| 29  | Houston     | 71000  |
| David Brown | 35  | Phoenix     | 79000  |
+-------------+-----+-------------+--------+`,

  excel: `=CONCATENATE("Name", CHAR(9), "Age", CHAR(9), "City", CHAR(9), "Salary")
=CONCATENATE("John Doe", CHAR(9), "28", CHAR(9), "New York", CHAR(9), "75000")
=CONCATENATE("Jane Smith", CHAR(9), "32", CHAR(9), "Los Angeles", CHAR(9), "82000")`,
}
