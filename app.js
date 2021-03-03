const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
	const xValue = d => d.horsepower;
	const yValue = d => d.weight;
	const margin = {top: 50, right: 40, bottom: 80, left: 180};
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;
	
	const xScale = d3.scaleLinear()
		.domain(d3.extent(data, xValue))
		.range([0, innerWidth])
		.nice();
				
	const yScale = d3.scaleLinear()
		.domain(d3.extent(data, yValue))
		.range([0, innerHeight])
		.nice();
	
	const g = svg.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`);
			
	const xAxis = d3.axisBottom(xScale)
		.tickSize(-innerHeight)
		.tickPadding(15);
	
	const yAxis = d3.axisLeft(yScale)
		.tickSize(-innerWidth)
		.tickPadding(15);
		
	const yAxisG = g.append('g')
		.call(yAxis);
	
	yAxisG	
		.selectAll('.domain')
			.remove();
	
	yAxisG.append('text')
			.attr('class', 'axis-label')
			.attr('y', -75)
			.attr('x', -innerHeight/2)
			.attr('fill', 'black')
			.attr('transform', `rotate(-90)`)
			.attr('text-anchor', 'middle')
			.text('Weight');
			
	const xAxisG = g.append('g').call(xAxis)
		.attr('transform', `translate(0, ${innerHeight})`);
		
		xAxisG.select('.domain').remove();
		xAxisG.append('text')
			.attr('class', 'axis-label')
			.attr('y', 60)
			.attr('x', innerWidth/2)
			.attr('fill', 'black')
			.text('Horsepower');
			
	g.selectAll('circle').data(data)
		.enter().append('circle')
			.attr('cy', d => yScale(yValue(d)))
			.attr('cx', d => xScale(xValue(d)))
			.attr('r', 5);
			
	g.append('text')
		.attr('class', 'title')
		.attr('y', -10)
		.text('Cars Horsepower Vs. Weight');
};

render(data);