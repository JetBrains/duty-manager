/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type userSelectUserIdFragment$ref: FragmentReference;
declare export opaque type userSelectUserIdFragment$fragmentType: userSelectUserIdFragment$ref;
export type userSelectUserIdFragment = {|
  +id: string,
  +$refType: userSelectUserIdFragment$ref,
|};
export type userSelectUserIdFragment$data = userSelectUserIdFragment;
export type userSelectUserIdFragment$key = {
  +$data?: userSelectUserIdFragment$data,
  +$fragmentRefs: userSelectUserIdFragment$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "userSelectUserIdFragment",
  "type": "User",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '1f03ad8c6f3b52f13144ea547c4f2f3a';
module.exports = node;
