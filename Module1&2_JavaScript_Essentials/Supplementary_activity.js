let TeamDirectory = [
  { Name: "Leo Brooks", Role: "Designer", Skills: ["UI", "UX", "Figma"], Available: true },
  { Name: "Sasha Ivana", Role: "Developer", Skills: ["HTML", "CSS", "JS"], Available: false },
  { Name: "Jordan Lee", Role: "Manager", Skills: ["Planning", "Agile"], Available: true }
];

let NewDirectory = {
  Name: "Casey Moore",
  Role: "QA Engineer",
  Skills: ["Testing", "Debugging"],
  Available: true
};

TeamDirectory.push(NewDirectory);

TeamDirectory[1].Available = true;

console.log(TeamDirectory[0].Name, TeamDirectory[0].Skills[0]);
console.log(TeamDirectory[TeamDirectory.length - 1].Name, TeamDirectory[TeamDirectory.length - 1].Skills.length);
console.log(TeamDirectory.length);

