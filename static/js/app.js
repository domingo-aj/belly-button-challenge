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

  let barData = [{
    x: filteredValues,
    y: yValues,
    text: filteredLabels,
    type: 'bar',
    orientation: 'h'
  }];

  Plotly.newPlot("bar", barData);

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
      orientation: 'h'
    }];
   
    Plotly.newPlot("bar", barData);

    let bubbleData = [{
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values,
      },
      text: otu_labels
    }];

    Plotly.newPlot('bubble', bubbleData)
  };  
  d3.selectAll("#selDataset").on("change", optionChanged);

})
