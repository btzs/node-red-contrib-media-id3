# node-red-contrib-media-id3

Node-RED node to extract and update ID3 tags of MP3 files coming in *as Buffer*. Based on node-id3.

Similar nodes only allow extracting/updating the ID3 tags of specified filenames, whereas this only allows updating MP3 files which come in as a Buffer.

If **Mode** is **Extract**, the function takes the MP3 file in the buffer from `msg.payload` and extracts the ID3 tags from it and places the result back into `msg.payload`.

If **Mode** is **Update**, the function takes the MP3 file in the buffer from `msg.payload` and the tags from `msg.tags` and places the MP3 with updated ID3 tags back into `msg.payload`. 


# Example

```json
[{"id":"61f68b4f4ef190ec","type":"file in","z":"f020e7df60ed884f","name":"Load Audio File","filename":"/path/to/mp3-file.mp3","format":"","chunk":false,"sendError":false,"encoding":"none","allProps":false,"x":460,"y":120,"wires":[["042bb73b73eef2d5"]]},{"id":"be351bd56f8726a9","type":"inject","z":"f020e7df60ed884f","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":280,"y":120,"wires":[["61f68b4f4ef190ec"]]},{"id":"e92ed2160c2326c9","type":"id3","z":"f020e7df60ed884f","name":"","mode":"extract","x":910,"y":120,"wires":[["266104635d68c334","0f3fcef0310a8d58"]]},{"id":"266104635d68c334","type":"debug","z":"f020e7df60ed884f","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1090,"y":120,"wires":[]},{"id":"7d316b4489a1f005","type":"id3","z":"f020e7df60ed884f","name":"","mode":"update","x":710,"y":400,"wires":[["e38d5e7af405ca05"]]},{"id":"0f3fcef0310a8d58","type":"change","z":"f020e7df60ed884f","name":"Set Audio File As Payload and Change Tags","rules":[{"t":"set","p":"tags.artist","pt":"msg","to":"Some Other Artist","tot":"str"},{"t":"set","p":"payload","pt":"msg","to":"audioFile","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":310,"y":400,"wires":[["7d316b4489a1f005","eee46ad779538a0e"]]},{"id":"e38d5e7af405ca05","type":"id3","z":"f020e7df60ed884f","name":"","mode":"extract","x":870,"y":400,"wires":[["8666de12f29dedea"]]},{"id":"8666de12f29dedea","type":"debug","z":"f020e7df60ed884f","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1070,"y":400,"wires":[]},{"id":"042bb73b73eef2d5","type":"change","z":"f020e7df60ed884f","name":"Preserve audio file payload","rules":[{"t":"set","p":"audioFile","pt":"msg","to":"payload","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":700,"y":120,"wires":[["e92ed2160c2326c9"]]},{"id":"eee46ad779538a0e","type":"debug","z":"f020e7df60ed884f","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"\"Going to set artist to '\" & tags.artist & \"'\"","targetType":"jsonata","statusVal":"","statusType":"auto","x":580,"y":360,"wires":[]}]
```


# Installation
```
npm install node-red-contrib-media-id3
```
or search for `node-red-contrib-media-id3` in Node RED's Settings -> Manage Palette -> Install.
