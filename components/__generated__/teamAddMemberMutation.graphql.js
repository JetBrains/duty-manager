/**
 * @flow
 * @relayHash f6509d74322a47247df73ef57144b664
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type teamAddMemberMutationVariables = {|
  id: string
|};
export type teamAddMemberMutationResponse = {|
  +addTeamMember: ?{|
    +users: $ReadOnlyArray<{|
      +id: string,
      +name: string,
      +profile: ?{|
        +avatar: ?{|
          +url: ?string
        |}
      |},
    |}>
  |}
|};
export type teamAddMemberMutation = {|
  variables: teamAddMemberMutationVariables,
  response: teamAddMemberMutationResponse,
|};
*/


/*
mutation teamAddMemberMutation(
  $id: ID!
) {
  addTeamMember(userId: $id) {
    users {
      id
      name
      profile {
        avatar {
          url
        }
      }
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
    (v2/*: any*/),
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
    }
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "teamAddMemberMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "addTeamMember",
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
    "name": "teamAddMemberMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "addTeamMember",
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
    "name": "teamAddMemberMutation",
    "id": null,
    "text": "mutation teamAddMemberMutation(\n  $id: ID!\n) {\n  addTeamMember(userId: $id) {\n    users {\n      id\n      name\n      profile {\n        avatar {\n          url\n        }\n      }\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4485c7eedac2cf7bde5f8d7bddfde985';
module.exports = node;
