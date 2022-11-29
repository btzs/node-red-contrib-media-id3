# node-red-contrib-media-id3

Node-RED node to extract and update ID3 tags of MP3 files coming in *as Buffer*. Based on node-id3.

Similar nodes only allow extracting/updating the ID3 tags of specified files, whereas this only allows updating MP3 files which come in as a Buffer. This makes handling easier in some situations where you don't want to save files on your local file system.

If **Mode** is **Extract**, the function takes the MP3 file in the buffer from `msg.payload` and extracts the ID3 tags from it and places the result back into `msg.payload`.

If **Mode** is **Update**, the function takes the MP3 file in the buffer from `msg.payload` and the tags from `msg.tags` and places the MP3 with updated ID3 tags back into `msg.payload`. 


# Example

```json
[{"id":"e5467b2392a5d3bf","type":"tab","label":"Flow 1","disabled":false,"info":"","env":[]},{"id":"61f68b4f4ef190ec","type":"file in","z":"e5467b2392a5d3bf","name":"Load Audio File","filename":"/path/to/mp3-file.mp3","filenameType":"str","format":"","chunk":false,"sendError":false,"encoding":"none","allProps":false,"x":480,"y":280,"wires":[["042bb73b73eef2d5"]]},{"id":"be351bd56f8726a9","type":"inject","z":"e5467b2392a5d3bf","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":280,"y":280,"wires":[["61f68b4f4ef190ec"]]},{"id":"e92ed2160c2326c9","type":"id3","z":"e5467b2392a5d3bf","name":"","mode":"extract","x":990,"y":280,"wires":[["266104635d68c334","0f3fcef0310a8d58"]]},{"id":"266104635d68c334","type":"debug","z":"e5467b2392a5d3bf","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1170,"y":280,"wires":[]},{"id":"7d316b4489a1f005","type":"id3","z":"e5467b2392a5d3bf","name":"","mode":"update","x":790,"y":560,"wires":[["e38d5e7af405ca05"]]},{"id":"0f3fcef0310a8d58","type":"change","z":"e5467b2392a5d3bf","name":"Set Audio File As Payload and Change Tags","rules":[{"t":"set","p":"tags.artist","pt":"msg","to":"Some Other Artist","tot":"str"},{"t":"set","p":"payload","pt":"msg","to":"audioFile","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":390,"y":560,"wires":[["7d316b4489a1f005","eee46ad779538a0e"]]},{"id":"e38d5e7af405ca05","type":"id3","z":"e5467b2392a5d3bf","name":"","mode":"extract","x":950,"y":560,"wires":[["8666de12f29dedea"]]},{"id":"8666de12f29dedea","type":"debug","z":"e5467b2392a5d3bf","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1150,"y":560,"wires":[]},{"id":"042bb73b73eef2d5","type":"change","z":"e5467b2392a5d3bf","name":"Preserve audio file payload","rules":[{"t":"set","p":"audioFile","pt":"msg","to":"payload","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":780,"y":280,"wires":[["e92ed2160c2326c9"]]},{"id":"eee46ad779538a0e","type":"debug","z":"e5467b2392a5d3bf","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"\"Going to set artist to '\" & tags.artist & \"'\"","targetType":"jsonata","statusVal":"","statusType":"auto","x":660,"y":520,"wires":[]},{"id":"fa6a5239f10d1287","type":"comment","z":"e5467b2392a5d3bf","name":"Set Path to mp3 File here.","info":"","x":510,"y":240,"wires":[]}]
```


# Installation
```
npm install node-red-contrib-media-id3
```
or search for `node-red-contrib-media-id3` in Node RED's Settings -> Manage Palette -> Install.


# To Do
* Check if file in buffer really is a MP3 file.  
* Add Mode `Delete` to allow deleting all tags.
