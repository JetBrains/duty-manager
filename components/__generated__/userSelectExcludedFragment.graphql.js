/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type userSelectExcludedFragment$ref: FragmentReference;
declare export opaque type userSelectExcludedFragment$fragmentType: userSelectExcludedFragment$ref;
export type userSelectExcludedFragment = {|
  +id: string,
  +$refType: userSelectExcludedFragment$ref,
|};
export type userSelectExcludedFragment$data = userSelectExcludedFragment;
export type userSelectExcludedFragment$key = {
  +$data?: userSelectExcludedFragment$data,
  +$fragmentRefs: userSelectExcludedFragment$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "userSelectExcludedFragment",
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
(node/*: any*/).hash = 'a67974c261cdb2c4d613c26590315a2f';
module.exports = node;
