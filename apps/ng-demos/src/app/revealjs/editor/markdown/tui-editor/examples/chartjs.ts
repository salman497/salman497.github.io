export const chartJs = { 
    barChart: {
        html: `<p>Bar Chart</p><div data-language="chartjs" class="toastui-editor-ww-code-block"><pre><code data-language="chartjs">{
    "type": "bar",
    "data": {
        "labels": ["Features", "Flexibility", "Design", "AI Integration"],
        "datasets": [{
        "label": "User Satisfaction %",
        "data": [75, 85, 90, 92],
        "backgroundColor": ["#FF6F61", "#6BFED5", "#6B8EFE", "#FFD06B"]
        }]}
}</code></pre></div>`,
        markdown: ``
    },
    lineChart: {
        html: `<p>Line Chart</p>
        <div data-language="chartjs" class="toastui-editor-ww-code-block">
        <pre><code data-language="chartjs">{
            "type": "line",
            "data": {
                "labels": ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"],
                "datasets": [{
                    "label": "Dataset",
                    "data": [10, -20, 50, -40, 60, 30],
                    "borderColor": "#FF0000",
                    "backgroundColor": "rgba(255, 0, 0, 0.5)",
                    "pointStyle": "circle",
                    "pointRadius": 10,
                    "pointHoverRadius": 15
                }]
            }
        }</code></pre></div>`,
                markdown: ``
    },
    bubbleChart: {
        html: `<p>Bubble Chart</p>
        <div data-language="chartjs" class="toastui-editor-ww-code-block">
        <pre><code data-language="chartjs">{
            "type": "bubble",
            "data": {
                "datasets": [{
                    "label": "Sample Dataset",
                    "data": [
                        {"x": 10, "y": 20, "r": 15},
                        {"x": 15, "y": 25, "r": 10},
                        {"x": 20, "y": 10, "r": 8},
                        {"x": 5,  "y": 15, "r": 12}
                    ],
                    "backgroundColor": [
                        "rgba(255, 99, 132, 0.6)",
                        "rgba(75, 192, 192, 0.6)",
                        "rgba(153, 102, 255, 0.6)",
                        "rgba(255, 159, 64, 0.6)"
                    ]
                }]
            }
        }</code></pre></div>`,
                markdown: ``
    },
    pieChart: {
        html: `<p>Pie Chart</p>
        <div data-language="chartjs" class="toastui-editor-ww-code-block">
        <pre><code data-language="chartjs">{
            "type": "pie",
            "data": {
                "labels": ["Red", "Blue", "Yellow", "Green"],
                "datasets": [{
                    "label": "Sample Dataset",
                    "data": [45, 25, 20, 10],
                    "backgroundColor": [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)"
                    ],
                    "borderColor": [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)"
                    ],
                    "borderWidth": 1
                }]
            }
        }
        </code></pre></div>`,
                markdown: ``
    },
    stackedBarChart: {
        html: `<p>Stacked Bar Chart</p>
        <div data-language="chartjs" class="toastui-editor-ww-code-block">
        <pre><code data-language="chartjs">{
            "type": "bar",
            "data": {
                "labels": ["January", "February", "March", "April", "May"],
                "datasets": [
                    {
                        "type": "bar",
                        "label": "Dataset 1 (Bar)",
                        "data": [50, 60, 70, 80, 90],
                        "backgroundColor": "rgba(255, 99, 132, 0.5)",
                        "borderColor": "rgba(255, 99, 132, 1)",
                        "borderWidth": 1,
                        "stack": "Stack 0"
                    },
                    {
                        "type": "bar",
                        "label": "Dataset 2 (Bar)",
                        "data": [30, 40, 50, 60, 70],
                        "backgroundColor": "rgba(54, 162, 235, 0.5)",
                        "borderColor": "rgba(54, 162, 235, 1)",
                        "borderWidth": 1,
                        "stack": "Stack 0"
                    },
                    {
                        "type": "line",
                        "label": "Dataset 3 (Line)",
                        "data": [50, 75, 55, 85, 95],
                        "fill": false,
                        "borderColor": "rgba(153, 102, 255, 1)",
                        "lineTension": 0.1
                    }
                ]
            },
            "options": {
                "scales": {
                    "y": {
                        "stacked": true
                    }
                }
            }
        }</code></pre></div>`,
                markdown: ``
    }
}