/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type userSelectUserFragment$ref: FragmentReference;
declare export opaque type userSelectUserFragment$fragmentType: userSelectUserFragment$ref;
export type userSelectUserFragment = {|
  +id: string,
  +name: string,
  +profile: ?{|
    +avatar: ?{|
      +url: ?string
    |}
  |},
  +absences: $ReadOnlyArray<{|
    +available: boolean,
    +reason: ?string,
    +since: any,
    +till: any,
  |}>,
  +balance: ?number,
  +$refType: userSelectUserFragment$ref,
|};
export type userSelectUserFragment$data = userSelectUserFragment;
export type userSelectUserFragment$key = {
  +$data?: userSelectUserFragment$data,
  +$fragmentRefs: userSelectUserFragment$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "userSelectUserFragment",
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
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "profile",
      "storageKey": null,
      "args": null,
      "concreteType": "Profile",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "avatar",
          "storageKey": null,
          "args": null,
          "concreteType": "Avatar",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "url",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "absences",
      "storageKey": null,
      "args": null,
      "concreteType": "Absence",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "available",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "reason",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "since",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "till",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "balance",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '51377d357cf59d4bc7f14e3b88726449';
module.exports = node;
