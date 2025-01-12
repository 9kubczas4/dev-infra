/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {h} from 'preact';
import {MemberEntryRenderable} from '../entities/renderables';
import {ClassMember} from './class-member';

export function ClassMemberList(props: {membersGroups: Map<string, MemberEntryRenderable[]>}) {
  return (
    <div class="adev-reference-members">
      {Array.from(props.membersGroups).map(([_, group]) => (
        <ClassMember members={group} />
      ))}
    </div>
  );
}
