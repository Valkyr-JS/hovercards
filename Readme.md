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

To add an image that is in your Stash library, add the Stash ID of the image you want to use in the `hovercard_image` value field. The image Stash ID can be found by navigating to the image in Stash and taking the number from the end of the URL; for example, for an image at http://localhost:9999/images/3 the Stash ID would be 3.

![image](https://github.com/user-attachments/assets/9f07f7fb-bf42-42c7-a9a3-4110deb5370e)

Save your changes at the bottom of the page (you may need to click out of the input field first). Your performer should now display your chosen image when you hover over it.

The Stash ID of the image will always be a number. Any value that is not a number is treated as an external image.

### External images

To add an image from outside of your library, such as from a different website, add the URL of the image you want to use in the `hovercard_image` value field.

![image](https://github.com/user-attachments/assets/ed69a754-0024-4806-91ed-c20c0406bfef)

Save your changes at the bottom of the page (you may need to click out of the input field first). Your performer should now display your chosen image when you hover over it.

