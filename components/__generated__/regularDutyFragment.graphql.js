/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type userSelectExcludedFragment$ref = any;
type userSelectUserFragment$ref = any;
export type Weekday = "Friday" | "Monday" | "Saturday" | "Sunday" | "Thursday" | "Tuesday" | "Wednesday" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type regularDutyFragment$ref: FragmentReference;
declare export opaque type regularDutyFragment$fragmentType: regularDutyFragment$ref;
export type regularDutyFragment = {|
  +weekday: Weekday,
  +responsible: ?{|
    +id: string,
    +$fragmentRefs: userSelectUserFragment$ref & userSelectExcludedFragment$ref,
  |},
  +backup: ?{|
    +$fragmentRefs: userSelectUserFragment$ref
  |},
  +$refType: regularDutyFragment$ref,
|};
export type regularDutyFragment$data = regularDutyFragment;
export type regularDutyFragment$key = {
  +$data?: regularDutyFragment$data,
  +$fragmentRefs: regularDutyFragment$ref,
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
  "name": "regularDutyFragment",
  "type": "RegularDuty",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "weekday",
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
          "name": "userSelectExcludedFragment",
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
(node/*: any*/).hash = '38b833fc459f48d07b872429d7c6f005';
module.exports = node;
