/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {h} from 'preact';
import {ParameterEntryRenderable} from '../entities/renderables';
import {RawHtml} from './raw-html';
import {PARAM_GROUP_CLASS_NAME} from '../styling/css-classes';


/** Component to render a function or method parameter reference doc fragment. */
export function Parameter(props: {param: ParameterEntryRenderable}) {
  const param = props.param;

  return (
      <div className={PARAM_GROUP_CLASS_NAME}>
        {/*TODO: isOptional, isRestParam*/}
        <span class="adev-param-keyword">@param</span>
        <span class="adev-param-name">{param.name}</span>
        <code>{param.type}</code>
        <RawHtml value={param.htmlDescription} className="adev-parameter-description" />
      </div>
  );
}
