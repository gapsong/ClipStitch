> **Note**  
> This project uses the Twitch API, which is now deprecated. Some features may not work as expected and ongoing maintenance is limited.

# Twitchclips

This repo is able to crawl the whole Twitch chat of a streamer and shows you the activity of the chat.
You can filter via keywords and check the activity of the chat during a specific time period.

Based on some metrics of the Twitch chat, the timestamps of the
video clip get marked. Afterwards, you can download this clip.

**Metrics that are used:**
- Engagement of the chat using the sliding window method
- Specific keywords

If you want to know more about this project, feel free to contact me.
I will explain everything to you.

This project should create "Best of" videos and upload them to YouTube.

## Getting Started

```shell
$ npm install
```

Update the `twitchNames.json` with all the streamers you want to crawl.

To start the crawler, run:
```shell
$ npm run start
```

You can show the activity bar charts via:
```shell
$ npm run rs
```

at localhost:3000

At the moment, you have to rename the imported JSON in `src/App.js`:

```
import modified from './chatCollection/modified/750845070.json'
import final from './chatCollection/modified/750845070.json'
```

to the filename that you want to use. The filenames have the same ID as the Twitch video itself.

<img src="docs/clipstitch.png" width="800">

Every bar represents 10 seconds of the Twitch chat.
The red line defines the average activity of the Twitch chat.
The green line defines all the found keywords during the 10 seconds.

You can click on any bar and will get redirected to the clip on twitch.tv.

This UI was only for the analysis of the Twitch data.

# Why did I stop?

I have heard that you need the permission of the streamer to put them into your video. Getting the best of video was not 
the challenge.
Generating the thumbnails automatically is.

# Sidenote

Everyone. Especially recruiters: I even wrote tests for a hobby project. Tried out some Test-Driven Development and it worked out pretty well. Check out my pipeline. Even tried them out. Works well.
