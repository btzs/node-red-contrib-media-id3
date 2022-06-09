//@ts-check
/**
 * Copyright JS Foundation and other contributors, http://js.foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

const util = require("util");

function nrInputShim(node, fn) {
  node.on("input", function (msg, send, done) {
    send = send || node.send;
    done = done || ((err) => err && node.error(err, msg));
    fn(msg, send, done);
  });
}

module.exports = function (RED) {
  const NodeID3Promise = require("node-id3").Promise;

  function Id3Node(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    function onInput(msg, send, done) {

      if (config.mode === "extract") {
        if (!(msg.payload instanceof Buffer)) {
          done(RED._("id3.error.payload-type-buffer"));
          return;
        }

        NodeID3Promise.read(msg.payload, msg.options)
        .then((data) => {
          msg.payload = data;
            send(msg);
            done();
        })
        .catch((error) => {
          done(RED._("id3.error.parse", { err: error }));
        })

      } else if (config.mode === "update") {
        if (!(msg.payload instanceof Buffer)) {
          done(RED._("id3.error.payload-type-buffer"));
          return;
        }

        const tags = msg.tags

        if (!(tags.constructor.name === "Object")) {
          done(RED._("id3.error.type-tags"));
          return;
        }

        NodeID3Promise.update(tags, msg.payload)
          .then((data) => {
            //send the result
            msg.payload = data;
            send(msg);
            done();
            
            
          })
          .catch((error) => {
            //catches errors
            done(RED._("id3.error.parse", { err: error }));
          });
      }
    }

    nrInputShim(this, onInput);
  }
  RED.nodes.registerType("id3", Id3Node);
};
