var validID = prompt("Enter Adminstration ID:");
var validKEY = prompt("Enter Administration KeyPhrase:");

if (valid = (validID == "ID-0905610" && validKEY == "SLITHER-TIDES-KIRBY-QUEEN")) {
 alert("Welcome, To The Administration Console!");
  var dir = "C:\\Users\\Public\\Documents\\";

var index = 0;

var files = dir.listFiles();

while (index < files.length) {
  var filename = files[index];
  document.write("<a href='" + filename + "'>" + filename + "</a><br>");
  index++;
}
}
else {
 alert("Error: Invalid ID or KeyPhrase.");
    var dir = "index.html";

var index = 0;

var files = dir.listFiles();

while (index < files.length) {
  var filename = files[index];
  document.write("<a href='" + filename + "'>" + filename + "</a><br>");
  index++;
}
}
