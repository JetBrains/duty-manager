/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type userSelectTeamFragment$ref: FragmentReference;
declare export opaque type userSelectTeamFragment$fragmentType: userSelectTeamFragment$ref;
export type userSelectTeamFragment = {|
  +users: $ReadOnlyArray<{|
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
  |}>,
  +$refType: userSelectTeamFragment$ref,
|};
export type userSelectTeamFragment$data = userSelectTeamFragment;
export type userSelectTeamFragment$key = {
  +$data?: userSelectTeamFragment$data,
  +$fragmentRefs: userSelectTeamFragment$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "userSelectTeamFragment",
  "type": "Team",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "users",
      "storageKey": null,
      "args": null,
      "concreteType": "User",
      "plural": true,
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
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '6fd6fac3ef013fc0e05e3913a8da1028';
module.exports = node;
