/*
 * Copyright (c) 2017-present Adjacent Systems, Ltd.
 *
 * Licensed under Adjacent System Ltd.'s Software License.  You may not use this
 * file except in compliance with the License. You may obtain a copy of the
 * License at:
 *
 *     https://adjacent.systems/software/LICENSE.txt
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

var Sprite = require('svg-sprite-loader/lib/web/sprite')

// Remove visibility:hidden
Sprite.styles.pop()
Sprite.styles.push('display:none')

var globalSprite = new Sprite()

if (document.body) {
  globalSprite.elem = globalSprite.render(document.body)
} else {
  document.addEventListener('DOMContentLoaded', function () {
    globalSprite.elem = globalSprite.render(document.body)
  }, false)
}

module.exports = globalSprite
