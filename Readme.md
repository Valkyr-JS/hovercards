|                       |                 |                                                                                                                                     |
| --------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| :placard:             | **Summary**     | Allows setting an alternative image or video when hovering over performer cards in Stash.                                           |
| :link:                | **Repository**  | https://github.com/Valkyr-JS/hovercards                                                                                             |
| :information_source:  | **Source URL**  | https://valkyr-js.github.io/stash-plugins/index.yml                                                                                 |
| :open_book:           | **Install**     | [How to install plugins via package manager](https://docs.stashapp.cc/plugins/#adding-sources)                                      |

## Features

- Set an image to be displayed when hovering over performer cards. Images can be images in your Stash collection, or external URLs.
- Set a video to play when hovering over performer cards. Videos can be scene previews/full scenes in your Stash collection, or local video files that aren't in Stash.

## Requirements

To use this plugin you must be running Stash version 0.28.0 or higher. All images and videos are set by adding custom properties to each performer, which were added in this update.

No other dependencies are required.

## Installation

1. In Stash go to Settings > Plugins.
2. Under _Available Plugins_ click the Add Source button.
3. Fill out the fields in the popup form. The Name and Local Path fields can be whatever you like, but the Source URL needs to match the URL below. I recommend the following;
      - Name: Valkyr-JS
      - Source URL: https://valkyr-js.github.io/stash-plugins/index.yml
      - Local Path: Valkyr-JS
4. Click confirm and you should see a new line under _Available Plugins_ called "Valkyr-JS" (or whatever you entered for Name in the popup). Click this and you'll see my available plugins.
5. Check the _Hover Cards_ checkbox and click Install in the top right of _Avaialable Plugins_.
6. (Optional) Configure the plugin via the _Plugins_ panel below _Available Plugins_. For example, to enable full scene streams instead of scene previews, under _Hover Cards_ enable _Prefer full videos_.
7. Go to the performers pageand you should see the cards styled differently. You may need to refresh the page to see the changes.

## Hover images

To add a hover image to a performer, navigate to the performer's page and click "Edit". Scroll down to "Custom Fields" near the bottom of the page and click it to start adding fields.

Add a field with the name `hovercard_image`. The contents of the value field depend on whether you want to add an image from your Stash library, or an image hosted externally.

### Stash images

To add an image that is in your Stash library, add a comma-separated list of Stash IDs of the images you want to use in the `hovercard_image` value field. The image ID can be found by navigating to the image in Stash and taking the number after `images/`; for example, for an image at http://localhost:9999/images/3 the Stash ID would be 3.

![image](https://github.com/user-attachments/assets/dae448f9-206d-450b-ad3d-35a71712228b)

Save your changes at the bottom of the page (you may need to click out of the input field first). Your performer should now display a random one of the chosen images when you hover over it. Images change on page refresh, not on each hover.

The Stash ID of the image will always be a number. Any value that is not a number is treated as an external image.

### External images

To add an image from outside of your library, such as from a different website, add the URL of the image you want to use in the `hovercard_image` value field.

![image](https://github.com/user-attachments/assets/ed69a754-0024-4806-91ed-c20c0406bfef)

Save your changes at the bottom of the page (you may need to click out of the input field first). Your performer should now display your chosen image when you hover over it.

As with using Stash images, you can set a comma-separated list of URLs here and one will be chosen at random to be displayed on hover. However, any URL that has a comma in it will break.

## Hover videos

To add a hover video to a performer, navigate to the performer's page and click "Edit". Scroll down to "Custom Fields" near the bottom of the page and click it to start adding fields.

Add a field with the name `hovercard_video`. The contents of the value field depend on whether you want to add a video from your Stash library, or a local video file.

### Stash scene previews

To add the preview video of a scene that is in your Stash library, add a comma-separated list of Stash IDs of the scenes you want to use in the `hovercard_video` value field. The scene ID can be found by navigating to the scene in Stash and taking the number after `scenes/`; for example, for a scene at http://localhost:9999/scenes/5 the Stash ID would be 5.

![image](https://github.com/user-attachments/assets/e1c65ae6-751e-4a9f-b953-e3ba8c6cb3a1)

Save your changes at the bottom of the page (you may need to click out of the input field first). Your performer should now display a random one of the chosen scene previews when you hover over it.

The Stash ID of the scene will always be a number. Any value that is not a number is treated as a local file path.

### Stash scene streams

If you want to play a whole scene on hover, follow the instructions above for "Stash scene previews". Then go to the plugin settings page and enable the "Prefer full videos" setting.

![image](https://github.com/user-attachments/assets/4711cf85-d9b9-4cd0-bb8f-43481f7bfcb7)

This is a global setting, so all performers would use the scene stream instead of the preview. If you only want to change this for specific performers, leave the "Prefer full videos" setting disabled and enter `/scene/X/stream` in the value field instead, where `X` is the scene ID.

![image](https://github.com/user-attachments/assets/ab357e2f-5586-4999-882f-eb4c8b4a02a8)

### Stash scene markers

To show a Stash scene marker preview on hover, you need its URL. This may require a little digging, but only a little. Find the marker you want to use (make sure it's been generated first) and locate the URL either via developer tools, right-clicking on the video and selecting "Copy video address", or whatever way you prefer. The URL should look something like `http://localhost:9999/scene/X/scene_marker/Y/stream`, where `X` is the scene ID and `Y` is the marker ID.

Once you have the URL, remove the domain name to get the absolute path. This can then be used as the field value.

![image](https://github.com/user-attachments/assets/12acdb84-456f-49e3-9495-a8afdb0c7a7a)

As with using Stash scenes, you can set a comma-separated list of URLs here and one will be chosen at random to be displayed on hover.

### Local video files - bare metal install (untested)

To add a local video file, simply add the full path of the video file as the field value.

![image](https://github.com/user-attachments/assets/aae32f03-4393-4195-9a5e-6e4fdb6836fe)

This method is currently untested - [please raise an issue on GitHub if it doesn't work](https://github.com/Valkyr-JS/hovercards/issues).

As with using Stash scenes, you can set a comma-separated list of paths here and one will be chosen at random to be displayed on hover. However, any path that has a comma in it will break.

### Local video files - Docker

In Docker, local files need to be in a path accessible to the container. There should be a variety of methods for doing this, but this is the recommended method.

Open the folder where your plugins are installed and navigate to the `hovercards` folder. Create a new folder inside it - this is where your videos will be stored. The folder name doesn't matter, but in this example I have called it `previews`.

Take the path to the file from the `previews` folder, and add `/plugin/hovercards/assets/` in front of it. This is how Stash maps plugin paths. This path can then be added as the field value.

![image](https://github.com/user-attachments/assets/dbb51e7c-25a2-4e87-87c1-14e476dcaa80)

As with using Stash scenes, you can set a comma-separated list of paths here and one will be chosen at random to be displayed on hover. However, any path that has a comma in it will break.

### Externally hosted videos

Technically, these should be supported. The plugin will attempt to find any path entered into the field value. However I regularly ran into CORS issues. If you have any suggestions, feel free to contact me on the [Stash Discord plugins channel](https://discord.com/channels/559159668438728723/742220889017417738) or [raise an issue on GitHub](https://github.com/Valkyr-JS/hovercards/issues).

As with using Stash scenes, you can set a comma-separated list of URLs here and one will be chosen at random to be displayed on hover. However, any URLs that has a comma in it will break.
