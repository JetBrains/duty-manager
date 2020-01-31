/**
 * @flow
 * @relayHash c9e665852cee1b2ad6c3ab7bd95d6af3
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type teamRemoveMemberMutationVariables = {|
  id: string
|};
export type teamRemoveMemberMutationResponse = {|
  +removeTeamMember: ?{|
    +users: $ReadOnlyArray<{|
      +id: string
    |}>
  |}
|};
export type teamRemoveMemberMutation = {|
  variables: teamRemoveMemberMutationVariables,
  response: teamRemoveMemberMutationResponse,
|};
*/


/*
mutation teamRemoveMemberMutation(
  $id: ID!
) {
  removeTeamMember(userId: $id) {
    users {
      id
    }
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "userId",
    "variableName": "id"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "users",
  "storageKey": null,
  "args": null,
  "concreteType": "User",
  "plural": true,
  "selections": [
    (v2/*: any*/)
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "teamRemoveMemberMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "removeTeamMember",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Team",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "teamRemoveMemberMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "removeTeamMember",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Team",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "teamRemoveMemberMutation",
    "id": null,
    "text": "mutation teamRemoveMemberMutation(\n  $id: ID!\n) {\n  removeTeamMember(userId: $id) {\n    users {\n      id\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '285c75e24c2e91be8f647c98ad7d2eed';
module.exports = node;
