export const StartingTemplate = `
## Support HTML

\`\`\`html
<p class="fragment">Fade in</p>
<p class="fragment fade-out">Fade out</p>
<p class="fragment highlight-red">Highlight red</p>
<p class="fragment fade-in-then-out">Fade in, then out</p>
<p class="fragment fade-up">Slide up while fading in</p>
\`\`\`

***

### Solar System Exploration, 1950s – 1960s

* [ ] Mercury
* [x] Venus
* [x] Earth (Orbit/Moon)
* [x] Mars
* [ ] Jupiter
* [ ] Saturn
* [ ] Uranus
* [ ] Neptune
* [ ] Comet Haley

===

***

\`\`\`mermaid
sequenceDiagram
    participant Alice
    participant Bob 
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
\`\`\`

***

graph LR; A(AAAA)==> B(B node); B==> C(SEE SEE);
class A diag-a-styles;
class B diag-b-styles
class C diag-c-styles;

***

# vscode-reveal

Awesome VS code extension using The HTML Presentation Framework Revealjs

Created by [Vincent B.](https://www.evilznet.com) / [@Evilznet](https://twitter.com/Evilznet)

***

## Hello There

reveal.js enables you to create beautiful interactive slide decks using HTML. This presentation will show you examples of what it can do.

***

## Vertical Slides

Slides can be nested inside of each other.

Use the *Space* key to navigate through all slides.

--

## Basement Level 1

Nested slides are useful for adding additional detail underneath a high level horizontal slide.

--

## Basement Level 2

That's it, time to go back up.

***

## Point of View

Press **ESC** to enter the slide overview.

Hold down alt and click on any element to zoom in on it using [zoom.js](http://lab.hakim.se/zoom-js). Alt + click anywhere to zoom back out.

> Use ctrl + click in Linux

***

## Touch Optimized

Presentations look great on touch devices, like mobile phones and tablets. Simply swipe through your slides.

***

## Markdown support

\`\`\`
  ## Markdown support

  Write content using inline or external Markdown.
  Instructions and more info available in the 
  [readme](https://github.com/hakimel/reveal.js#markdown).
\`\`\`

***

## Fragments

Hit the next arrow...

... to step through ...
... a fragmented slide.

Note:
This slide has fragments which are also stepped through in the notes window.

--

## Fragment Styles

There's different types of fragments, like:

grow {.fragment .grow}

shrink {.fragment .shrink}

fade-out {.fragment .fade-out}

fade-right{.fragment .fade-right}

fade-up{.fragment .fade-up}

fade-down{.fragment .fade-down}

fade-left{.fragment .fade-left}

--

## Fragment Styles

fade-in-then-out{.fragment .fade-in-then-out}

fade-in-then-semi-out {.fragment .fade-in-then-semi-out"}

current-visible {.fragment .current-visible}

Highlight **red**{.fragment .highlight-red} **blue**{.fragment .highlight-blue} **green**{.fragment .highlight-green}

***

## Transition Styles

You can select from different transitions, like:
[None](?transition=none#/transitions) - [Fade](?transition=fade#/transitions) - [Slide](?transition=slide#/transitions) - [Convex](?transition=convex#/transitions) - [Concave](?transition=concave#/transitions) - [Zoom](?transition=zoom#/transitions)

***

## Themes

reveal.js comes with a few themes built in:
<a href="#">Black (default)</a> -
<a href="#">White</a> -
<a href="#">League</a> -
<a href="#">Sky</a> -
<a href="#">Beige</a> -
<a href="#">Simple</a>
<a href="#">Serif</a> -
<a href="#">Blood</a> -
<a href="#">Night</a> -
<a href="#">Moon</a> -
<a href="#">Solarized</a>

***

<!-- .slide: data-background="#dddddd" -->

## Slide Backgrounds

Set \`data-background="#dddddd"\` on a slide to change the background color. All CSS color formats are supported.

[![Down arrow](https://s3.amazonaws.com/hakim-static/reveal-js/arrow.png =178x238)](#){.navigate-down}

--

***

<!-- .slide: data-background="default-thumbnail.jpg" -->

## Image Backgrounds

\`\`\`markdown
<!-- .slide: data-background="default-thumbnail.jpg" -->
\`\`\`

***

<!-- .slide: data-background="default-thumbnail.jpg" data-background-repeat="repeat" data-background-size="100px" -->

## TILED BACKGROUNDS

\`\`\`markdown
<!-- .slide: data-background="default-thumbnail.jpg" data-background-repeat="repeat" data-background-size="100px" -->
\`\`\`

--

<!-- .slide: data-background-video="https://s3.amazonaws.com/static.slid.es/site/homepage/v1/homepage-video-editor.mp4,https://s3.amazonaws.com/static.slid.es/site/homepage/v1/homepage-video-editor.webm" data-background-color="#000000" -->

## Video Backgrounds

\`\`\`markdown
<!-- .slide: data-background-video="https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.480p.vp9.webm" data-background-color="#000000" -->
\`\`\`

--

<!-- .slide: data-background="http://i.giphy.com/90F8aUepslB84.gif" -->

## ... and GIFs!

\`\`\`markdown
<!-- .slide: data-background="http://i.giphy.com/90F8aUepslB84.gif" -->
\`\`\`

***

<!-- .slide: data-transition="slide" data-background="#4d7e65" data-background-transition="zoom" -->

## Background Transitions

Different background transitions are available via the backgroundTransition option. This one's called "zoom".

***

<!-- .slide: data-transition="slide" data-background="#b5533c" data-background-transition="zoom" -->

## Background Transitions

You can override background transitions per-slide.

***

## Pretty Code

\`\`\`js
function linkify( selector ) {
  if( supports3DTransforms ) {

    var nodes = document.querySelectorAll( selector );

    for( var i = 0, len = nodes.length; i &lt; len; i++ ) {
      var node = nodes[i];

      if( !node.className ) {
        node.className += ' roll';
      }
    }
  }
}
\`\`\`

Code syntax highlighting courtesy of [highlight.js](http://softwaremaniacs.org/soft/highlight/en/description/).

***

## Marvelous Lists

* No order here
* Or here
* Or here
* Or here

***

## Fantastic Ordered List

1. One is smaller than...
2. Two is smaller than...
3. Three!

***

## Tabular Tables

| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Row1Col1 | Row1Col2 | Row1Col3 |
| Row2Col1 | Row2Col2 | Row2Col3 |
| Row3Col1 | Row3Col2 | Row3Col3 |

***

{.slide id="ClevQuot"}

## Clever Quotes

These guys come in two forms, inline: "The nice thing about standards is that there are so many to choose from" and block:

> "For years there has been a theory that millions of monkeys typing at random on millions of typewriters would reproduce the entire works of Shakespeare. The Internet has proven this theory to be untrue."

***

## Intergalactic Interconnections

You can link between slides internally, [like this](#/2/3).

Link to slides by an ID, e.g., [Clever Quotes](#ClevQuot).However, you must have set the ID at the destination slide using:\`{.slide id="UniqueID"}\`

***

## Speaker View

There's a [speaker view](https://github.com/hakimel/reveal.js#speaker-notes). It includes a timer, preview of the upcoming slide as well as your speaker notes.

Press the *S* key to try it out.
Oh hey, these are some notes. They'll be hidden in your presentation, but you can see them if you open the speaker notes window (hit 's' on your keyboard).

***

## Export to PDF

Presentations can be [exported to PDF](https://github.com/hakimel/reveal.js#pdf-export), here's an example:

***

## Global State

Set \`data-state="something"\` on a slide and \`"something"\` will be added as a class to the document element when the slide is open. This lets you apply broader style changes, like switching the page background.

***

<!-- .slide: data-state="customevent" -->

## State Events

Additionally custom events can be triggered on a per slide basis by binding to the \`data-state\` name.

\`\`\`js
Reveal.addEventListener( 'customevent', function() {
	console.log( '"customevent" has fired' );
} );
\`\`\`

***

## Take a Moment

Press B or . on your keyboard to pause the presentation. This is helpful when you're on stage and want to take distracting slides off the screen.

***

## Much more

* Right-to-left support
* [Extensive JavaScript API](https://github.com/hakimel/reveal.js#api)
* [Auto-progression](https://github.com/hakimel/reveal.js#auto-sliding)
* [Parallax backgrounds](https://github.com/hakimel/reveal.js#parallax-background)
* [Custom keyboard bindings](https://github.com/hakimel/reveal.js#keyboard-bindings)

***

## Plugins

--

## search

Handles finding a text string anywhere in the slides and showing the next occurrence to the user by navigatating to that slide and highlighting it.

**Shortcut : \`CTRL + SHIFT + F\`**

--

## Zoom

Zoom anywhere on your presentation

**Shortcut : \`alt + click\`: Zoom in. Repeat to zoom back out.**

--

## Notes

Add note to speaker view.

Default markdown syntaxe is

\`\`\`text
note: a custom note here
\`\`\`

--

## Chalkboard

Have you ever missed the traditional classroom experience where you can quickly sketch something on a chalkboard?

Just press 'b' or click on the pencil button to open and close your chalkboard.

--

## Chalkboard

* Click the \`left mouse button\` to write on the chalkboard
* Click the \`right mouse button\` to wipe the chalkboard
* Click the \`DEL\` key to clear the chalkboard

--

## MAKE NOTES ON SLIDES

Did you notice the button?

By pressing 'c' or clicking the button you can start and stop the notes taking mode allowing you to write comments and notes directly on the slide.

--

## Chart

Add chart from simple string

--

### Line chart from JSON string

<canvas class="stretch" data-chart="line">
<!--
{
 "data": {
  "labels": ["January"," February"," March"," April"," May"," June"," July"],
  "datasets":[
   {
    "data":[65,59,80,81,56,55,40],
    "label":"My first dataset","backgroundColor":"rgba(120,120,255,.8)"
   },
   {
    "data":[28,48,40,19,86,27,90],
    "label":"My second dataset","backgroundColor":"rgba(255,120,120,.8)"
   }
  ]
 }, 
 "options": { "responsive": true }
}
-->
</canvas>

--

### Line chart with CSV data and JSON configuration

<canvas class="stretch" data-chart="line">
My first dataset,  65, 59, 80, 81, 56, 55, 40
<!-- This is a comment -->
My second dataset, 28, 48, 40, 19, 86, 27, 90
<!-- 
{ 
"data" : {
	"labels" : ["Enero", "Febrero", "Marzo", "Avril", "Mayo", "Junio", "Julio"],
	"datasets" : [{ "borderColor": "#0f0", "borderDash": ["5","10"] }, { "borderColor": "#0ff" } ]
	}
}
-->
</canvas>

--

### Bar chart with CSV data

,January, February, March, April, May, June, July My first dataset, 65, 59, 80, 81, 56, 55, 40 My second dataset, 28, 48, 40, 19, 86, 27, 90
---

<!-- .slide: data-background="#aaaaaa" -->

### Stacked bar chart from CSV file with JSON configuration

<!-- By default, chart axes don't "beginAtZero", so set it to true below -->

<!-- Hover events are broken inside reveal https://github.com/chartjs/Chart.js/issues/7178 so "events" : [""] turns it off-->

<canvas class="stretch" data-chart="bar" data-chart-src="https://rajgoel.github.io/reveal.js-demos/chart/data.csv">
<!-- 
{
  "data" : {
    "datasets" : [
      {"backgroundColor": "#0f0"}, 
      {"backgroundColor": "#0ff" }
    ]
  },
  "options": {
    "events": [""],
    "animation": {"easing": "easeOutElastic"},
    "legend": {
      "display": true,
      "labels": {
        "fontColor": "rgb(200, 0, 0)"
      }
    },
    "responsive": true, 
    "scales": { 
      "xAxes": [{
        "ticks": {
          "fontColor" : "rgba(100,100,255,.8)"
        },
        "gridLines" : {
          "color" : "rgba(100,100,255,.8)",
          "zeroLineColor": "transparent"
        },
        "stacked": true
        }],
      "yAxes": [{
        "ticks": {
          "beginAtZero": true,
          "fontColor" : "rgba(100,100,255,.8)"
        },
        "stacked": true,
        "gridLines" : {
          "color" : "rgba(100,100,255,.8)",
          "zeroLineColor": "transparent"
        }
      }] 
    }
  }
}
-->
</canvas>

--

### Pie chart

,Black, Red, Green, Yellow My first dataset, 40, 40, 20, 6 My second dataset, 45, 40, 25, 4
---

## EMBEDDING A TWEET

To embed a tweet, simply determine its URL and include the following code in your slides:

\`\`\`html
<div class="tweet" data-src="TWEET_URL"></div>
\`\`\`

--

--

## menu

A SLIDEOUT MENU FOR NAVIGATING REVEAL.JS PRESENTATIONS

--

See the in the corner?

Click it and the menu will open from the side.

Click anywhere on the slide to return to the presentation,
or use the close button in the menu.

--

If you don't like the menu button,
you can use the slide number instead.

Go on, give it a go.

The menu button can be hidden using the options,
but you need to enable the slide number link.

--

Or you can open the menu by pressing the m key.

You can navigate the menu with the keyboard as well.
Just use the arrow keys and or to change slides.

You can disable the keyboard for the
menu in the options if you wish.

--

## LEFT OR RIGHT

You can configure the menu to slide in from the left or right

--

### MARKERS

The slide markers in the menu can be useful to show
you the progress through the presentation.

You can hide them if you want.

You can also show/hide slide numbers.

--

### SLIDE TITLES

The menu uses the first heading to label each slide
but you can specify another label if you want.

Use a data-menu-title attribute in the section element to give the slide a custom label, or add a menu-title class to any element in the slide you wish.

You can change the titleSelector option and use
any elements you like as the default for labelling each slide.

--

## MathSVG

An extension of the math.js plugin allowing to render LaTeX in SVG.

--

### The Lorenz Equations

\\[\\begin{aligned} \\dot{x} & = \\sigma(y-x) \\\ \\dot{y} & = \\rho x - y - xz \\\ \\dot{z} & = -\\beta z + xy \\end{aligned} \\]
---

### The Cauchy-Schwarz Inequality

--

### Custom footer

Includes a footer in all the slides of a Reveal.js presentation (with optional exclusion of some slides) that will show the title of the presentation.

--

## code-focus

A plugin that allows focusing on specific lines of code blocks.

--

### Code Focus Demo

\`\`\`html
<section>
  <pre><code>
  // Useless comment.
  alert('hi');
  </pre></code>
  <p class="fragment" data-code-focus="1">
    This focuses on the comment.
  </p>
  <p class="fragment" data-code-focus="1-2">
    Another fragment.
  </p>
</section>
\`\`\`

This section is a slide. {.fragment .current-only data-code-focus=1-12}

This will be highlighted by \`highlight.js\`. {.fragment .current-only data-code-focus=2-5}

This fragment focuses on the first line. {.fragment .current-only data-code-focus=6-8}

This fragment focuses on lines 1 and 2. {.fragment .current-only data-code-focus=9-11}

See the next slide for a demo with the contents of this code block. {.fragment .current-only data-code-focus=1-12}

***

<!-- .slide: style="text-align: left;" -->

# THE END

* [Try the online editor](http://slides.com)
* [Source code & documentation](https://github.com/hakimel/reveal.js)
`;
