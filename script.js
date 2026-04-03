$(document).ready(function(){

$("#addCourse").click(function(){
var row = $(".course-row").first().clone();
row.find("input").val("");
$("#courses").append(row);
});

$("#gpaForm").submit(function(e){
e.preventDefault();

$.ajax({
url: "calculate.php",
type: "POST",
data: $(this).serialize(),
dataType: "json",

success: function(response){

if(response.success){

var color = "bg-info";
if(response.gpa >= 3.7) color = "bg-success";
else if(response.gpa < 2.0) color = "bg-danger";
else if(response.gpa < 3.0) color = "bg-warning";

$("#result").html(
<div class="alert alert-info">
<strong>${response.message}</strong>
</div>

<div class="progress mb-3">
<div class="progress-bar ${color}" role="progressbar"
style="width: ${(response.gpa/4)*100}%">
${response.gpa.toFixed(2)}
</div>
</div>

${response.table}
);
}

}

});

});

});
