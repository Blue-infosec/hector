/**
 * Draw a Doughnut chart that shows the top data value in the center as a percent of the remaining data
 * 
 * @param canvasId the id of the canvas element used for the chart
 * @param dataId The id of the hidden div that contains the data element
 */
function drawDoughnutChart(canvasId,dataId){
	cId = "#" + canvasId;
	dId = "#" + dataId;
	font = "50px Helvetica Neue, Helvetica, Arial, sans-serif";
	fillStyle = 'black';
	textAlign = 'center';
	var percent = parseInt($(dId).text());
    var data = [
        {
          value: percent,
          color:"#05EDFF"
        },
        {
          value : 100-percent,
          color : "#fafafa"
        }
      ];
    
    
    var ctx = document.getElementById(canvasId).getContext("2d");
    ctx.canvas.width = 200;
	ctx.canvas.height = 200;
    var chart = new Chart(ctx).Doughnut(data,{
    	animationSteps:1,
    	percentageInnerCutout : 80,
    	showTooltips: false,
    	onAnimationComplete: function(){
    		ctx.font = font;
    		ctx.fillStyle = fillStyle;
    		ctx.textAlign = textAlign;
    		ctx.fillText(data[0].value + "%", ctx.canvas.width/2, ctx.canvas.width/2 + 15);
    	}
    });
    
}


$(function(){
	var raw = $('#login-attempts').text();
	var data = JSON.parse(raw);
	columns = [
	           {data: 'id'},
	           {data: 'ip_linked'},
	           {data: 'country_code'},
	           {data: 'time'},
	           {data: 'username'},
	           {data: 'password'},
	           ];
	$('#logins-table').DataTable({
		data:data,
		columns:columns,
		"sDom": '<"top"lf>rt<"bottom"ip>',
	})
	
	var commands = $.parseJSON($('#connections').text());
	commandsColumns = [
	                   {data: 'id',"visible":false},
	                   {data: 'time'},
	                   {data: 'ip_linked'},
	                   {data: 'session_id'},
	                   {data: 'command'},
	                   ];
	$('#commands-table').DataTable({
		data:commands,
		columns:commandsColumns,
		"sDom": '<"top"lf>rt<"bottom"ip>',
		
	})
	
	drawDoughnutChart("top-country","countrypercent");
	drawDoughnutChart("top-ip","ippercent");
	drawDoughnutChart("top-user","userpercent");
	drawDoughnutChart("top-pass","passpercent");
	drawDoughnutChart("sess-ip","sess-ippercent");
	drawDoughnutChart("sess-country","sess-cpercent");
})