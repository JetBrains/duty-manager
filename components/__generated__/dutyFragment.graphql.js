/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type userSelectUserFragment$ref = any;
type userSelectUserIdFragment$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type dutyFragment$ref: FragmentReference;
declare export opaque type dutyFragment$fragmentType: dutyFragment$ref;
export type dutyFragment = {|
  +date: any,
  +responsible: ?{|
    +id: string,
    +$fragmentRefs: userSelectUserFragment$ref & userSelectUserIdFragment$ref,
  |},
  +backup: ?{|
    +$fragmentRefs: userSelectUserFragment$ref
  |},
  +$refType: dutyFragment$ref,
|};
export type dutyFragment$data = dutyFragment;
export type dutyFragment$key = {
  +$data?: dutyFragment$data,
  +$fragmentRefs: dutyFragment$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "kind": "FragmentSpread",
  "name": "userSelectUserFragment",
  "args": null
};
return {
  "kind": "Fragment",
  "name": "dutyFragment",
  "type": "Duty",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "date",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "responsible",
      "storageKey": null,
      "args": null,
      "concreteType": "User",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        },
        (v0/*: any*/),
        {
          "kind": "FragmentSpread",
          "name": "userSelectUserIdFragment",
          "args": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "backup",
      "storageKey": null,
      "args": null,
      "concreteType": "User",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ]
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = '3260ef619096d03036cf65c617c88419';
module.exports = node;
