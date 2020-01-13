import * as d3 from 'd3';
import React, { Component } from 'react';

const barContext = React.createContext('barChart');

class LastTenRuns extends Component {   
    constructor(props){
        super(props);
        this.state = {
            margin: {top: 30, right: 30, bottom: 70, left: 60},
            width: 800,
            height: 600,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.stats.length === 0 && this.props.stats.length !== 0) {
            this.drawChart();
        } else if (this.props.stats.length !== 0 && prevProps.stats !== this.props.stats) {
            this.removeElement(prevProps.stats);
        }
    }
        
    drawChart() {
        barContext.drawn = true;

        let data = [];
        let count = 1;
        for (const key in this.props.stats) {
            data.push({key: count, value: this.props.stats[key].wpm});
            count += 1;
        }

        const margin = this.state.margin;
        const height = this.state.height - margin.top - margin.bottom; 
        const width = this.state.width - margin.left - margin.right;
        const svg = d3.select(this.refs.svg)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

        // Initialize the X axis
        var x = d3.scaleBand()
        .range([ 0, width ])
        .padding(0.2);
        var xAxis = svg.append("g")
        .attr("class", "xAaxis")
        .attr("ref", "xAaxis")
        .attr("transform", "translate(0," + height + ")")

        // Initialize the Y axis
        var y = d3.scaleLinear()
        .range([ height, 0]);
        var yAxis = svg.append("g")
        .attr("class", "yAxis")
        .attr("ref", "yAxis")
        
        // Update the X axis
        x.domain(data.map(function(d) { return d.key; }))
        xAxis.call(d3.axisBottom(x))

        // Update the Y axis
        y.domain([0, d3.max(data, function(d) { return d.value }) ]);
        yAxis.transition().duration(1000).call(d3.axisLeft(y));

        // Create the u variable
        var rect = svg.selectAll("rect")
        .data(data)

        rect
        .enter()
        .append("rect") // Add a new rect for each new elements
        .merge(rect) // get the already existing elements as well
        .transition() // and apply changes to all of them
        .duration(1000)
        .attr("x", function(d) { return x(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("y",  d => { return height; })
        .attr("height", 0)
            .transition()
            .duration(750)
            .delay(function (d, i) {
                return i * 100;
            })
        .attr("y",  d => { return y(d.value); })
        .attr("height",  d => { return height - y(d.value); })
        .attr("fill", "#69b3a2")        

        barContext.svg = svg;
        barContext.xAxis = xAxis;
        barContext.yAxis = yAxis;
        barContext.data = data;

    }

    udpateChart() {
        //just reference the stuff from html with d3.select and re estabilish variables that way. should be fine?? i hope
        let data = [];
        for (const key in this.props.stats) {
            data.push({key: this.props.stats[key].wpm, value: this.props.stats[key].wpm});
        }

        const margin = this.state.margin;
        const height = this.state.height - margin.top - margin.bottom; 
        const width = this.state.width - margin.left - margin.right;
        const svg = barContext.svg;

        // Initialize the X axis
        var x = d3.scaleBand()
        .range([ 0, width ])
        .padding(0.2);
        var xAxis = barContext.xAxis;

        // Initialize the Y axis
        var y = d3.scaleLinear()
        .range([ height, 0]);
        var yAxis = barContext.yAxis;
        // Update the X axis
        x.domain(data.map(function(d) { return d.key; }))
        xAxis.call(d3.axisBottom(x))

        // Update the Y axis
        y.domain([0, d3.max(data, function(d) { return d.value }) ]);
        yAxis.transition().duration(1000).call(d3.axisLeft(y));

        // Create the u variable
        var rect = svg.selectAll("rect")
            .data(data)

        rect
        .enter()
        .append("rect") // Add a new rect for each new elements
        .merge(rect) // get the already existing elements as well
        .transition() // and apply changes to all of them
        .duration(1000)
        .attr("x", function(d) { return x(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", "#69b3a2")

        barContext.svg = svg;
        barContext.xAxis = xAxis;
        barContext.yAxis = yAxis;
        barContext.data = data;
    }

    removeElement(stats) {
        // ---- remove the first element of array  
        let data = [];
        let count = 1;
        for (const key in stats) {
            data.push({key: count, value: this.props.stats[key].wpm});
            count += 1;
        }

        data.shift();
        count += 1;
        
        data.push({key: count, value: this.props.stats[this.props.stats.length - 1].wpm});
        
        let svg = barContext.svg;
        const margin = this.state.margin;
        const height = this.state.height - margin.top - margin.bottom; 
        const width = this.state.width - margin.left - margin.right;

        var key = function(d) {
            return d.key;
        };

        // Initialize the X axis
        var x = d3.scaleBand()
        .range([ 0, width ])
        .padding(0.2);
        var y = d3.scaleLinear()
        .range([ height, 0]);
        var xAxis = barContext.xAxis;

        // Initialize the Y axis
        
        var yAxis = barContext.yAxis;
        // Update the X axis

        // Update the Y axis
        x.domain(d3.range(data.length));
        y.domain([0, d3.max(data, function(d) { return d.value; })]);

        var bars = svg.selectAll("rect")
            .data(data, key);	
            
        
        // ---- select exiting elements
        bars.exit()
            .transition()
            .duration(500)
        //      move left a bandwidth to hide
        .attr("width", 0) 
        .remove();

        bars
        .enter()
        .append('rect')
        .attr("x", width)
        .attr("y", function(d) {
            return y(d.value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function(d) {
            return height - y(d.value);
        })
        .attr("fill", "#69b3a2")
        .merge(bars)
        .transition()
        .duration(500)
        .attr("x", function(d, i) {
            return x(i);
        })

        console.log(x.bandwidth())

    }
        
    render(){
        return (
        <div ref='wpmBars'>
            <svg ref='svg'></svg>
        </div>
        )
    }
}

export default LastTenRuns;