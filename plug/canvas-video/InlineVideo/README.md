### UPDATE: I'm under water with work right now. Should be back to contributing to this repo in about 2 weeks. At that point, I'll post a development plan for this. Thanks for your patience! 

## Synopsis

InlineVideo.js is intended to allow users on an iphone to play videos inline in the safari browser, circumventing the default fullscreen behavior.

[DEMO](http://codepen.io/newshorts/pen/yNxNKR)
----

## Code Example

When you embed a video element in your page be sure to include the "playsinline" attribute. Then add a source attribute with an mp3 of the audio in your video.

InlineVideo.js will automatically detect video elements with this attribute and replace them with the InlineVideo.js player if your users are on an iPhone. COMING SOON: It will also play the audio track along with the video frames. To the user, the experience will be an inline video.

```html
<video width="320" height="176" controls poster="http://www.w3schools.com/images/w3html5.gif" playsinline webkit-playsinline>
    <source src="video/buck.mp4" type="video/mp4">
</video>
```

InlineVideo.js works by detecting videos that should play inline for users on an iPhone, then transforming the video elements into canvas elements. InlineVideo.js draws each frame of the video to this canvas element instead of playing the video, that way IOS never tries to go into "full screen native player mode."

## Motivation

I believe developers should have to freedom to choose if their videos are meant to play inline or not. I understand the reasoning behind Apple's choices for the iphone, but sometimes a design or interactive experience calls for an inline video and iPhone users shouldn't be left out. Also, with the introduction of IOS 8 and webGL enabled by default, you would think we'd be able to use video textures...

## Installation

Make sure you include jQuery, a request animationframe poly and the InlineVideo.js file in your scripts:

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="js/requestAnimationFrame.js"></script>
<script src="js/inline-video.js"></script>
```

## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.

## Tests

Describe and show how to run the tests with code examples.

## Contributors

Contributors are always welcome. This library is nowhere near finished, I'd love the help of the community to make this video player a reality.

There's some important conversation happening here: [Chromium developers forum](https://code.google.com/p/chromium/issues/detail?id=395206)

Also there are a couple of example uses of inline video being used in the wild for webgl textures (however, these sources are not using this library):

[KRPano Cloud Demo](http://krpano.com/krpanocloud/video/airpano/index.html)

[takeyourdose.com](http://www.takeyourdose.com/en)

If you'd like to get involved message me, submit a pull request or issue.

## TODO

There's still much work to be done:

* automatically detect and play audio along with the video
* give a 'production ready' style to the player interface
* refactoring and reducing dependecies on libraries like jquery and requestAnimationFrame

## License

The MIT License (MIT)

Copyright (c) 2015 Mike Newell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.