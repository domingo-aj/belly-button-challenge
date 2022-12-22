const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);

let dropdownMenu = d3.select("#selDataset")
d3.json(url).then(function (data) {
  // console.log(data);
  let samples = {};
  let metadata = {};
  let names = data['names'];

  names.forEach(id => {
    dropdownMenu.append("option").text(id).attr("value", id)
  });

  data['samples'].forEach((sample) => {
    samples[sample.id] = sample;
  });

  // console.log(samples)

  data['metadata'].forEach((m) => {
    metadata[String(m.id)] = m;
  });
  // console.log(metadata)

  let initData = samples['940']
  // console.log(initData);

  let filteredIDs = initData.otu_ids.slice(0, 10).reverse()
  let filteredLabels = initData.otu_labels.slice(0, 10).reverse()
  let filteredValues = initData.sample_values.slice(0, 10).reverse()

  let yValues = [];
  filteredIDs.map(value => {
    yValues.push(`OTU ${value}`)
  });

  //console.log(yValues);
  // set display data (bar, bubble, demgraphics for 940)
  let initBar = [{
    x: filteredValues,
    y: yValues,
    text: filteredLabels,
    type: 'bar',
    orientation: 'h',
    marker: {
      color: 'rgba(255,153,51,0.6)'
    }
  }];

  let barOne = {
    title: `<b>Top 10 OTUs for ID: 940</b>`
  };

  Plotly.newPlot("bar", initBar, barOne);

  let bubbIds = initData.otu_ids
  let bubbValues = initData.sample_values
  let bubbLabels = initData.otu_labels

  let initBubble = [{
    x: bubbIds,
    y: bubbValues,
    mode: 'markers',
    marker: {
      color: bubbIds,
      size: bubbValues,
      colorscale: 'Picnic'
    },
    text: bubbLabels
  }];

  let bubbLayout = {
    title: `<b> Summary of All OTUs for ID: 940</b>`
  };

  Plotly.newPlot('bubble', initBubble, bubbLayout);
  
  let dem940 = metadata['940'];
  console.log(dem940)

  // let dem_info = d3.select(".panel-body").append("ul");

  // dem_info.text(${dem940});
  

  //when a new id is selected, run function
  function optionChanged() {
    let selectedValue = this.value;
    let sample = samples[selectedValue];

    let otu_ids = sample.otu_ids
    let sample_values = sample.sample_values
    let otu_labels = sample.otu_labels

    let bar_ids = otu_ids.slice(0, 10).reverse();
    let bar_values = sample_values.slice(0, 10).reverse();
    let bar_labels = otu_labels.slice(0, 10).reverse();

    let new_otu = [];
    bar_ids.map(value => {
      new_otu.push(`OTU ${value}`)
    });

    //console.log(new_otu);
    let barData = [{
      x: bar_values,
      y: new_otu,
      text: bar_labels,
      type: 'bar',
      orientation: 'h',
      marker: {
        color: 'rgba(255,153,51,0.6)'
      }
    }];

    let barLayout = {
      title: `<b>Top 10 OTUs for ID: ${selectedValue}</b>`
    };

    Plotly.newPlot("bar", barData, barLayout);

    let bubbleData = [{
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values,
        colorscale: 'Picnic'
      },
      text: otu_labels
    }];

    let bubbleLayout = {
      title: `<b> Summary of All OTUs for ID: ${selectedValue}</b>`
    };

    Plotly.newPlot('bubble', bubbleData, bubbleLayout)
  };
  d3.selectAll("#selDataset").on("change", optionChanged);

});
