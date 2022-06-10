# node-red-contrib-media-id3

Node-RED node to extract and update ID3 tags of MP3 files. Based on node-id3.

If **Mode** is **Extract**, the function takes the MP3 file in the buffer from `msg.payload` and extracts the ID3 tags from it and places the result back into `msg.payload`.

If **Mode** is **Update**, the function takes the MP3 file in the buffer from `msg.payload` and the tags from `msg.tags` and places the MP3 with updated ID3 tags back into `msg.payload`. 